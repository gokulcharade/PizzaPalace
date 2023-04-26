/* eslint-disable no-unused-vars */
import { LightningElement } from 'lwc';
import allorder from '@salesforce/apex/allorder.allorder';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class OrderHistory extends NavigationMixin(LightningElement) {
    orders = [];
    ampm = true;

    renderedCallback() {
        allorder()
        .then(result => {
            this.orders = result;
            console.log("Order",this.orders);
        })
        .catch(error => {
            console.error(error);
        });
  
    }

    handleFeedbackClick(event) {
        // Get the order Id from the data-id attribute of the button
        const orderId = event.target.dataset.id;
        console.log(event.target.dataset.id);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: 'feedbackpage'
            },
            state: {
                Id: orderId
            }
          });
          const event1 = new ShowToastEvent({
            title: 'Moved To Feedback',
            variant: 'info'
            });
            this.dispatchEvent(event1);
    }

    
    handleInvoiceClick(event) {
        // Get the order Id from the data-id attribute of the button
        const orderId = event.target.dataset.id;
        console.log(event.target.dataset.id);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: 'invoice'
            },
            state: {
                orderId: orderId
            }
          });
          const event2 = new ShowToastEvent({
            title: 'Moved To Invoice',
            variant: 'info'
            });
            this.dispatchEvent(event2);
    }
   

}