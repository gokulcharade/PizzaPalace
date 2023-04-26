// Title: Order Page Details in Salesforce LWC and Apex Classes
// Description: This code fetches order data from an Apex controller and displays it on an LWC page. It also includes a button to redirect the user to the payment confirmation page.
// Author: Gokul Charde Horizontal

import { LightningElement,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOrderData from '@salesforce/apex/OrderController.getOrderData';

export default class Orderpagedetails extends NavigationMixin( LightningElement) {
    orders = [];
    @track orderId;
    ampm = true;

    connectedCallback() {
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get("orderId");
            console.log("Order Id from second component:", orderId);
            getOrderData({orderId: orderId})
            .then(result => {
                this.orders = result;
                this.orderId = orderId;
                console.log(this.orders);
            });
    }

    // handleButtonClick(){
    //     try {
    //     const event1 = new ShowToastEvent({
    //         title: 'Moved to Payment',
    //         variant: 'info'
    //         });
    //         this.dispatchEvent(event1);
    //         console.log("ORDERINGID",this.orderId);
    //     // window.location.href="https://horizontal66-dev-ed.develop.my.site.com/pizzawebsite/s/paymentconfirm";
    //     this[NavigationMixin.Navigate]({
    //         type: 'comm__namedPage',
    //         attributes: {
    //             pageName: 'paymentconfirm'
    //         },
    //         state: {
    //             orderId: this.orderId
    //         }
    //       });
    //     } catch(error) {
    //         console.error('Error redirecting to payment confirmation page: ' + error);
    //     }
    // }
}
