export type EnquiryType =
  | "general"
  | "product-quotation"
  | "bulk-procurement"
  | "custom-packaging"
  | "sample-request"
  | "dealership";

export type EnquiryStatus =
  | "new"
  | "reviewing"
  | "quoted"
  | "sample-sent"
  | "in-negotiation"
  | "converted"
  | "closed";

export interface QuotationLineItem {
  productId: string;
  productName: string;
  itemCode: string;
  quantityCases: number;
  estimatedVolume?: string;
  lidPreference?: string;
  customEmbossingRequested?: boolean;
}

export interface EnquirySubmission {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  country: string;
  city?: string;
  enquiryType: EnquiryType;
  items?: QuotationLineItem[];
  estimatedMonthlyVolume?: string;
  message: string;
  preferredContactMethod?: "email" | "phone" | "whatsapp";
}

export interface EnquiryRecord extends EnquirySubmission {
  id: string;
  createdAt: string;
  status: EnquiryStatus;
  assignedRepresentative?: string;
  notes?: string[];
  referenceNumber: string;
}
