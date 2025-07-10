// Payment service for handling Stripe and PayPal payments
const API_BASE_URL = 'http://localhost:5000';

export class PaymentService {
  
  // Create order
  static async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Stripe payment methods
  static async createStripePaymentIntent(paymentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/stripe/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating Stripe payment intent:', error);
      throw error;
    }
  }

  static async confirmStripePayment(paymentIntentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/stripe/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_intent_id: paymentIntentId })
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error confirming Stripe payment:', error);
      throw error;
    }
  }

  // PayPal payment methods
  static async createPayPalPayment(paymentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/paypal/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating PayPal payment:', error);
      throw error;
    }
  }

  static async executePayPalPayment(paymentId, payerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/paypal/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          payment_id: paymentId, 
          payer_id: payerId 
        })
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error executing PayPal payment:', error);
      throw error;
    }
  }

  // Get order details
  static async getOrder(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  // Format currency
  static formatCurrency(amount, currency = 'AED') {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  }

  // Validate payment data
  static validatePaymentData(data) {
    const required = ['customer_email', 'customer_name', 'items', 'total_amount'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new Error('Items array is required and cannot be empty');
    }

    if (typeof data.total_amount !== 'number' || data.total_amount <= 0) {
      throw new Error('Total amount must be a positive number');
    }

    return true;
  }
}

