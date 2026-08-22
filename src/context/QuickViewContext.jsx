import React, { createContext, useContext, useState, useCallback } from 'react';

const QuickViewContext = createContext(null);

export const QuickViewProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = useCallback((product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  }, []);

  const closeQuickView = useCallback(() => {
    setIsOpen(false);
    // Delay resetting product so fade-out animation completes smoothly
    setTimeout(() => {
      setSelectedProduct(null);
    }, 250);
  }, []);

  return (
    <QuickViewContext.Provider
      value={{
        selectedProduct,
        isOpen,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};

export default QuickViewContext;
