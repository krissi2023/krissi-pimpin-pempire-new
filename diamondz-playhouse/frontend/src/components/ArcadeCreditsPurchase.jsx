import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAuth } from '../contexts/AuthContext';
import env from '../env';
import './ArcadeCreditsPurchase.css';

const CREDIT_PACKS = [
  { id: 'credits-10', amount: 1000, label: '$10.00', description: '1,000 arcade credits' },
  { id: 'credits-25', amount: 2500, label: '$25.00', description: '2,500 arcade credits' },
  { id: 'credits-50', amount: 5000, label: '$50.00', description: '5,000 arcade credits' }
];

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#ffffff',
      fontSize: '16px',
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.55)'
      }
    },
    invalid: {
      color: '#ff6b6b'
    }
  },
  hidePostalCode: true
};

const formatCurrency = (amountCents) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(amountCents / 100);

function ArcadeCreditsPurchase() {
  const apiBase = env.API_URL || 'http://localhost:5000/api';
  const stripe = useStripe();
  const elements = useElements();
  const { user, refreshUser } = useAuth();

  const [selectedPackId, setSelectedPackId] = useState(CREDIT_PACKS[0].id);
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const selectedPack = useMemo(
    () => CREDIT_PACKS.find((pack) => pack.id === selectedPackId),
    [selectedPackId]
  );

  const handleCardChange = (event) => {
    setCardError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !selectedPack || processing) {
      return;
    }

    setProcessing(true);
    setMessage('');
    setMessageType('');

    const userId = user?.id || user?.userId;

    try {
      const { data } = await axios.post(`${apiBase}/payments/create-payment-intent`, {
        amount: selectedPack.amount,
        creditsAmount: selectedPack.amount,
        userId
      });

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user?.email || undefined,
            name: user?.username || 'Arcade Player'
          }
        }
      });

      if (error) {
        setMessageType('error');
        setMessage(error.message || 'Payment failed. Please try again.');
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        cardElement.clear();
        setMessageType('success');
        setMessage(`Payment successful! Added ${formatCurrency(selectedPack.amount)} in arcade credits.`);
        await refreshUser();
      } else {
        setMessageType('error');
        setMessage('Payment could not be completed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setMessageType('error');
      setMessage(error.response?.data?.error || 'There was an issue processing your payment.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="credits-purchase card">
      <h2>Purchase Arcade Credits</h2>
      <p className="credits-subtitle">
        Pick a credit pack and pay securely to keep the reels spinning.
      </p>

      <form onSubmit={handleSubmit} className="credits-form">
        <div className="credits-options">
          {CREDIT_PACKS.map((pack) => (
            <label
              key={pack.id}
              className={`credits-option ${selectedPackId === pack.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="credits-pack"
                value={pack.id}
                checked={selectedPackId === pack.id}
                onChange={() => setSelectedPackId(pack.id)}
              />
              <div className="option-details">
                <span className="option-amount">{pack.label}</span>
                <span className="option-description">{pack.description}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="card-element-wrapper">
          <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
        </div>
        {cardError && <div className="card-error">{cardError}</div>}
        {message && <div className={`purchase-message ${messageType}`}>{message}</div>}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!stripe || !selectedPack || processing}
        >
          {processing ? 'Processing...' : `Buy ${formatCurrency(selectedPack.amount)}`}
        </button>
      </form>
    </section>
  );
}

export default ArcadeCreditsPurchase;
