/* eslint-disable @lwc/lwc/no-async-operation */
// Title: pizzaInventoryMenu
// Description: Creates the Outlet Info, Map, Menu Card and Cart
// Author: Gokul Charde Horizontal

/* eslint-disable no-restricted-globals */
/* eslint-disable no-dupe-class-members */
/* eslint-disable no-alert */
/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, track} from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import fetchPizzaInventoryList1 from "@salesforce/apex/PizzaInventoryController.fetchPizzaInventoryList1";
import fetchPizzaInventoryList2 from "@salesforce/apex/PizzaInventoryController.fetchPizzaInventoryList2";
import getAccounts from "@salesforce/apex/PizzaInventoryController.getAccounts";
import storePizzaOrder from "@salesforce/apex/PizzaInventoryController.storePizzaOrder";
import getCartLineItems from "@salesforce/apex/CartLineItemApex.getCartLineItems";
import deleteCartItem from "@salesforce/apex/CartLineItemApex.deleteCartItem";
// import { refreshApex } from "@salesforce/apex";

export default class PizzaInventorytest extends LightningElement {
  @track pizzaInventoryList;
  @track accounts;
  @track accountId;
  @track quantity = null;
  @track selectedPizzaId;
  @track selectedquantity;
  @track item;
  @track lat;
  @track long;
  @track latitude;
  @track longitude;
  @track cartLineItems;
  @track selectedPizzaPrice;
  @track isfirstrender =true;

  renderedCallback() {
    if(this.isfirstrender===true){
    try {
      //fetching outlet id from url
      const urlParams = new URLSearchParams(window.location.search);
      const outletId = urlParams.get("outletId");
      console.log("From Page:", outletId);

      //for pizza outlet inforamtion
      fetchPizzaInventoryList1({ outletId: outletId })
        .then((result1) => {
          this.pizzaInventoryList1 = result1;
          console.log("Outlet info:", this.pizzaInventoryList1);
          this.lat =
            this.pizzaInventoryList1[0].Pizza_Outlet__r.Location__Latitude__s;
          this.long =
            this.pizzaInventoryList1[0].Pizza_Outlet__r.Location__Longitude__s;
        })
        .catch((error) => {
          console.log(error);
        });

      //for pizza menu cards inforamtion
      fetchPizzaInventoryList2({ outletId: outletId })
        .then((result2) => {
          this.pizzaInventoryList2 = result2;
          console.log("Card info:", this.pizzaInventoryList2);
        })
        .catch((error) => {
          console.log(error);
        });

      //for loading accounts
      getAccounts()
        .then((data) => {
          this.accounts = data;
          console.log("Accounts:", this.accounts);
        })
        .catch((error) => {
          console.error(error);
        });

      getCartLineItems()
        .then((result) => {
          this.cartLineItems = result;
          console.log("Refreshed Cart Items", this.cartLineItems);
        })
        .catch((error) => {
          console.error("Error retrieving Cart Line Items", error);
        });
    } catch (error) {
      console.log("Error:");
      console.error(error);
    }
    }
    this.isfirstrender =false;
  }

  //handles map
  get mapSrc() {
    console.log(this.lat);
    console.log(this.long);
    return (
      "https://maps.google.com/maps?q=" +
      this.lat +
      "," +
      this.long +
      "&output=embed"
    );
  }

//   // Handle quantity change
//   handlequantity(event) {
//     try {
//       this.quantity = event.target.value;
//       this.selectedquantity = event.target.dataset.pizzaId;
//       console.log("1: ", this.quantity);
//       console.log("2: ", this.selectedquantity);
//     } catch (error) {
//       console.error(error);
//       const event3 = new ShowToastEvent({
//         title: "Error",
//         message: "An error occurred while handling the quantity change event",
//         variant: "error"
//       });
//       this.dispatchEvent(event3);
//     }
//   }

  // Handle quantity change
handlequantity(event) {
    try {
      const newQuantity = event.target.value;
      this.selectedquantity = event.target.dataset.pizzaId;
  
      // Check if the new quantity is within the allowed range
      if (newQuantity >= 1 && newQuantity <= 10) {
        this.quantity = newQuantity;
      } else {
        // Reset the quantity to 0 and show an error message
        this.quantity = 0;
      }
  
      console.log("1: ", this.quantity);
      console.log("2: ", this.selectedquantity);
    } catch (error) {
      console.error(error);
      const event3 = new ShowToastEvent({
        title: "Error",
        message: "An error occurred while handling the quantity change event",
        variant: "error"
      });
      this.dispatchEvent(event3);
    }
  }

  
  

//   // Handle add to cart click
//   handleAddToCartClick(event) {
//     try {
//       this.selectedPizzaId = event.target.dataset.pizzaId;
//       this.selectedPizzaPrice = event.target.dataset.pizzaPrice;

//       if (this.selectedquantity === this.selectedPizzaId) {
//         console.log("3 price of current pizza", this.selectedPizzaPrice);
//         console.log("4: ", this.quantity);
//         console.log("5: ", this.selectedPizzaId);
//         console.log("6: ", this.selectedquantity);
//         console.log("Sent to backend");

//         // Call Apex method to store pizza order
//         storePizzaOrder({
//           quantity: this.quantity,
//           selectedPizza: this.selectedPizzaId,
//           price: this.selectedPizzaPrice
//         })
//           .then((result) => {
//             console.log("backend:", result);
//             console.log("1:", this.cartLineItems);
//             // this.renderedCallback();
//             // location.reload();
//             const event1 = new ShowToastEvent({
//               title: "Added to Cart",
//               message:
//                 "Selected Pizza for Quantity " + this.quantity + " Added",
//               variant: "success"
//             });
//             this.dispatchEvent(event1);
//           })
//           .catch((error) => {
//             console.error(error);
//             const event1 = new ShowToastEvent({
//               title: "Error",
//               message:
//                 "An error occurred while adding the selected pizza to cart",
//               variant: "error"
//             });
//             this.dispatchEvent(event1);
//           });

//         // Disable add to cart button and hide quantity input field
//         // event.target.label = "Added to Cart";
//         // event.target.disabled = true;
//         // const inputElement = event.target.previousSibling;
//         // inputElement.style.display = "none";
//       }
//     } catch (error) {
//       console.error(error);
//       const event4 = new ShowToastEvent({
//         title: "Error",
//         message: "An error occurred while handling the add to cart click event",
//         variant: "error"
//       });
//       this.dispatchEvent(event4);
//     }
//   }

handleAddToCartClick(event) {
    setTimeout(() => {
        getCartLineItems()
         .then((result) => {
            this.cartLineItems=result;
            console.log("DATA1",result);
         }).catch((err) => {
             console.log(err);
         });
        
    },2000)
    
    

    // Check if quantity is between 1 and 10
    if (this.quantity < 1 || this.quantity > 10 || this.quantity === null || this.quantity === 0) {
        const event3 = new ShowToastEvent({
          title: "Provide Valid Quantity",
          message: "Please enter a valid quantity between 1 and 10 only.",
          variant: "error"
        });
        this.dispatchEvent(event3);
        return;
      }

    

    try {
      this.selectedPizzaId = event.target.dataset.pizzaId;
      this.selectedPizzaPrice = event.target.dataset.pizzaPrice;
  
      if (this.selectedquantity === this.selectedPizzaId) {
        console.log("3 price of current pizza", this.selectedPizzaPrice);
        console.log("4: ", this.quantity);
        console.log("5: ", this.selectedPizzaId);
        console.log("6: ", this.selectedquantity);
        console.log("Sent to backend");
  
        // Call Apex method to store pizza order
        storePizzaOrder({
          quantity: this.quantity,
          selectedPizza: this.selectedPizzaId,
          price: this.selectedPizzaPrice
        })
          .then((result) => {
            console.log("backend:", result);
            console.log("1:", this.cartLineItems);
            
            const event1 = new ShowToastEvent({
              title: "Added to Cart",
              message:
                "Selected Pizza for Quantity " + this.quantity + " Added",
              variant: "success"
            });
            this.dispatchEvent(event1);
          })
          .catch((error) => {
            console.error(error);
            const event1 = new ShowToastEvent({
              title: "Error",
              message:
                "An error occurred while adding the selected pizza to cart",
              variant: "error"
            });
            this.dispatchEvent(event1);
          });
  
        // Disable add to cart button and hide quantity input field
        // event.target.label = "Added to Cart";
        // event.target.disabled = true;
        // const inputElement = event.target.previousSibling;
        // inputElement.style.display = "none";
      }
    } catch (error) {
      console.error(error);
      const event4 = new ShowToastEvent({
        title: "Error",
        message: "An error occurred while handling the add to cart click event",
        variant: "error"
      });
      this.dispatchEvent(event4);
    }
    
  }

  handleRemoveFromCart(event) {
    
    const cartLineItemId = event.currentTarget.dataset.id;
    deleteCartItem({ cartLineItemId })
      .then(() => {
        Promise.all([getCartLineItems()])
          .then(([cartLineItems]) => {
            this.cartLineItems = cartLineItems;
            this.renderedCallback();
            // window.alert('Removed from cart');

            const event2 = new ShowToastEvent({
              title: "Removed From Cart",
              message: "Selected Item Has Been Removed From The Cart",
              variant: "info" // possible values: 'success', 'warning', 'error', 'info'
            });
            this.dispatchEvent(event2);
          })
          .catch((error) => {
            console.error("Error refreshing Cart Line Items", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting Cart Line Item", error);
      });

    getCartLineItems()
    .then((result) => {
       this.cartLineItems=result;
       console.log("DATA2",result);
    }).catch((err) => {
        console.log(err);
    });
  }

  @track value = 1;

  increase() {
      if (this.value < 10) {
          this.value++;
      }
  }

  decrease() {
      if (this.value > 1) {
          this.value--;
      }
  }




  // handleupdate(){
  //     const event1 = new ShowToastEvent({
  //         title: 'Cart will be updated now...',
  //         variant: 'warning'
  //         });
  //         this.dispatchEvent(event1);
  //     location.reload()
  // }
}
