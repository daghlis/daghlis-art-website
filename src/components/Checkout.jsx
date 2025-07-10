import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Shield, ArrowLeft, ArrowRight } from 'lucide-react';

const Checkout = ({ cartItems, total, onClose }) => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const isRTL = i18n.language === 'ar';

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentInfoChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment
    alert(i18n.language === 'ar' ? 'تم تأكيد طلبك بنجاح!' : 
          i18n.language === 'fr' ? 'Votre commande a été confirmée avec succès!' :
          'Your order has been confirmed successfully!');
    onClose();
  };

  const shippingCost = customerInfo.country === 'France' ? 
    (total >= 100 ? 0 : 15) : 
    (customerInfo.country === 'Europe' ? 25 : 45);
  
  const tax = total * 0.20; // TVA française 20%
  const finalTotal = total + shippingCost + tax;

  const steps = [
    { id: 1, title: t('checkout.customerInfo') },
    { id: 2, title: t('checkout.payment') },
    { id: 3, title: t('checkout.review') }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t('checkout.title')}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step.id ? 'bg-white text-amber-600' : 'bg-amber-500 text-white'
                }`}>
                  {step.id}
                </div>
                <span className="ml-2 text-sm">{step.title}</span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-white' : 'bg-amber-500'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {t('checkout.customerInfo')}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.fullName')}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={customerInfo.fullName}
                      onChange={handleCustomerInfoChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.country')}
                    </label>
                    <select
                      name="country"
                      value={customerInfo.country}
                      onChange={handleCustomerInfoChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      <option value="France">France</option>
                      <option value="Europe">Europe (autres pays)</option>
                      <option value="International">International</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleCustomerInfoChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.city')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleCustomerInfoChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.postalCode')}
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={customerInfo.postalCode}
                      onChange={handleCustomerInfoChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {t('checkout.payment')}
                </h3>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">{t('checkout.paymentMethod')}</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === 'creditCard' ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={paymentMethod === 'creditCard'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-amber-600" size={24} />
                        <span className="font-medium">{t('checkout.creditCard')}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Visa, MasterCard, American Express</p>
                    </label>

                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === 'paypal' ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <span className="font-medium">{t('checkout.paypal')}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Paiement sécurisé via PayPal</p>
                    </label>
                  </div>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'creditCard' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('checkout.cardNumber')}
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentInfoChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('checkout.expiryDate')}
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentInfoChange}
                          placeholder="MM/YY"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('checkout.cvv')}
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentInfoChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-600" size={20} />
                    <span className="text-green-800 font-medium">{t('checkout.securePayment')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {t('checkout.review')}
                </h3>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">{t('checkout.orderSummary')}</h4>
                  
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.title}</span>
                        <span>€{item.price}</span>
                      </div>
                    ))}
                    
                    <hr className="my-3" />
                    
                    <div className="flex justify-between">
                      <span>{t('checkout.subtotal')}</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>{t('checkout.shipping')}</span>
                      <span>{shippingCost === 0 ? 'Gratuit' : `€${shippingCost.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>TVA (20%)</span>
                      <span>€{tax.toFixed(2)}</span>
                    </div>
                    
                    <hr className="my-3" />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t('checkout.total')}</span>
                      <span>€{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  currentStep === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                <ArrowLeft size={20} />
                {i18n.language === 'ar' ? 'السابق' : i18n.language === 'fr' ? 'Précédent' : 'Previous'}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  {t('checkout.continue')}
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('checkout.placeOrder')}
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

