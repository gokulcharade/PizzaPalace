import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOrderLineItems from '@salesforce/apex/OrderLineItemController.getOrderLineItems';

export default class Orderliningitems extends LightningElement {
    @api accountId;
    @track orderLineItems = [];

    connectedCallback() {
        //fetching outlet id from url
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("orderId");
        console.log("Order Id:", orderId);
        getOrderLineItems({orderId: orderId})
            .then(result => {
                this.orderLineItems = result;
                console.log("orderlineitem",result);
            })
            .catch(error => {
                console.error('Error fetching order line items: ', error);
            });

         const event6 = new ShowToastEvent({
                title: 'Confirm Your Order Here...',
                variant: 'success'
                });
                this.dispatchEvent(event6);
    }
}
