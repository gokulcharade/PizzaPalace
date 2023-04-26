import { LightningElement } from 'lwc';
import getOrderData from '@salesforce/apex/OrderController.getOrderData';

export default class OrderLineItem extends LightningElement {
    orders = [];
    ampm = true;

    connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("orderId");
        console.log("Order Id:", orderId);
        getOrderData({orderId: orderId})
        .then(result => {
            this.orders = result;
        })
        .catch(error => {
            console.error(error);
        });
    }

}


