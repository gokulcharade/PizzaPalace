/* eslint-disable radix */
import { LightningElement, track } from 'lwc';
export default class Parent extends LightningElement {
    @track quantity = 1;

    handleUpdate(event) {
        this.quantity = parseInt(event.detail.value);
        console.log(this.quantity);
    }

 
}