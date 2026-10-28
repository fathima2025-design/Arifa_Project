export type UserRole = "manager" | "client";

export type CRMMenu =
  | "dashboard"
  | "clients"
  | "pipeline"
  | "quotes"
  | "inventory"
  | "orders"
  | "automation";

export type AutomationSubTab =
  | "dashboard"
  | "studio"
  | "approvals"
  | "timeline"
  | "settings";

// ─── Customer & Lead Models ───
export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  sector: string;
  tier: "Enterprise Tier 1 (VIP)" | "Key Partner (Monthly Bulk)" | "Strategic Wholesale Partner" | "Standard Business";
  creditTerms: string;
  lifetimeValue: string;
  totalOrders: number;
  activeOrder?: {
    poNumber: string;
    item: string;
    qty: string;
    status: string;
    truckId: string;
    estimatedArrival: string;
  };
  contractRate: string;
  status: "active" | "lead" | "negotiation";
  createdAt: string;
}

// ─── Product & Inventory Models ───
export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  basePriceAED: number;
  moq: number;
  currentStock: number;
  reservedStock: number;
  reorderThreshold: number;
  unit: string;
  warehouseLocation: string;
  status: "optimal" | "low_stock" | "critical";
  image: string;
}

// ─── Quotation Models ───
export interface QuotationLineItem {
  sku: string;
  name: string;
  quantity: number;
  unitPriceAED: number;
  discountPercent: number;
  totalAED: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  clientId: string;
  clientName: string;
  contactEmail: string;
  items: QuotationLineItem[];
  subtotalAED: number;
  vatAED: number;
  totalAED: number;
  status: "draft" | "pending_approval" | "approved" | "accepted" | "converted_to_order" | "rejected";
  requiresApproval: boolean;
  approvalReason?: string;
  validUntil: string;
  createdAt: string;
  createdByType: "ai_agent" | "human_manager";
}

// ─── Sales Order Models ───
export interface SalesOrder {
  id: string;
  orderNumber: string;
  quotationId?: string;
  clientId: string;
  clientName: string;
  items: QuotationLineItem[];
  totalAED: number;
  status: "confirmed" | "in_production" | "quality_check" | "ready_for_dispatch" | "dispatched" | "delivered";
  paymentTerms: string;
  assignedLine: string;
  estimatedDelivery: string;
  createdAt: string;
}

// ─── Dispatch Models ───
export interface DispatchTask {
  id: string;
  orderId: string;
  orderNumber: string;
  clientName: string;
  deliveryLocation: string;
  carrierFleet: string;
  driverName: string;
  driverContact: string;
  status: "pending_clearance" | "loading" | "in_transit" | "delivered";
  dispatchTime?: string;
  estimatedArrival: string;
}

// ─── Human Approval Request Models ───
export interface ApprovalRequest {
  id: string;
  type: "quotation_discount" | "purchase_request" | "order_exception" | "external_message";
  title: string;
  clientOrEntity: string;
  amountAED?: number;
  details: string;
  justification: string;
  status: "pending" | "approved" | "rejected";
  requestedByAgent: string;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  rejectionReason?: string;
}

// ─── AI Agent Status Models ───
export interface AgentStatus {
  id: string;
  name: string;
  code: string;
  role: string;
  description: string;
  status: "idle" | "running" | "waiting_approval" | "error";
  totalExecutions: number;
  successRate: number; // percentage
  pendingApprovals: number;
  lastAction: string;
  lastActive: string;
  color: string;
}

// ─── Workflow Studio Models ───
export interface WorkflowDefinition {
  id: string;
  code: string;
  name: string;
  category: "sales" | "inventory" | "fulfillment" | "retention" | "analytics";
  triggerEvent: string;
  conditionDescription: string;
  actionSequence: string[];
  requiresHumanApproval: boolean;
  enabled: boolean;
  totalRuns: number;
  lastRunTime?: string;
}

// ─── AI Activity Timeline Models ───
export interface TimelineEvent {
  id: string;
  timestamp: string;
  agentName: string;
  agentCode: string;
  eventType: string;
  reference: string;
  actionDescription: string;
  status: "completed" | "in_progress" | "pending_approval" | "warning";
  payload?: Record<string, unknown>;
}

// ─── System / Simulator Settings ───
export interface SystemSettings {
  executionMode: "demo" | "live_ai";
  aiProvider: "google-gemini-2.5" | "openai-gpt4o" | "anthropic-claude-3.5";
  autoApproveDiscountThresholdPercent: number; // e.g. 10%
  requireDispatchHumanConfirmation: boolean;
  maxExecutionsPerHour: number;
  stockSafetyBufferMarginPercent: number;
}
