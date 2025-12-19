'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface InquiryFormContextType {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const InquiryFormContext = createContext<InquiryFormContextType | undefined>(undefined);

export function InquiryFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <InquiryFormContext.Provider value={{ isOpen, openForm, closeForm }}>
      {children}
    </InquiryFormContext.Provider>
  );
}

export function useInquiryForm() {
  const context = useContext(InquiryFormContext);
  if (context === undefined) {
    throw new Error('useInquiryForm must be used within an InquiryFormProvider');
  }
  return context;
}

