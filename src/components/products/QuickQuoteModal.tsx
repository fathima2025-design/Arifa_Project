"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { Product } from "@/types/product";

interface QuickQuoteModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? `Request Quote: ${product.name}` : "Request Packaging Quotation"}
      subtitle={
        product
          ? `Item Code: ${product.specs.itemCode} • Direct Factory Pricing (Ajman, UAE)`
          : "Direct Manufacturer B2B CIF/FOB Proposals"
      }
      size="lg"
    >
      <QuoteRequestForm
        initialProductId={product?.id}
        onSuccess={onClose}
        isCompact={false}
      />
    </Modal>
  );
};
