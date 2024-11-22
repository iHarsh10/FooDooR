import React, { useContext, useState } from 'react';
import { CreditCard, Lock, Check, CreditCardIcon, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PaymentSystem.css';
import { StoreContext } from '../../context/StoreContext';

const PaymentSystem = ({ onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [cashDetails, setCashDetails] = useState({
    name: '',
    phone: ''
  });

  const { clearCart } = useContext(StoreContext);

  const navigate = useNavigate();

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  };

  const formatExpiry = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(?=\d)/g, '$1/')
      .trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid card number');
        return;
      }
      if (expiry.length !== 5) {
        alert('Please enter a valid expiry date');
        return;
      }
      if (cvv.length !== 3) {
        alert('Please enter a valid CVV');
        return;
      }
    } else if (paymentMethod === 'cod') {
      if (!cashDetails.name || !cashDetails.phone) {
        alert('Please enter name and phone number');
        return;
      }
    }

    setPaymentComplete(true);
    
    setTimeout(() => {
      onPaymentComplete && onPaymentComplete();
      clearCart();
      navigate('/');
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-card">
          <Check className="check-icon" />
          <h2 className="success-title">Payment Successful!</h2>
          <p className="success-message">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <CreditCard className="payment-header-icon" />
          <h1 className="payment-header-title">Payment</h1>
        </div>

        <div className="payment-method-selection">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`payment-method-btn ${
              paymentMethod === 'card' 
              ? 'payment-method-btn-active' 
              : 'payment-method-btn-inactive'
            }`}
          >
            <CreditCardIcon className="btn-icon" /> Card Payment
          </button>
          <button
            onClick={() => setPaymentMethod('cod')}
            className={`payment-method-btn ${
              paymentMethod === 'cod' 
              ? 'payment-method-btn-active' 
              : 'payment-method-btn-inactive'
            }`}
          >
            <Truck className="btn-icon" /> Cash on Delivery
          </button>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          {paymentMethod === 'card' ? (
            <>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <div className="input-wrapper">
                  <input
                    id="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength="19"
                    placeholder="1234 5678 9012 3456"
                    className="payment-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Name on Card</label>
                <input
                  id="cardName"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Harshvardhan"
                  className="payment-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    id="expiry"
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength="5"
                    placeholder="MM/YY"
                    className="payment-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength="3"
                    placeholder="123"
                    className="payment-input"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="codName">Full Name</label>
                <input
                  id="codName"
                  type="text"
                  value={cashDetails.name}
                  onChange={(e) => setCashDetails({...cashDetails, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="payment-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="codPhone">Phone Number</label>
                <input
                  id="codPhone"
                  type="tel"
                  value={cashDetails.phone}
                  onChange={(e) => setCashDetails({...cashDetails, phone: e.target.value})}
                  placeholder="Enter your phone number"
                  className="payment-input"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="payment-submit-btn"
          >
            {paymentMethod === 'card' ? 'Pay Now' : 'Confirm Cash on Delivery'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentSystem;