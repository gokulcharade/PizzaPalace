/* eslint-disable dot-notation */
/* eslint-disable @lwc/lwc/no-document-query */
// /* eslint-disable no-prototype-builtins */
// import { LightningElement,track} from 'lwc';
// import getOrderData from '@salesforce/apex/OrderControllerr.getOrderData';

// export default class Invoice extends LightningElement {
//   @track accountId;
//   @track orderId;

//   orders = [];

//   ampm = true;

//   connectedCallback() {
//           const urlParams = new URLSearchParams(window.location.search);
//           const orderId = urlParams.get("orderId");
//           console.log("Order Id from second component:", orderId);
//           getOrderData({orderId: orderId})
//           .then(result => {
//               this.orders = result;
//               this.orderId = orderId;
//               console.log('Download Invoice Order Id:', this.orderId);
//           });
//   }

//   handleDownload() {
//     // Perform SOQL query to get order data
//     getOrderData({orderId: this.orderId})
//       .then(data => {
//         // Create new PDF document
//         console.log(data);
      
//       })
//       .catch(error => {
//         console.error('Invoice Error:',error);
//       });
//   }
// }

// Invoice.js
import { LightningElement, track } from 'lwc';
import getOrderData from '@salesforce/apex/OrderControllerr.getOrderData';

export default class Invoice extends LightningElement {
    @track accountId;
    @track orderId;
    orders = [];
    ampm = true;

    connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("orderId");
        console.log("Order Id from second component:", orderId);
        getOrderData({ orderId: orderId })
            .then(result => {
                this.orders = result;
                this.orderId = orderId;
                console.log('Download Invoice Order Id:', this.orderId);
            })
            .catch(error => {
                console.error('Invoice Error:', error);
            });
    }
    get formattedDate() {
      const date = new Date(this.data['Order Date']);
      const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
      return formattedDate;
  }

    handleDownload() {
      getOrderData({ orderId: this.orderId })
          .then(data => {
              // Create a new window to hold the PDF contents
              let pdfWindow = window.open("", "PDF");
              
              // // Download the barcode image and convert it to a data URL
              // let img = new Image();
              // img.crossOrigin = "Anonymous";
              // // img.src = "https://horizontal66-dev-ed.develop.my.site.com/pizzawebsite/file-asset/logo2?v=1&height=300&width=300";
              // img.src = "https://raw.githubusercontent.com/gokulcharade/staticfile/main/4.jpg";
              // img.onload = () => {
              //     let canvas = document.createElement("canvas");
              //     canvas.width = img.width;
              //     canvas.height = img.height;
              //     let ctx = canvas.getContext("2d");
              //     ctx.drawImage(img, 0, 0);
              //     let dataUrl = canvas.toDataURL();

  
              // Generate the PDF contents using the order data
              let pdfContent = `
              <html>
              <head>
                <meta http-equiv="Content-Security-Policy" content="img-src 'self' https://barcode.tec-it.com">
                <title>Invoice for Order ${data['Order Number']}</title>
                <style>
                  body {
                    font-family: Arial, Helvetica, sans-serif;
                    padding: 20px;
                    line-height: 1.5;
                    color: #333;
                  }
                  h1 {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                  }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                  }
                  table th, table td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                  }
                  table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  }
                  .invoice-details {
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                  }
                  .invoice-details p {
                    flex-basis: 50%;
                    margin: 0;
                  }
                  .invoice-details p strong {
                    font-weight: bold;
                  }
                  .total {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    background-color: #f2f2f2;
                    padding: 20px;
                    margin-top: 30px;
                  }
                  .total p {
                    margin: 0 10px 0 0;
                  }
                  .total strong {
                    font-weight: bold;
                  }
                </style>
              </head>
              <body>
              <br>
                <h1>Pizza Palace - Online Ordering</h1>
                <br>
                <h2>Invoice for Order ${data['Order Number']}</h2>
                <div class="invoice-details">
                  <p><strong>Order Status:</strong> ${data['Order Status']}</p>
                  <p><strong>Name:</strong> ${data['Account Name']}</p>
                  <p><strong>Order Date:</strong> ${data['Order Date']}</p>
                  <p><strong>Delivery Person:</strong> ${data['Delivery Person']}</p>
                  <p><strong>Delivery Address:</strong> ${data['Delivery Street']}, ${data['Delivery City']}, ${data['Delivery State']}, ${data['Delivery Country']}</p>
                  
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th></th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Base Price</td>
                      <td></td>
                      <td>₹ ${data['Base Price']}</td>
                    </tr>
                    <tr>
                      <td>GST</td>
                      <td></td>
                      <td>₹ ${data['GST']}</td>
                    </tr>
                    <tr>
                      <td>Delivery Charge</td>
                      <td></td>
                      <td>₹ ${data['Delivery Charge']}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="total">
                  <p><strong>Grand Total:</strong></p>
                  <strong>₹ ${data['Grand Total']}</strong>
                </div>
                <div>
                  <center><p style="margin:50px;">
                  This is a computer generated invoice, doesn't need signature & this is a valid proof for invoice by Pizza Palace India ltd
                  <br><br><b>Thank you for ordering at Pizza Palace India limited.</b><br><b>Visit us again! :)</b></p></center>
              </body>
              </html>
              `;
  
              // Write the PDF contents to the new window
              pdfWindow.document.write(pdfContent);
  
              // // Print the window contents to a PDF
              pdfWindow.print();
  
              // Close the window after printing
              pdfWindow.close();
             
          })
          .catch(error => {
              console.error('Invoice Error:', error);
          });
  }
}

