import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button' 
import AppContext from '../context/AppContext'
import '../styles/components/Payment.css'

const Payment = ({ history }) => {
  const { state, addNewOrder } = useContext(AppContext)
  const { cart, buyer } = state
  const paypalOptions = {
    clientId: process.env.PAYPAL_CLIENT_ID,
    intent: 'capture',
    currency: 'USD'
  }
  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  const handlePaymentSuccess = data => {
    if(data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        products: cart,
        payment: data
      }
      addNewOrder(newOrder)
      history.push('/checkout/success')
    }
  }

  const handleSumTotal = () => {
    const reducer = (acc, curr) => acc + curr.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };
 
  return (
    <div className="Payment" >
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map(item => (
          <div class="Payment-item" key={item.index}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-buttom">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={data => handlePaymentSuccess(data)}
            onPaymentError={error => console.log(error)}
            onPaymentCancel={data => console.log(data)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Payment;
