// Title: PizzaOutlets Component JS File
// Description: This component displays pizza outlets based on pincode and navigates to menu page on outlet selection
// Author: Gokul Charde Horizontal

import { LightningElement, track } from 'lwc'; 
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getLocationsByPincode from '@salesforce/apex/SOQLControllerGeneric.getLocationsByPincode';

export default class PizzaOutlets extends NavigationMixin(LightningElement) {
@track pincode ='Fetching your pincode...';
@track locations;

    connectedCallback() {
        const event6 = new ShowToastEvent({
            title: 'Fetching your Current location pincode! Please wait...',
            variant: 'info'
            });
            this.dispatchEvent(event6);
            // getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.showPosition(position);
                    // this.handleChange();
                    // this.handleClick();
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
                this.pincode = data.address.postcode;
                console.log(this.pincode);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
        try {
            this.pincode = event.target.value;
            getLocationsByPincode({ pincode: this.pincode })
                .then(result => {
                    if (result && result.length > 0) {
                        this.locations = result;
                        console.log(result);
                    } else {
                    
                        this.locations = [];
                    }
                })
                .catch(error => {
                    console.error('Error in getLocationsByPincode: ', error);
                    this.locations = [];
                });
        } catch (error) {
            console.error('Error in handleChange: ', error);
        }
    }
    
    handleClick() {
        try {
            getLocationsByPincode({ pincode: this.pincode })
                .then(result => {
                    console.log(result);
                    if (result && result.length > 0) {
                        this.locations = result;
                        // const event1 = new ShowToastEvent({
                        //     title: 'Pizza Outlets Loaded',
                        //     message: 'Select the Pizza Outlet From where you want to order...',
                        //     variant: 'success'
                        // });
                        // this.dispatchEvent(event1);
                    } else {
                        const event2 = new ShowToastEvent({
                            title: 'No Pizza Outlets Found',
                            message: 'Please enter a different pincode.',
                            variant: 'warning'
                        });
                        this.dispatchEvent(event2);
                        this.locations = [];
                    }
                })
                .catch(error => {
                    console.error('Error in getLocationsByPincode: ', error);
                    this.locations = [];
                });
        } catch (error) {
            console.error('Error in handleClick: ', error);
        }
    }

  handleMove(event) {
    try {
        const outletId = event.target.value;
        // const outletId = 'a012w00001ALXLNAA5';
        // const outletId = 'a012w00001ALXssAAH';
        console.log(outletId);

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: 'menu'
            },
            state: {
                outletId: outletId
            }
        });
    } catch (error) {
        console.error('Error in handleMove: ', error);
    }
  }

  
//   getLocation() {
//       if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
//           this.handleClick();
//       } else {
//           console.log("Geolocation is not supported by this browser.");
//       }
//   }

    
    
  
  
}