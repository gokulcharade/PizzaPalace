import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import CustomSelfRegisterClass from '@salesforce/apex/CustomSelfRegisterClass.createAccount';

// const stateOptions = [
//     { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
//     { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
//     { label: 'Assam', value: 'Assam' },
//     { label: 'Bihar', value: 'Bihar' },
//     { label: 'Chhattisgarh', value: 'Chhattisgarh' },
//     { label: 'Goa', value: 'Goa' },
//     { label: 'Gujarat', value: 'Gujarat' },
//     { label: 'Haryana', value: 'Haryana' },
//     { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
//     { label: 'Jharkhand', value: 'Jharkhand' },
//     { label: 'Karnataka', value: 'Karnataka' },
//     { label: 'Kerala', value: 'Kerala' },
//     { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
//     { label: 'Maharashtra', value: 'Maharashtra' },
//     { label: 'Manipur', value: 'Manipur' },
//     { label: 'Meghalaya', value: 'Meghalaya' },
//     { label: 'Mizoram', value: 'Mizoram' },
//     { label: 'Nagaland', value: 'Nagaland' },
//     { label: 'Odisha', value: 'Odisha' },
//     { label: 'Punjab', value: 'Punjab' },
//     { label: 'Rajasthan', value: 'Rajasthan' },
//     { label: 'Sikkim', value: 'Sikkim' },
//     { label: 'Tamil Nadu', value: 'Tamil Nadu' },
//     { label: 'Telangana', value: 'Telangana' },
//     { label: 'Tripura', value: 'Tripura' },
//     { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
//     { label: 'Uttarakhand', value: 'Uttarakhand' },
//     { label: 'West Bengal', value: 'West Bengal' }
// ];

const stateOptions = [
    { label: 'Gujarat', value: 'GJ' },
];

const countryOptions = [
    { label: 'India', value: 'IN' },
    ];

// const countryOptions = [
//     { label: 'Afghanistan', value: 'Afghanistan' },
//     { label: 'Albania', value: 'Albania' },
//     { label: 'Algeria', value: 'Algeria' },
//     { label: 'Andorra', value: 'Andorra' },
//     { label: 'Angola', value: 'Angola' },
//     { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda' },
//     { label: 'Argentina', value: 'Argentina' },
//     { label: 'Armenia', value: 'Armenia' },
//     { label: 'Australia', value: 'Australia' },
//     { label: 'Austria', value: 'Austria' },
//     { label: 'Azerbaijan', value: 'Azerbaijan' },
//     { label: 'Bahamas', value: 'Bahamas' },
//     { label: 'Bahrain', value: 'Bahrain' },
//     { label: 'Bangladesh', value: 'Bangladesh' },
//     { label: 'Barbados', value: 'Barbados' },
//     { label: 'Belarus', value: 'Belarus' },
//     { label: 'Belgium', value: 'Belgium' },
//     { label: 'Belize', value: 'Belize' },
//     { label: 'Benin', value: 'Benin' },
//     { label: 'Bhutan', value: 'Bhutan' },
//     { label: 'Bolivia', value: 'Bolivia' },
//     { label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' },
//     { label: 'Botswana', value: 'Botswana' },
//     { label: 'Brazil', value: 'Brazil' },
//     { label: 'Brunei', value: 'Brunei' },
//     { label: 'Bulgaria', value: 'Bulgaria' },
//     { label: 'Burkina Faso', value: 'Burkina Faso' },
//     { label: 'Burundi', value: 'Burundi' },
//     { label: 'Cabo Verde', value: 'Cabo Verde' },
//     { label: 'Cambodia', value: 'Cambodia' },
//     { label: 'Cameroon', value: 'Cameroon' },
//     { label: 'Canada', value: 'Canada' },
//     { label: 'Central African Republic (CAR)', value: 'Central African Republic (CAR)' },
//     { label: 'Chad', value: 'Chad' },
//     { label: 'Chile', value: 'Chile' },
//     { label: 'China', value: 'China' },
//     { label: 'Colombia', value: 'Colombia' },
//     { label: 'Comoros', value: 'Comoros' },
//     { label: 'Costa Rica', value: 'Costa Rica' },
//     { label: 'Cote d\'Ivoire', value: 'Cote d\'Ivoire' },
//     { label: 'Croatia', value: 'Croatia' },
//     { label: 'Cuba', value: 'Cuba' },
//     { label: 'Cyprus', value: 'Cyprus' },
//     { label: 'Czech Republic', value: 'Czech Republic' },
//     { label: 'Democratic Republic of the Congo', value: 'Democratic Republic of the Congo' },
//     { label: 'Denmark', value: 'Denmark' },
//     { label: 'Djibouti', value: 'Djibouti' },
//     { label: 'Dominica', value: 'Dominica' },
//     { label: 'Dominican Republic', value: 'Dominican Republic' },
//     { label: 'Ecuador', value: 'Ecuador' },
//     { label: 'Egypt', value: 'Egypt' },
//     { label: 'El Salvador', value: 'El Salvador' },
//     { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
//     { label: 'Eritrea', value: 'Eritrea' },
//     { label: 'Estonia', value: 'Estonia' },
//     { label: 'Eswatini (formerly Swaziland)', value: 'Eswatini (formerly Swaziland)' },
//     { label: 'Ethiopia', value: 'Ethiopia' },
//     { label: 'Fiji', value: 'Fiji' },
//     { label: 'Finland', value: 'Finland' },
//     { label: 'France', value: 'France' },
//     { label: 'Gabon', value: 'Gabon' },
//     { label: 'Gambia', value: 'Gambia' },
//     { label: 'Georgia', value: 'Georgia' },
//     { label: 'Germany', value: 'Germany' },
//     { label: 'Ghana', value: 'Ghana' },
//     { label: 'Greece', value: 'Greece' },
//     { label: 'Grenada', value: 'Grenada' },
//     { label: 'Guatemala', value: 'Guatemala' },
//     { label: 'Guinea', value: 'Guinea' },
//     { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
//     { label: 'Guyana', value: 'Guyana' },
//     { label: 'Haiti', value: 'Haiti' },
//     { label: 'Honduras', value: 'Honduras' },
//     { label: 'Hungary', value: 'Hungary' },
//     { label: 'Iceland', value: 'Iceland' },
//     { label: 'India', value: 'India' },
//     { label: 'Indonesia', value: 'Indonesia' },
//     { label: 'Iran', value: 'Iran' },
//     { label: 'Iraq', value: 'Iraq' },
//     { label: 'Ireland', value: 'Ireland' },
//     { label: 'Israel', value: 'Israel' },
//     { label: 'Italy', value: 'Italy' },
//     { label: 'Jamaica', value: 'Jamaica' },
//     { label: 'Japan', value: 'Japan' },
//     { label: 'Jamaica', value: 'Jamaica' },
//     { label: 'Japan', value: 'Japan' },
//     { label: 'Jordan', value: 'Jordan' },
//     { label: 'Kazakhstan', value: 'Kazakhstan' },
//     { label: 'Kenya', value: 'Kenya' },
//     { label: 'Kiribati', value: 'Kiribati' },
//     { label: 'Kosovo', value: 'Kosovo' },
//     { label: 'Kuwait', value: 'Kuwait' },
//     { label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
//     { label: 'Laos', value: 'Laos' },
//     { label: 'Latvia', value: 'Latvia' },
//     { label: 'Lebanon', value: 'Lebanon' },
//     { label: 'Lesotho', value: 'Lesotho' },
//     { label: 'Liberia', value: 'Liberia' },
//     { label: 'Libya', value: 'Libya' },
//     { label: 'Liechtenstein', value: 'Liechtenstein' },
//     { label: 'Lithuania', value: 'Lithuania' },
//     { label: 'Luxembourg', value: 'Luxembourg' },
//     { label: 'Madagascar', value: 'Madagascar' },
//     { label: 'Malawi', value: 'Malawi' },
//     { label: 'Malaysia', value: 'Malaysia' },
//     { label: 'Maldives', value: 'Maldives' },
//     { label: 'Mali', value: 'Mali' },
//     { label: 'Malta', value: 'Malta' },
//     { label: 'Marshall Islands', value: 'Marshall Islands' },
//     { label: 'Mauritania', value: 'Mauritania' },
//     { label: 'Mauritius', value: 'Mauritius' },
//     { label: 'Mexico', value: 'Mexico' },
//     { label: 'Micronesia', value: 'Micronesia' },
//     { label: 'Moldova', value: 'Moldova' },
//     { label: 'Monaco', value: 'Monaco' },
//     { label: 'Mongolia', value: 'Mongolia' },
//     { label: 'Montenegro', value: 'Montenegro' },
//     { label: 'Morocco', value: 'Morocco' },
//     { label: 'Mozambique', value: 'Mozambique' },
//     { label: 'Myanmar (formerly Burma)', value: 'Myanmar (formerly Burma)' },
//     { label: 'Namibia', value: 'Namibia' },
//     { label: 'Nauru', value: 'Nauru' },
//     { label: 'Nepal', value: 'Nepal' },
//     { label: 'Netherlands', value: 'Netherlands' },
//     { label: 'New Zealand', value: 'New Zealand' },
//     { label: 'Nicaragua', value: 'Nicaragua' },
//     { label: 'Niger', value: 'Niger' },
//     { label: 'Nigeria', value: 'Nigeria' },
//     { label: 'North Korea', value: 'North Korea' },
//     { label: 'North Macedonia (formerly Macedonia)', value: 'North Macedonia (formerly Macedonia)' },
//     { label: 'Norway', value: 'Norway' },
//     { label: 'Oman', value: 'Oman' },
//     { label: 'Pakistan', value: 'Pakistan' },
//     { label: 'Palau', value: 'Palau' },
//     { label: 'Palestine State', value: 'Palestine State' },
//     { label: 'Panama', value: 'Panama' },
//     { label: 'Papua New Guinea', value: 'Papua New Guinea' },
//     { label: 'Paraguay', value: 'Paraguay' },
//     { label: 'Peru', value: 'Peru' },
//     { label: 'Philippines', value: 'Philippines' },
//     { label: 'Poland', value: 'Poland' },
//     { label: 'Portugal', value: 'Portugal' },
//     { label: 'Qatar', value: 'Qatar' },
//     { label: 'Romania', value: 'Romania' },
//     { label: 'Russia', value: 'Russia' },
//     { label: 'Rwanda', value: 'Rwanda' },
//     { label: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis' },
//     { label: 'Saint Lucia', value: 'Saint Lucia' },
//     { label: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines' },
//     { label: 'Samoa', value: 'Samoa' },
//     { label: 'San Marino', value: 'San Marino' },
//     { label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
//     { label: 'Saudi Arabia', value: 'Saudi Arabia' },
//     { label: 'Senegal', value: 'Senegal' },
//     { label: 'Serbia', value: 'Serbia' },
//     { label: 'Seychelles', value: 'Seychelles' },
//     { label: 'Sierra Leone', value: 'Sierra Leone' },
//     { label: 'Singapore', value: 'Singapore' },
//     { label: 'Slovakia', value: 'Slovakia' },
//     { label: 'Slovenia', value: 'Slovenia' },
//     { label: 'Solomon Islands', value: 'Solomon Islands' },
//     { label: 'Somalia', value: 'Somalia' },
//     { label: 'South Africa', value: 'South Africa' },
//     { label: 'South Korea', value: 'South Korea' },
//     { label: 'South Sudan', value: 'South Sudan' },
//     { label: 'Spain', value: 'Spain' },
//     { label: 'Sri Lanka', value: 'Sri Lanka' },
//     { label: 'Sudan', value: 'Sudan' },
//     { label: 'Suriname', value: 'Suriname' },
//     { label: 'Sweden', value: 'Sweden' },
//     { label: 'Switzerland', value: 'Switzerland' },
//     { label: 'Syria', value: 'Syria' },
//     { label: 'Taiwan', value: 'Taiwan' },
//     { label: 'Tajikistan', value: 'Tajikistan' },
//     { label: 'Tanzania', value: 'Tanzania' },
//     { label: 'Thailand', value: 'Thailand' },
//     { label: 'Timor-Leste (East Timor)', value: 'Timor-Leste (East Timor)' },
//     { label: 'Oman', value: 'Oman' },
//     { label: 'Pakistan', value: 'Pakistan' },
//     { label: 'Palau', value: 'Palau' },
//     { label: 'Palestine State', value: 'Palestine State' },
//     { label: 'Panama', value: 'Panama' },
//     { label: 'Papua New Guinea', value: 'Papua New Guinea' },
//     { label: 'Paraguay', value: 'Paraguay' },
//     { label: 'Peru', value: 'Peru' },
//     { label: 'Philippines', value: 'Philippines' },
//     { label: 'Poland', value: 'Poland' },
//     { label: 'Portugal', value: 'Portugal' },
//     { label: 'Qatar', value: 'Qatar' },
//     { label: 'Romania', value: 'Romania' },
//     { label: 'Russia', value: 'Russia' },
//     { label: 'Rwanda', value: 'Rwanda' },
//     { label: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis' },
//     { label: 'Saint Lucia', value: 'Saint Lucia' },
//     { label: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines' },
//     { label: 'Samoa', value: 'Samoa' },
//     { label: 'San Marino', value: 'San Marino' },
//     { label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
//     { label: 'Saudi Arabia', value: 'Saudi Arabia' },
//     { label: 'Senegal', value: 'Senegal' },
//     { label: 'Serbia', value: 'Serbia' },
//     { label: 'Seychelles', value: 'Seychelles' },
//     { label: 'Sierra Leone', value: 'Sierra Leone' },
//     { label: 'Singapore', value: 'Singapore' },
//     { label: 'Slovakia', value: 'Slovakia' },
//     { label: 'Slovenia', value: 'Slovenia' },
//     { label: 'Solomon Islands', value: 'Solomon Islands' },
//     { label: 'Somalia', value: 'Somalia' },
//     { label: 'South Africa', value: 'South Africa' },
//     { label: 'South Korea', value: 'South Korea' },
//     { label: 'South Sudan', value: 'South Sudan' },
//     { label: 'Spain', value: 'Spain' },
//     { label: 'Sri Lanka', value: 'Sri Lanka' },
//     { label: 'Sudan', value: 'Sudan' },
//     { label: 'Suriname', value: 'Suriname' },
//     { label: 'Sweden', value: 'Sweden' },
//     { label: 'Switzerland', value: 'Switzerland' },
//     { label: 'Syria', value: 'Syria' },
//     { label: 'Taiwan', value: 'Taiwan' },
//     { label: 'Tajikistan', value: 'Tajikistan' },
//     { label: 'Tanzania', value: 'Tanzania' },
//     { label: 'Thailand', value: 'Thailand' },
//     { label: 'Timor-Leste (East Timor)', value: 'Timor-Leste (East Timor)' },
//     { label: 'Togo', value: 'Togo' },
//     { label: 'Tonga', value: 'Tonga' },
//     { label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
//     { label: 'Tunisia', value: 'Tunisia' },
//     { label: 'Turkey', value: 'Turkey' },
//     { label: 'Turkmenistan', value: 'Turkmenistan' },
//     { label: 'Tuvalu', value: 'Tuvalu' },
//     { label: 'Uganda', value: 'Uganda' },
//     { label: 'Ukraine', value: 'Ukraine' },
//     { label: 'United Arab Emirates (UAE)', value: 'United Arab Emirates (UAE)' },
//     { label: 'United Kingdom (UK)', value: 'United Kingdom (UK)' },
//     { label: 'United States of America (USA)', value: 'United States of America (USA)' },
//     { label: 'Uruguay', value: 'Uruguay' },
//     { label: 'Uzbekistan', value: 'Uzbekistan' },
//     { label: 'Vanuatu', value: 'Vanuatu' },
//     { label: 'Vatican City (Holy See)', value: 'Vatican City (Holy See)' },
//     { label: 'Venezuela', value: 'Venezuela' },
//     { label: 'Vietnam', value: 'Vietnam' },
//     { label: 'Yemen', value: 'Yemen' },
//     { label: 'Zambia', value: 'Zambia' },
//     { label: 'Zimbabwe', value: 'Zimbabwe' }
//     ];

export default class CustomRegister1 extends NavigationMixin(LightningElement) {
@track firstName;
@track lastName;
@track email;
@track address;
@track selectedState = '';
@track stateOptions = stateOptions;
@track selectedCountry = '';
@track countryOptions = countryOptions;
    
handleChangefirstName(event){
    this.firstName = event.target.value;
    console.log(this.firstName);
}
handleChangeLastName(event){
    this.lastName = event.target.value;
    console.log(this.lastName);
}
handleChangeEmail(event){
    this.email = event.target.value;
    console.log(this.email);
}
handleChangePhone(event){
    this.phone = event.target.value;
    console.log(this.phone);
}
handleDeliveryStreet(event){
    this.deliverystreet = event.target.value;
    console.log(this.deliverystreet);
}
handleDeliveryCity(event){
    this.deliverycity = event.target.value;
    console.log(this.deliverycity);
}
handleChangeState(event) {
    this.selectedState = event.detail.value;
    console.log(this.selectedState);
}
handleChangeCountry(event) {
    this.selectedCountry = event.detail.value;
    console.log(this.selectedCountry);
}


handleRegister() {
                if(this.firstName !== '' && this.lastName !== '' && this.email !== '' && this.selectedState !=='' && this.deliverystreet !=='' && this.deliverycity !==''&& this.selectedCountry !==''&& this.phone !==''){
                console.log(this.firstName + ' ' + this.lastName + ' ' + this.email + ' ' + this.selectedState + ' '+ this.deliverycity + ' '+ this.deliverystreet + ' ' + this.selectedCountry );
                CustomSelfRegisterClass({firstName: this.firstName , lastName:this.lastName , email:this.email, phone: this.phone, deliverystreet: this.deliverystreet, deliverycity: this.deliverycity, selectedState:this.selectedState,selectedCountry: this.selectedCountry})
                    .then(response => {
                        console.log(response);
                        if(response === 'Registered Successfully'){
                            console.log(response);
                            const event1 = new ShowToastEvent({
                                title: 'Success!',
                                message: 'Registered Successfully',
                                variant: 'success'
                                });
                                this.dispatchEvent(event1);
                            this.firstName = '';
                            this.lastName = '';
                            this.email = '';
                            this.selectedState ='';
                            this.deliverycity = '';
                            this.deliverystreet = '';
                        }
                        else if(response === 'Registeration Failed' || response === 'Error occured while Registration!'){
                            console.log(response);
                            const event2 = new ShowToastEvent({
                                title: 'Failed!',
                                message: 'Registeration Failed',
                                variant: 'error'
                                });
                                this.dispatchEvent(event2);
                            this.firstName = '';
                            this.lastName = '';
                            this.email = '';
                            this.selectedState ='';
                            this.deliverycity = '';
                            this.deliverystreet = '';
                        }
                        else if(response === 'Email already exists!!!'){
                            console.log(response);
                            const event4 = new ShowToastEvent({
                                title: 'Error!',
                                message: 'Please fill all the fields',
                                variant: 'error'
                                });
                                this.dispatchEvent(event4);
                            this.firstName = '';
                            this.lastName = '';
                            this.email = '';
                            this.selectedState ='';
                            this.deliverycity = '';
                            this.deliverystreet = '';
                        }
                    })
                    .catch(error => {
                    // window.alert("We are having some trouble at the moment...");
                    console.log(error);
                    })
            }else{
                const event3 = new ShowToastEvent({
                    title: 'Error!',
                    message: 'Please fill all the fields',
                    variant: 'error'
                    });
                    this.dispatchEvent(event3);
            }
    }
}