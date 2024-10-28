import React, { useEffect } from 'react';

const PayPalButton = ({ amount, onSuccess }) => {
  useEffect(() => {
    const script = document.createElement('script');
    
    // Reemplaza "TU_CLIENT_ID_PAYPAL" con tu propio Client ID de PayPal obtenido de PayPal Developer
    script.src = 'https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID_PAYPAL'; 
    script.addEventListener('load', () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, // Monto a cobrar
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          onSuccess(order); // Llamar la función de éxito cuando el pago se complete
        },
        onError: (err) => {
          console.error('Error con PayPal:', err);
        },
      }).render('#paypal-button-container');
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [amount, onSuccess]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;