import { LightningElement, wire,track } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const FIELDS = ['Order__c.AddressField__c'];

export default class UpdateAddressOrder extends LightningElement {
  @track orderId;
  @track addressFieldValue;

  connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    this.orderId = urlParams.get('orderId');
    console.log('Order Id:', this.orderId);
  }

  @wire(getRecord, { recordId: '$orderId', fields: FIELDS })
  orderRecord;

  get order() {
    return this.orderRecord.data;
  }

  handleAddressFieldValueChange(event) {
    this.addressFieldValue = event.target.value;
  }

  handleSuccess() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Address Added',
        variant: 'success',
      }),
    );
    // Refresh the order record after update
    refreshApex(this.orderRecord);
  }

  async saveOrder() {
    const fields = {};
    fields.Id = this.orderId;
    fields.AddressField__c = this.addressFieldValue;
    const recordInput = { fields };
    try {
      await updateRecord(recordInput);
      this.handleSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.showPosition(position);
            // this.handleChange();
            //     this.handleClick();
            
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            this.addressFieldValue = data.display_name;
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
  }
}