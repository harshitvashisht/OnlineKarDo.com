import { createContext, useContext, ReactNode } from 'react'

interface EnquiryContextType {
  openEnquiry: (offer: string, businessType?: string) => void
}

const EnquiryContext = createContext<EnquiryContextType | null>(null)

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const openEnquiry = (offer: string, businessType = '') => {
    // This will be implemented by the consumer (AppContent)
    // We use a custom event to communicate with AppContent
    window.dispatchEvent(new CustomEvent('open-enquiry', { detail: { offer, businessType } }))
  }

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  )
}

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider')
  }
  return context
}