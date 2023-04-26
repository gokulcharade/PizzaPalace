import { LightningElement, wire } from 'lwc';
import getUserAndAccountId from '@salesforce/apex/MyController.getUserAndAccountId';

export default class MyComponent extends LightningElement {
    userId;
    accountId;

    @wire(getUserAndAccountId)
    wiredUserAndAccountId({ error, data }) {
        if (data) {
            this.userId = data.userId;
            this.accountId = data.accountId;
        } else if (error) {
            console.error(error);
        }
    }
}
