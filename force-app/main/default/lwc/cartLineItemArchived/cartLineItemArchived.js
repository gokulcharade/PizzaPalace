/* eslint-disable no-alert */
/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement,api} from 'lwc';
import getCartLineItems from '@salesforce/apex/CartLineItemApex.getCartLineItems';
import deleteCartItem from '@salesforce/apex/CartLineItemApex.deleteCartItem';

export default class CartLineItem extends LightningElement {

    @api cartLineItems;

    connectedCallback() {
        // this.refreshCartLineItems();
        getCartLineItems()
        .then(result => {
            this.cartLineItems = result;
        })
        .catch(error => {
            console.error('Error retrieving Cart Line Items', error);
        });
    }

    refreshCartLineItems() {
       
    }

    handleRemoveFromCart(event) {
        console.log(event.currentTarget.dataset.id);
        const cartLineItemId = event.currentTarget.dataset.id;
        deleteCartItem({ cartLineItemId })
            .then(() => {
                // this.refreshCartLineItems();
                getCartLineItems()
                .then(result => {
                    this.cartLineItems = result;
                    window.alert('Removed from cart');
                    // location.reload()
                })
                .catch(error => {
                    console.error('Error retrieving Cart Line Items', error);
                });
                console.log("Backend: success");
            })
            .catch(error => {
                console.error('Error deleting Cart Line Item', error);
            });
    }

    handleOrderClick(){
        window.location.href=""

    }
    

}





