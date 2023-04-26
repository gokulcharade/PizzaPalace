/* eslint-disable no-dupe-class-members */
/* eslint-disable no-alert */
import { LightningElement,track,api} from 'lwc';
import fetchPizzaInventoryList1 from '@salesforce/apex/PizzaInventoryController.fetchPizzaInventoryList1';
import fetchPizzaInventoryList2 from '@salesforce/apex/PizzaInventoryController.fetchPizzaInventoryList2';
import getAccounts from '@salesforce/apex/PizzaInventoryController.getAccounts';
import storePizzaOrder from '@salesforce/apex/PizzaInventoryController.storePizzaOrder';


export default class PizzaInventory extends LightningElement {
    @track pizzaInventoryList;
    @track accounts;
    @track accountId;
    @track quantity;
    @track selectedPizzaId;
    @track selectedquantity;
    @api item;
    @track lat;
    @track long;
    @api latitude;
    @api longitude;

    get mapSrc() {
        return 'https://maps.google.com/maps?q=' + this.latitude + ',' + this.longitude + '&output=embed';
    }



    //runs when page is loaded
    connectedCallback() {
        
        //fetching outlet id from url
        const urlParams = new URLSearchParams(window.location.search);
        const outletId = urlParams.get('outletId');
        console.log('From Page:',outletId);
        
        // //for pizza menu cards and pizza outlet inforamtion
        // fetchPizzaInventoryList({ outletId: outletId })
        //     .then(result => {
        //         this.pizzaInventoryList = result;
        //         console.log("Outlet and Card info:",this.pizzaInventoryList);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

        //for pizza menu cards and pizza outlet inforamtion
        fetchPizzaInventoryList1({ outletId: outletId })
            .then(result1 => {
                this.pizzaInventoryList1 = result1;
                console.log("Outlet info:",this.pizzaInventoryList1);
                this.lat=this.pizzaInventoryList1[0].Pizza_Outlet__r.Location__Latitude__s;
                
                this.long=this.pizzaInventoryList1[0].Pizza_Outlet__r.Location__Longitude__s;
                
            })
            .catch(error => {
                console.log(error);
            });

            //for pizza menu cards and pizza outlet inforamtion
        fetchPizzaInventoryList2({ outletId: outletId })
        .then(result2 => {
            this.pizzaInventoryList2 = result2;
            console.log("Card info:",this.pizzaInventoryList2);
        })
        .catch(error => {
            console.log(error);
        });

        //for loading accounts
        getAccounts()
            .then(data => {
                this.accounts = data;
                console.log("Accounts:",this.accounts);
            })
            .catch(error => {
                console.error(error);
            });

      
    }

    //for quantity
    handlequantity(event) {
        this.quantity = event.target.value;
        this.selectedquantity = event.target.dataset.pizzaId;
        console.log('1: ',this.quantity);
        console.log('2: ',this.selectedquantity);
    
    }

    //for add to cart
    handleAddToCartClick(event) {
        this.selectedPizzaId = event.target.dataset.pizzaId;
  
        if (this.selectedquantity === this.selectedPizzaId) {
          console.log('4: ', this.quantity);
          console.log('5: ', this.selectedPizzaId);
          console.log('6: ', this.selectedquantity);
          console.log("Sent to backend")
          storePizzaOrder({ quantity: this.quantity, selectedPizza: this.selectedPizzaId })
            .then(result => {
                console.log("backend:",result);
                window.alert("Selected Pizza for Quantity " +this.quantity+" Added");
                
            })
            .catch(error => {
                console.log(error);
            });

            event.target.label = "Added to Cart";
                event.target.disabled = true;
                const inputElement = event.target.previousSibling;
                inputElement.style.display = "none";
        }
    }


    //move to cart page
    handleClick(){
        window.location.href="/s/cart"
    }

    get mapSrc() {
        console.log(this.lat);
        console.log(this.long);
        return 'https://maps.google.com/maps?q=' + this.lat + ',' + this.long + '&output=embed';
        

    }


   
    
    
}