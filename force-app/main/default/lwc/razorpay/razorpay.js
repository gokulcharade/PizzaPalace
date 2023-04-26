/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { LightningElement } from 'lwc';

import RazorpayCheckout from '@salesforce/resourceUrl/razorpayCheckout';

export default class Razorpay extends LightningElement {
  amount = 100000;
  prefill = {
    email: 'gaurav.kumar@example.com',
    contact: '+919033834644'
  };

  connectedCallback() {
    Promise.all([
      RazorpayCheckout
    ]).then(() => {
      console.log('Razorpay script loaded successfully.');
    }).catch(error => {
      console.error('Error loading Razorpay script:', error);
    });
  }

  handleAmountChange(event) {
    this.amount = event.target.value * 100;
  }

  handleRazorpayCheckout() {
    let options = {
      key: 'rzp_test_LDpGhRcR870BRi',
      amount: this.amount,
      currency: 'INR',
      description: 'Acme Corp',
      image: 'https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg',
      prefill: this.prefill,
      config: {
        display: {
          blocks: {
            other: {
              name: 'Payment modes',
              instruments: [
                { method: 'upi' },
                { method: 'card' },
                { method: 'netbanking' }
              ]
            }
          },
          hide: [{ method: 'upi' }],
          sequence: ['block.utib', 'block.other'],
          preferences: {
            show_default_blocks: false
          }
        }
      },
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          if (confirm('Are you sure, you want to close the form?')) {
            console.log('Checkout form closed by the user');
          } else {
            console.log('Complete the Payment');
          }
        }
      }
    };
    let rzp = new Razorpay(options);
    rzp.open();
  }
}
