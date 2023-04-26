/* eslint-disable radix */
import { LightningElement, api, track } from 'lwc';
export default class Child extends LightningElement {
    @api label;
    @api value;
    @track currentValue;

    connectedCallback() {
        this.currentValue = parseInt(this.value);
    }

    handleIncrease() {
        this.currentValue++;
        this.updateValue();
    }

    handleDecrease() {
        if (this.currentValue > 1) {
            this.currentValue--;
            this.updateValue();
        }
    }

    updateValue() {
        const event = new CustomEvent('update', {
            detail: {
                value: this.currentValue.toString()
            }
        });
        this.dispatchEvent(event);
    }
}