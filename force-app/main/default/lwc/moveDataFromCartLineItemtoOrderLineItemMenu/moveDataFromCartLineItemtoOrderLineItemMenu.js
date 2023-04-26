import { LightningElement,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCartLineItemsByAccountId from '@salesforce/apex/ExampleController.getCartLineItemsByAccountId';
import getAccountId from '@salesforce/apex/ExampleController.getAccountId';

export default class MoveDataFromCartLineItemtoOrderLineItem extends NavigationMixin(LightningElement) {
  @track accid;
  @track orderId;


  
    handleButtonClick() {
        getCartLineItemsByAccountId()
          .then((result) => {
            // window.location.href="https://horizontal66-dev-ed.develop.my.site.com/pizzawebsite/s/orders"
            this.orderId = result;
            console.log("OrderId:",this.orderId);
        getAccountId()
            .then((result1) => {
              this.accid = result1;
            console.log("AccountId:",this.accid);
            localStorage.setItem('accountId', this.accountId);
            })
            this[NavigationMixin.Navigate]({
              type: 'comm__namedPage',
              attributes: {
                  pageName: 'orders'
              },
              state: {
                  // accid: this.accid,
                  orderId: this.orderId
                  

              }
            });
          })
          .catch((error) => {
            console.log('frontend:', error);
            const event1 = new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            });
            this.dispatchEvent(event1);
          });
      }
}