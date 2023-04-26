import { LightningElement, api, track } from 'lwc';

export default class ReadonlyInput extends LightningElement {
    @api label;
    @track value = 0;

    handleIncrease() {
        this.value += 1;
    }

    handleDecrease() {
        if (this.value > 0) {
            this.value -= 1;
        }
    }
}