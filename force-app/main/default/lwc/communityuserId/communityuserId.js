import { LightningElement } from 'lwc';
import getCurrentUser from '@salesforce/apex/CommunityUserController.getCurrentUser';

export default class CommunityuserId extends LightningElement {
    userId;

    connectedCallback() {
        console.log("called");
        getCurrentUser()
            .then(result => {
                console.log(result);
                this.userId = result.Id;
                console.log('Current User ID:', this.userId);
            })
            .catch(error => {
                console.error("error",error);
            });
    }
}

