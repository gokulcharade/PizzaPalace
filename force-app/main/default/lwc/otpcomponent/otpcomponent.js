/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable no-undef */
import { LightningElement, track,wire } from 'lwc';
// import sendOTPEmail from '@salesforce/apex/OTPEmailController.sendOTPEmail';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import { NavigationMixin } from 'lightning/navigation';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getOrderData from '@salesforce/apex/OrderController.getOrderData';
import updateOrderPaymentStatus from '@salesforce/apex/OrderController.updateOrderPaymentStatus';
import sendemail from '@salesforce/apex/OrderController.sendemail';
import sendOTPEmail from '@salesforce/apex/OTPEmailController.sendOTPEmail';

export default class Otpcomponent extends NavigationMixin(LightningElement) {

    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen = false;
    @track email;
    @track otp;
    @track genOTP;
    @track genButtonDisabled = false;
    countdown = 30;
    orders = [];
    @track orderId;
    ampm = true;

    connectedCallback() {
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get("orderId");
            console.log("Order Id from second component:", orderId);
            getOrderData({orderId: orderId})
            .then(result => {
                this.orders = result;
                this.orderId = orderId;
                console.log(this.orders);
            });
    }

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }

    // handleEmailChange(event) {
    //     this.email = event.target.value;
    // }

    get genButtonLabel() {
        return this.genButtonDisabled ? `Resend OTP in ${this.countdown} seconds` : 'Generate OTP';
    }

    @wire(getRecord, { recordId: USER_ID, fields: [EMAIL_FIELD] })
    user;
    

    handleGenerateOTP() {
        this.genButtonDisabled = true;
        // Generate a random 4-digit OTP
        this.genOTP = Math.floor(1000 + Math.random() * 9000);
        console.log(this.genOTP);
        console.log(this.user.data.fields.Email.value);
        this.email = this.user.data.fields.Email.value;
        // Send the OTP to the user's email using Apex method
        sendOTPEmail({ userEmail: this.user.data.fields.Email.value, otp: this.genOTP })
            .then(result => {
                console.log('OTP email sent successfully: ' + result);
               
            })
            .catch(error => {
                console.error(error);
            });

         // Update the payment_Status__c field to true
         updateOrderPaymentStatus({ orderId: this.orderId })
         .then(result => {
             console.log('Order payment status updated successfully: ' + result);
         })
         .catch(error => {
             console.error('Error updating order payment status: ' + error);
         });

        const event4 = new ShowToastEvent({
            title: "OTP Generated Successfully!",
            variant: "success"
          });
          this.dispatchEvent(event4);
            // Start the countdown timer
        let countdownInterval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                clearInterval(countdownInterval);
                this.genButtonDisabled = false;
                this.countdown = 30;
            }
        }, 1000);
            
    }

    handleOTPChange(event) {
        this.otp = parseInt(event.target.value, 10);
        console.log(this.otp);
    }

    handleCheckOTP(event) {
        // Check if the entered OTP matches the generated OTP 
        
        if (this.otp === this.genOTP) {
            try {
                console.log('OTP verification successful');
                event.target.disabled = true;
                event.target.value = "Verified Successfully";
                
                const event5 = new ShowToastEvent({
                    title: "OTP Verified Successfully",
                    variant: "success"
                  });
                  this.dispatchEvent(event5);
        
                sendemail({ orderId: this.orderId })
                .then(result => {
                    console.log('Order email sent successfully: ' + result);
                })
                .catch(error => {
                    console.error('Error updating order payment status: ' + error);
                });
                
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        pageName: 'paymentconfirm'
                    },
                    state: {
                        orderId: this.orderId
                    }
                });
                } catch(error) {
                    console.error('Error redirecting to payment confirmation page: ' + error);
                }
        } else {
            console.log('OTP verification failed');
            const event6 = new ShowToastEvent({
                title: "Please enter a valid OTP",
                variant: "error"
              });
              this.dispatchEvent(event6);
        }
    }

    
}