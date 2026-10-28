import {
  Client,
  ProductItem,
  Quotation,
  SalesOrder,
  DispatchTask,
  ApprovalRequest,
  AgentStatus,
  WorkflowDefinition,
  TimelineEvent,
  SystemSettings,
} from "./types";

export interface CRMState {
  clients: Client[];
  products: ProductItem[];
  quotations: Quotation[];
  orders: SalesOrder[];
  dispatchTasks: DispatchTask[];
  approvals: ApprovalRequest[];
  agents: AgentStatus[];
  workflows: WorkflowDefinition[];
  timeline: TimelineEvent[];
  settings: SystemSettings;
}

// ─── 1. DETERMINISTIC PRICING ENGINE ───
export function calculateCommercialPricing(
  product: ProductItem,
  quantity: number
): { unitPriceAED: number; discountPercent: number; subtotalAED: number; vatAED: number; totalAED: number } {
  let discountPercent = 0;

  // Wholesale Volume Tiers
  if (quantity >= 100000) {
    discountPercent = 20.0;
  } else if (quantity >= 50000) {
    discountPercent = 16.0;
  } else if (quantity >= 25000) {
    discountPercent = 10.0;
  } else if (quantity >= 10000) {
    discountPercent = 5.0;
  }

  const unitPriceAED = Number((product.basePriceAED * (1 - discountPercent / 100)).toFixed(2));
  const subtotalAED = Number((unitPriceAED * quantity).toFixed(2));
  const vatAED = Number((subtotalAED * 0.05).toFixed(2)); // UAE 5% VAT
  const totalAED = Number((subtotalAED + vatAED).toFixed(2));

  return { unitPriceAED, discountPercent, subtotalAED, vatAED, totalAED };
}

// ─── 2. HELPER TO UPDATE AGENT STATUS & AUDIT LOG ───
export function recordAgentAction(
  state: CRMState,
  agentId: string,
  action: string,
  eventType: string,
  reference: string,
  status: "completed" | "in_progress" | "pending_approval" | "warning" = "completed",
  payload?: Record<string, unknown>
): CRMState {
  const updatedAgents = state.agents.map((ag) => {
    if (ag.id === agentId) {
      return {
        ...ag,
        totalExecutions: ag.totalExecutions + 1,
        lastAction: action,
        lastActive: "Just now",
        status: status === "pending_approval" ? ("waiting_approval" as const) : ("idle" as const),
      };
    }
    return ag;
  });

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const agent = state.agents.find((a) => a.id === agentId);

  const newEvent: TimelineEvent = {
    id: "evt-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
    timestamp: timeStr,
    agentName: agent ? agent.name : "System Agent",
    agentCode: agent ? agent.code : "SYS-00",
    eventType,
    reference,
    actionDescription: action,
    status,
    payload,
  };

  return {
    ...state,
    agents: updatedAgents,
    timeline: [newEvent, ...state.timeline],
  };
}

// ─── 3. CONTROLLED AI TOOLS (PHASE 5 COMPLIANT) ───

// Tool: searchCustomers()
export function searchCustomers(state: CRMState, query: string): Client[] {
  const q = query.toLowerCase();
  return state.clients.filter(
    (c) => c.name.toLowerCase().includes(q) || c.contactPerson.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  );
}

// Tool: createLead()
export function createLead(
  state: CRMState,
  leadData: { name: string; contactPerson: string; email: string; phone: string; location: string; sector: string }
): { newState: CRMState; newClient: Client } {
  const newClient: Client = {
    id: "CL-" + Date.now().toString().slice(-4),
    name: leadData.name,
    contactPerson: leadData.contactPerson,
    email: leadData.email,
    phone: leadData.phone,
    location: leadData.location,
    sector: leadData.sector,
    tier: "Standard Business",
    creditTerms: "100% Advance Payment on First Order",
    lifetimeValue: "AED 0",
    totalOrders: 0,
    contractRate: "Standard Tier Pricing",
    status: "lead",
    createdAt: new Date().toISOString().split("T")[0],
  };

  let nextState: CRMState = {
    ...state,
    clients: [newClient, ...state.clients],
  };

  nextState = recordAgentAction(
    nextState,
    "ag-sales",
    `Created new enterprise lead for ${newClient.name} (${newClient.location})`,
    "customer.lead.created",
    newClient.id
  );

  return { newState: nextState, newClient };
}

// Tool: checkInventory()
export function checkInventory(
  state: CRMState,
  sku: string,
  requestedQuantity: number
): { available: boolean; currentStock: number; reservedStock: number; freeStock: number; product?: ProductItem } {
  const product = state.products.find((p) => p.sku === sku);
  if (!product) return { available: false, currentStock: 0, reservedStock: 0, freeStock: 0 };

  const freeStock = product.currentStock - product.reservedStock;
  return {
    available: freeStock >= requestedQuantity,
    currentStock: product.currentStock,
    reservedStock: product.reservedStock,
    freeStock,
    product,
  };
}

// Tool: createQuotationDraft()
export function createQuotationDraft(
  state: CRMState,
  params: { clientId: string; sku: string; quantity: number }
): { newState: CRMState; quotation?: Quotation } {
  const client = state.clients.find((c) => c.id === params.clientId);
  const product = state.products.find((p) => p.sku === params.sku);

  if (!client || !product) return { newState: state };

  const pricing = calculateCommercialPricing(product, params.quantity);
  const quoteNumber = "PI-2026-" + Math.floor(1000 + Math.random() * 9000);

  // Check if discount exceeds autonomous policy (e.g. 10%)
  const requiresApproval = pricing.discountPercent > state.settings.autoApproveDiscountThresholdPercent;
  const approvalReason = requiresApproval
    ? `Wholesale volume discount (${pricing.discountPercent}%) exceeds autonomous ${state.settings.autoApproveDiscountThresholdPercent}% threshold`
    : undefined;

  const newQuote: Quotation = {
    id: "quote-" + Date.now(),
    quoteNumber,
    clientId: client.id,
    clientName: client.name,
    contactEmail: client.email,
    items: [
      {
        sku: product.sku,
        name: product.name,
        quantity: params.quantity,
        unitPriceAED: pricing.unitPriceAED,
        discountPercent: pricing.discountPercent,
        totalAED: pricing.subtotalAED,
      },
    ],
    subtotalAED: pricing.subtotalAED,
    vatAED: pricing.vatAED,
    totalAED: pricing.totalAED,
    status: requiresApproval ? "pending_approval" : "draft",
    requiresApproval,
    approvalReason,
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    createdAt: "Just now",
    createdByType: "ai_agent",
  };

  let nextState: CRMState = {
    ...state,
    quotations: [newQuote, ...state.quotations],
  };

  // If requires human approval, add to Human Approval Center
  if (requiresApproval) {
    const newApproval: ApprovalRequest = {
      id: "appr-" + Date.now(),
      type: "quotation_discount",
      title: `${pricing.discountPercent}% Commercial Discount on ${quoteNumber}`,
      clientOrEntity: client.name,
      amountAED: pricing.totalAED,
      details: `Quote ${quoteNumber} for ${params.quantity.toLocaleString()} units of ${product.name} at AED ${pricing.unitPriceAED}/unit.`,
      justification: `AI Quotation Agent qualified high-volume commitment (${params.quantity.toLocaleString()} units). Margin: 29.2%.`,
      status: "pending",
      requestedByAgent: "AI Quotation Agent (QUOTE-02)",
      createdAt: "Just now",
    };

    nextState = {
      ...nextState,
      approvals: [newApproval, ...nextState.approvals],
    };

    nextState = recordAgentAction(
      nextState,
      "ag-quote",
      `Generated proforma ${quoteNumber} (AED ${pricing.totalAED.toLocaleString()}) with ${pricing.discountPercent}% discount; routed to Human Approval Center`,
      "quotation.approval.requested",
      quoteNumber,
      "pending_approval",
      { quoteId: newQuote.id, amount: pricing.totalAED }
    );
  } else {
    nextState = recordAgentAction(
      nextState,
      "ag-quote",
      `Drafted standard wholesale quotation ${quoteNumber} for ${client.name} (AED ${pricing.totalAED.toLocaleString()})`,
      "quotation.draft.created",
      quoteNumber,
      "completed"
    );
  }

  return { newState: nextState, quotation: newQuote };
}

// Tool: approveQuotation() (Human-in-the-loop)
export function approveQuotation(
  state: CRMState,
  quoteId: string,
  approverName: string = "Sulthanul Arifeen"
): CRMState {
  const quote = state.quotations.find((q) => q.id === quoteId);
  if (!quote) return state;

  const updatedQuotes = state.quotations.map((q) => {
    if (q.id === quoteId) {
      return { ...q, status: "approved" as const, requiresApproval: false };
    }
    return q;
  });

  const updatedApprovals = state.approvals.map((appr) => {
    if (appr.title.includes(quote.quoteNumber)) {
      return {
        ...appr,
        status: "approved" as const,
        resolvedAt: "Just now",
        resolvedBy: approverName,
      };
    }
    return appr;
  });

  let nextState: CRMState = {
    ...state,
    quotations: updatedQuotes,
    approvals: updatedApprovals,
  };

  nextState = recordAgentAction(
    nextState,
    "ag-quote",
    `Manager ${approverName} approved commercial discount for ${quote.quoteNumber}. Ready for client acceptance.`,
    "quotation.approved.by_manager",
    quote.quoteNumber,
    "completed"
  );

  return nextState;
}

// Tool: rejectQuotation()
export function rejectQuotation(
  state: CRMState,
  quoteId: string,
  reason: string = "Discount exceeds approved margins"
): CRMState {
  const quote = state.quotations.find((q) => q.id === quoteId);
  if (!quote) return state;

  const updatedQuotes = state.quotations.map((q) => {
    if (q.id === quoteId) {
      return { ...q, status: "rejected" as const };
    }
    return q;
  });

  const updatedApprovals = state.approvals.map((appr) => {
    if (appr.title.includes(quote.quoteNumber)) {
      return {
        ...appr,
        status: "rejected" as const,
        resolvedAt: "Just now",
        resolvedBy: "Sulthanul Arifeen",
        rejectionReason: reason,
      };
    }
    return appr;
  });

  let nextState: CRMState = {
    ...state,
    quotations: updatedQuotes,
    approvals: updatedApprovals,
  };

  nextState = recordAgentAction(
    nextState,
    "ag-quote",
    `Quotation ${quote.quoteNumber} rejected: ${reason}`,
    "quotation.rejected",
    quote.quoteNumber,
    "warning"
  );

  return nextState;
}

// Tool: convertQuotationToOrder() (Workflow A)
export function convertQuotationToOrder(
  state: CRMState,
  quoteId: string
): { newState: CRMState; order?: SalesOrder } {
  const quote = state.quotations.find((q) => q.id === quoteId);
  if (!quote) return { newState: state };

  const orderNumber = "SO-" + Math.floor(1000 + Math.random() * 9000);

  // Reserve inventory for items
  let inventoryUpdated = [...state.products];
  quote.items.forEach((line) => {
    inventoryUpdated = inventoryUpdated.map((p) => {
      if (p.sku === line.sku) {
        const newReserved = p.reservedStock + line.quantity;
        const newStatus =
          p.currentStock - newReserved <= p.reorderThreshold ? ("low_stock" as const) : ("optimal" as const);
        return {
          ...p,
          reservedStock: newReserved,
          status: newStatus,
        };
      }
      return p;
    });
  });

  const newOrder: SalesOrder = {
    id: "ord-" + Date.now(),
    orderNumber,
    quotationId: quote.id,
    clientId: quote.clientId,
    clientName: quote.clientName,
    items: quote.items,
    totalAED: quote.totalAED,
    status: "confirmed",
    paymentTerms: "30-Day Net Credit",
    assignedLine: "Press Line #3 | Al Jurf Plant 2",
    estimatedDelivery: "In 3 Business Days",
    createdAt: "Just now",
  };

  // Update Quotation status to converted_to_order
  const updatedQuotes = state.quotations.map((q) => {
    if (q.id === quoteId) {
      return { ...q, status: "converted_to_order" as const };
    }
    return q;
  });

  // Update Client stats
  const updatedClients = state.clients.map((c) => {
    if (c.id === quote.clientId) {
      return {
        ...c,
        totalOrders: c.totalOrders + 1,
        activeOrder: {
          poNumber: orderNumber,
          item: `${quote.items[0].quantity.toLocaleString()}x ${quote.items[0].name}`,
          qty: `${quote.items[0].quantity.toLocaleString()} units`,
          status: "Confirmed — Press Line Stamped",
          truckId: "Stamping Line #3",
          estimatedArrival: "In 3 Business Days",
        },
      };
    }
    return c;
  });

  let nextState: CRMState = {
    ...state,
    quotations: updatedQuotes,
    orders: [newOrder, ...state.orders],
    products: inventoryUpdated,
    clients: updatedClients,
  };

  nextState = recordAgentAction(
    nextState,
    "ag-order",
    `Converted Proforma ${quote.quoteNumber} into confirmed Sales Order ${orderNumber} (AED ${quote.totalAED.toLocaleString()}). Reserved physical warehouse stock.`,
    "order.created_from_quote",
    orderNumber
  );

  return { newState: nextState, order: newOrder };
}

// Tool: createDispatchTask() (Workflow D)
export function createDispatchTask(
  state: CRMState,
  orderId: string,
  fleetTruck: string = "Arifa Logistics Fleet Truck #AE-4921",
  driver: string = "Tariq Mahmood"
): { newState: CRMState; task?: DispatchTask } {
  const order = state.orders.find((o) => o.id === orderId);
  if (!order) return { newState: state };

  const client = state.clients.find((c) => c.id === order.clientId);
  const location = client ? client.location : "Dubai Logistics Hub, UAE";

  const newTask: DispatchTask = {
    id: "disp-" + Date.now(),
    orderId: order.id,
    orderNumber: order.orderNumber,
    clientName: order.clientName,
    deliveryLocation: location,
    carrierFleet: fleetTruck,
    driverName: driver,
    driverContact: "+971 50 123 4567",
    status: "in_transit",
    dispatchTime: "Just now",
    estimatedArrival: "Today, 3:30 PM",
  };

  const updatedOrders = state.orders.map((o) => {
    if (o.id === orderId) {
      return { ...o, status: "dispatched" as const };
    }
    return o;
  });

  let nextState: CRMState = {
    ...state,
    orders: updatedOrders,
    dispatchTasks: [newTask, ...state.dispatchTasks],
  };

  nextState = recordAgentAction(
    nextState,
    "ag-dispatch",
    `Generated digital dispatch manifest for Order ${order.orderNumber}. Assigned ${fleetTruck} (Driver: ${driver}). En route to ${location}.`,
    "dispatch.truck.en_route",
    order.orderNumber
  );

  return { newState: nextState, task: newTask };
}

// Tool: triggerLowStockAlert() (Workflow B)
export function triggerLowStockAlert(
  state: CRMState,
  sku: string = "AP-C200-DIV"
): CRMState {
  const product = state.products.find((p) => p.sku === sku);
  if (!product) return state;

  const reqNumber = "PO-REQ-2026-" + Math.floor(10 + Math.random() * 90);

  const newApproval: ApprovalRequest = {
    id: "appr-" + Date.now(),
    type: "purchase_request",
    title: `Raw Aluminium Foil Coil Requisition (${reqNumber})`,
    clientOrEntity: "Emirates Aluminium Smelter",
    amountAED: 98000,
    details: `Requisition for 30 MT of Food-Grade AA8011 aluminium alloy coil for ${product.name}. Available free stock is below safety buffer.`,
    justification: `AI Inventory Agent identified urgent replenishment needed to support pending pipeline demand.`,
    status: "pending",
    requestedByAgent: "AI Inventory Agent (INV-03)",
    createdAt: "Just now",
  };

  const updatedProducts = state.products.map((p) => {
    if (p.sku === sku) {
      return { ...p, status: "critical" as const };
    }
    return p;
  });

  let nextState: CRMState = {
    ...state,
    products: updatedProducts,
    approvals: [newApproval, ...state.approvals],
  };

  nextState = recordAgentAction(
    nextState,
    "ag-inventory",
    `Stock shortage detected for SKU ${sku} (${product.name}). Automatically drafted purchase requisition ${reqNumber} for AED 98,000.`,
    "inventory.stock.shortage_alert",
    sku,
    "warning"
  );

  return nextState;
}

// Tool: triggerCustomerFollowUp() (Workflow C)
export function triggerCustomerFollowUp(
  state: CRMState,
  clientId?: string
): CRMState {
  const targetClient = clientId
    ? state.clients.find((c) => c.id === clientId)
    : state.clients[2]; // Default: Lulu Group or client

  if (!targetClient) return state;

  const msgText = `Hello ${targetClient.contactPerson}! AI Follow-up Agent noticed your wholesale contract rate for ${targetClient.name} is approaching monthly reorder cadence. Our Ajman plant has raw aluminium slots reserved for your delivery this week.`;

  let nextState = recordAgentAction(
    state,
    "ag-followup",
    `Prepared personalized reorder prompt for ${targetClient.name} (${targetClient.contactPerson}): "${msgText.slice(0, 80)}..."`,
    "followup.message.drafted",
    targetClient.id
  );

  return nextState;
}

// Tool: runDailyBIReport() (Workflow E)
export function runDailyBIReport(state: CRMState): CRMState {
  const totalPipeline = state.quotations.reduce((sum, q) => sum + q.totalAED, 0);
  const totalOrdersVal = state.orders.reduce((sum, o) => sum + o.totalAED, 0);

  const summary = `Daily AI BI Summary: Active Order Total AED ${totalOrdersVal.toLocaleString()} across ${state.orders.length} orders. Quotation Pipeline AED ${totalPipeline.toLocaleString()}. Factory press utilization at 92.4%. All ISO 9001 sensors green.`;

  return recordAgentAction(
    state,
    "ag-bi",
    summary,
    "bi.report.daily_compiled",
    "DAILY-BI-SUMMARY"
  );
}
