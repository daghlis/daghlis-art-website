import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from 'lucide-react';
import Checkout from './Checkout';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const { t, i18n } = useTranslation();
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePaymentSuccess = (order) => {
    setShowCheckout(false);
    // Clear cart after successful payment
    cartItems.forEach(item => onRemoveItem(item.id));
    // Call parent callback if provided
    onCheckout && onCheckout(order);
  };

  if (cartItems.length === 0) {
    return (
      <section id="cart" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              {t('cart.title')}
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              {t('cart.empty')}
            </p>
            <Button
              onClick={() => document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg"
            >
              {t('hero.exploreGallery')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="cart" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              {t('cart.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Item Image */}
                    <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title[i18n.language]}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-gray-900">
                          {item.title[i18n.language]}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {item.year} • {item.medium[i18n.language]}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          {item.dimensions}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <span className="text-sm font-medium text-gray-700">
                            {t('cart.quantity')}:
                          </span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="text-right">
                            <div className="text-lg font-bold text-yellow-600">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatPrice(item.price)} {t('common.each')}
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
                  {i18n.language === 'ar' ? 'ملخص الطلب' : 
                   i18n.language === 'en' ? 'Order Summary' : 
                   'Résumé de Commande'}
                </h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.title[i18n.language]} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {t('cart.total')}:
                    </span>
                    <span className="text-2xl font-bold text-yellow-600">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 text-lg font-medium rounded-lg flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{t('cart.checkout')}</span>
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    {i18n.language === 'ar' ? 'دفع آمن عبر PayPal و Stripe' : 
                     i18n.language === 'en' ? 'Secure payment via PayPal & Stripe' : 
                     'Paiement sécurisé via PayPal et Stripe'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          cartItems={cartItems}
          totalAmount={calculateTotal()}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
};

export default Cart;

