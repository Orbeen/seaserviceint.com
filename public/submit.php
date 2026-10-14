<?php
/**
 * Form handler for SeaServe Int.
 *
 * Replaces Netlify Forms now that the site is hosted on cPanel. Handles all
 * three forms (quick-inquiry, contact, service-request) and emails the
 * submission to the office address.
 *
 * PHP 7.4 compatible — no arrow functions, no union types.
 */

declare(strict_types=1);

const MAIL_TO       = 'office@seaservint.com';
const MAIL_FROM     = 'website@seaserviceint.com';
const SITE_NAME     = 'SeaServe Int.';
const THANK_YOU_URL = '/thank-you';
const MAX_FIELD_LEN = 5000;
const MIN_SECONDS   = 2;      // submissions faster than this are bots
const RATE_LIMIT    = 5;      // max submissions per IP per hour

// Only POST is meaningful here.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /', true, 303);
    exit;
}

/** Field labels, in the order they should appear in the email. */
$LABELS = [
    'company'    => 'Company',
    'name'       => 'Contact person',
    'email'      => 'Email',
    'phone'      => 'Telephone',
    'service'    => 'Service required',
    'vessel'     => 'Vessel name',
    'vesselType' => 'Vessel type',
    'port'       => 'Port / location',
    'date'       => 'Estimated date',
    'crewAction' => 'Crew change type',
    'crewCount'  => 'Number of crew',
    'supplyType' => 'Supply category',
    'partRef'    => 'Part reference',
    'message'    => 'Message',
];

/** Slug -> readable service name, mirroring src/data/services.ts. */
$SERVICES = [
    'shipping-agents'     => 'Shipping Agents',
    'crew-sign-on-off'    => 'Crew Sign On / Off',
    'general-ship-supply' => 'General Ship Supply',
    'general-repair'      => 'General Repair',
    'cleaning-solutions'  => 'Cleaning Solutions',
    'ship-spares'         => 'Ship Spares',
    'ship-husbandry'      => 'Ship Husbandry Services',
    'export-import'       => 'Export & Import',
    'marine-survey'       => 'Marine Survey Services',
    'other'               => 'Other / not sure yet',
];

$FORM_TITLES = [
    'quick-inquiry'   => 'Service page inquiry',
    'contact'         => 'Contact form message',
    'service-request' => 'Service request',
];

/** Strip CR/LF so a value can never inject extra mail headers. */
function header_safe(string $v): string
{
    return trim(str_replace(["\r", "\n", "\0"], ' ', $v));
}

function clean(string $v): string
{
    $v = str_replace("\0", '', $v);
    $v = trim($v);
    if (mb_strlen($v) > MAX_FIELD_LEN) {
        $v = mb_substr($v, 0, MAX_FIELD_LEN) . ' […truncated]';
    }
    return $v;
}

function fail(string $why): void
{
    // Deliberately vague to the client; the detail goes to the error log.
    error_log('[submit.php] rejected: ' . $why);
    http_response_code(422);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><meta charset="utf-8"><title>Submission problem</title>'
       . '<body style="font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem">'
       . '<h1>We could not send your message</h1>'
       . '<p>Something went wrong submitting the form. Please email us directly at '
       . '<a href="mailto:' . MAIL_TO . '">' . MAIL_TO . '</a> and we will pick it up from there.</p>'
       . '<p><a href="/">Back to the site</a></p>';
    exit;
}

// --- Spam gate 1: honeypot. A real visitor never sees this field. ---
if (clean((string) ($_POST['bot-field'] ?? '')) !== '') {
    // Pretend it worked so the bot does not retry.
    header('Location: ' . THANK_YOU_URL, true, 303);
    exit;
}

// --- Spam gate 2: time-to-submit. Bots post instantly. ---
$started = (int) ($_POST['form_started'] ?? 0);
if ($started > 0 && (time() - $started) < MIN_SECONDS) {
    header('Location: ' . THANK_YOU_URL, true, 303);
    exit;
}

// --- Spam gate 3: per-IP rate limit, using a temp-dir counter. ---
$ip   = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$slot = sys_get_temp_dir() . '/ssi_rate_' . md5($ip) . '_' . date('YmdH');
$hits = 0;
if (is_readable($slot)) {
    $hits = (int) file_get_contents($slot);
}
if ($hits >= RATE_LIMIT) {
    error_log('[submit.php] rate limited: ' . $ip);
    http_response_code(429);
    exit('Too many submissions. Please try again later, or email ' . MAIL_TO);
}
@file_put_contents($slot, (string) ($hits + 1));

// --- Validate ---
$formName = clean((string) ($_POST['form-name'] ?? 'contact'));
if (!isset($FORM_TITLES[$formName])) {
    $formName = 'contact';
}

$name    = clean((string) ($_POST['name'] ?? ''));
$email   = clean((string) ($_POST['email'] ?? ''));
$message = clean((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    fail('missing required field');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('invalid email');
}

// --- Compose ---
$serviceSlug = clean((string) ($_POST['service'] ?? ''));
$serviceName = $SERVICES[$serviceSlug] ?? $serviceSlug;

$lines = [];
foreach ($LABELS as $key => $label) {
    $raw = clean((string) ($_POST[$key] ?? ''));
    if ($raw === '') {
        continue;
    }
    if ($key === 'service') {
        $raw = $serviceName;
    }
    $lines[] = $label . ': ' . $raw;
}

$subjectBits = [SITE_NAME, $FORM_TITLES[$formName]];
if ($serviceName !== '') {
    $subjectBits[] = $serviceName;
}
$subject = header_safe(implode(' — ', $subjectBits));

$body = "A new submission from the " . SITE_NAME . " website.\n\n"
      . implode("\n", $lines) . "\n\n"
      . str_repeat('-', 48) . "\n"
      . 'Form:       ' . $formName . "\n"
      . 'Submitted:  ' . date('Y-m-d H:i:s T') . "\n"
      . 'Page:       ' . clean((string) ($_POST['page_url'] ?? 'unknown')) . "\n"
      . 'IP address: ' . $ip . "\n";

// Reply-To is the only place visitor input touches a header, and it is
// validated as an email and stripped of CR/LF above.
$headers = [
    'From'                      => SITE_NAME . ' <' . MAIL_FROM . '>',
    'Reply-To'                  => header_safe($name) . ' <' . $email . '>',
    'X-Mailer'                  => 'PHP/' . phpversion(),
    'Content-Type'              => 'text/plain; charset=utf-8',
    'Content-Transfer-Encoding' => '8bit',
];
$headerLines = [];
foreach ($headers as $k => $v) {
    $headerLines[] = $k . ': ' . $v;
}

$sent = @mail(
    MAIL_TO,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headerLines),
    '-f' . MAIL_FROM
);

if (!$sent) {
    fail('mail() returned false');
}

header('Location: ' . THANK_YOU_URL, true, 303);
exit;
