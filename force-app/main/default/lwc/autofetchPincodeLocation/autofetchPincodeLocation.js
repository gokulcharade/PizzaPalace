
import { LightningElement, track } from 'lwc';

export default class AutofetchPincodeLocation extends LightningElement {
    @track pincode;

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
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
                this.pincode = data.address.postcode;
                console.log(this.pincode);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
