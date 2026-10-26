export type ProductCategory =
  | "aluminium-containers"
  | "aluminium-platters"
  | "aluminium-pots"
  | "aluminium-foil"
  | "plastic-containers"
  | "disposable-cutlery"
  | "custom-converting";

export interface ProductDimensions {
  topOut?: string;
  topIn?: string;
  base?: string;
  depth?: string;
  capacityMl?: number;
  capacityOz?: number;
  gaugeMicrons?: number;
  lengthMeters?: number;
  widthCm?: number;
}

export interface ProductSpecification {
  itemCode: string;
  material: string;
  shape: string;
  rimType?: string;
  packingStandard: string;
  caseCount: number | string;
  compatibility?: string[]; // e.g. ["Microwave Safe", "Oven Safe", "Freezer Safe", "100% Recyclable"]
  temperatureRange?: string;
  lidOptions?: string[];
  certifications?: string[];
}

export interface Product3DConfig {
  modelType: "aluminium-container" | "foil-roll" | "round-pot" | "plastic-tub" | "platter";
  defaultFinish: "mirror" | "matte-aluminium" | "golden-lacquer" | "clear-poly";
  aspectRatio: number;
  rimDetail?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  shortDescription: string;
  features: string[];
  applications: string[];
  dimensions: ProductDimensions;
  specs: ProductSpecification;
  image: string;
  gallery: string[];
  isFeatured?: boolean;
  isEcoFriendly?: boolean;
  has3DModel?: boolean;
  model3DConfig?: Product3DConfig;
  minOrderQuantity?: string;
}

export interface CategoryMeta {
  id: ProductCategory;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  icon: string;
  heroImage: string;
  itemCount: number;
  keyHighlights: string[];
}
