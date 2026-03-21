'use client'

import InquiryFormPopup from "./InquiryFormPopup";
import { useInquiryForm } from "../contexts/InquiryFormContext";

const HomeInquiryWrapper = () => {
  const { isOpen: showInquiryForm, closeForm, productInfo } = useInquiryForm();

  if (!showInquiryForm) return null;

  return (
    <InquiryFormPopup
      isOpen={showInquiryForm}
      onClose={closeForm}
      productInfo={productInfo}
    />
  );
};

export default HomeInquiryWrapper;
