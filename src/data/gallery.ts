import type { PlateVariant } from './services';

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryItem {
  category: string;
  variant: PlateVariant;
  caption: string;
}

export const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'port', label: 'Vessel and Port Operations' },
  { id: 'supply', label: 'Ship Supply' },
  { id: 'crew', label: 'Crew Support' },
  { id: 'repair', label: 'Repair and Maintenance' },
  { id: 'survey', label: 'Surveys and Inspection' },
];

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  { category: 'port', variant: 'ship', caption: 'Vessel at sea' },
  { category: 'port', variant: 'port', caption: 'Vessel alongside the quay' },
  { category: 'port', variant: 'anchor', caption: 'Vessel at anchorage' },
  { category: 'supply', variant: 'supply', caption: 'Stores on the quay' },
  { category: 'supply', variant: 'spares', caption: 'Spares and equipment' },
  { category: 'supply', variant: 'docs', caption: 'Containerised cargo' },
  { category: 'crew', variant: 'crew', caption: 'Gangway and vessel boarding' },
  { category: 'repair', variant: 'repair', caption: 'Steel repair work' },
  { category: 'repair', variant: 'clean', caption: 'Hull cleaning' },
  { category: 'survey', variant: 'survey', caption: 'Hull inspection' },
];

export const CATEGORY_LABEL = new Map(GALLERY_CATEGORIES.map((c) => [c.id, c.label]));
