import { EnquiryRecord } from "./enquiry";
import { Product } from "./product";

/**
 * Phase 1 Architecture Bridge for Future Central CRM.
 * These interfaces lay the structural contract for Phase 2 CRM integration
 * across Sales, Inventory, Production, Procurement, Finance, HR, Quality, and Logistics.
 */

export type CRMModule =
  | "sales"
  | "inventory"
  | "production"
  | "procurement"
  | "finance"
  | "hr"
  | "quality"
  | "marketing"
  | "logistics";

export interface CRMLead {
  id: string;
  enquiryId?: string;
  source: "website-enquiry" | "rfq-form" | "sample-request" | "direct-call" | "trade-show";
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  leadStage: "prospect" | "qualified" | "sample-dispatched" | "quotation-active" | "contract-signed";
  estimatedValueUSD?: number;
  assignedManagerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryBatch {
  id: string;
  productId: string;
  itemCode: string;
  warehouseLocation: "Ajman-Plant-1" | "Ajman-Logistics-Hub" | "Dubai-Depot";
  quantityCasesAvailable: number;
  quantityReserved: number;
  palletCount: number;
  manufactureDate: string;
  inspectionPassed: boolean;
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  productId: string;
  machineLineId: string; // From the 780+ machine network
  targetQuantityCases: number;
  producedQuantityCases: number;
  status: "queued" | "tooling-setup" | "converting" | "quality-check" | "packaged" | "completed";
  scheduledStart: string;
  scheduledFinish: string;
}

export interface ShippingShipment {
  id: string;
  trackingNumber: string;
  carrier: "Internal-Fleet" | "GCC-Freight" | "International-Container-Line";
  destinationPortOrCity: string;
  containerNumber?: string;
  status: "order-placed" | "customs-cleared" | "in-transit" | "delivered";
  dispatchDate: string;
}
