
public class sendOrderConfirmationEmail{
    @AuraEnabled
    public static void sendOrderConfirmationEmail(Id orderId) {
        try {
            // Fetch the order and user information
            Order__c order = [SELECT Id, Name, Account__c, Account__r.Name, Order_Status__c, BasePrice__c, GST__c, Delivery_Charge__c, Grand_Total__c, Order_DateTime__c, DeliveryAddress__c FROM Order__c WHERE Id = :orderId];
            User currentUser = [SELECT Id, Name, Email FROM User WHERE Id = :UserInfo.getUserId()];

            // Create a new email message
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

            // Set the email properties
            mail.setToAddresses(new String[] {currentUser.Email});
            mail.setSenderDisplayName('Pizza Palace - Online Delivery Service');
            mail.setSubject('Pizza Palace - Your Order Placed Successfully: ' + order.Name);
            mail.setHtmlBody('<html><body><p><b>Hello ' + currentUser.Name + ',<b></p><p><strong>Your Order (' + order.Name + ') has been placed successfully!</strong> <br>Here are the details:</p><ul><li>Order ID: ' + order.Id + '</li><li>Name: ' + order.Account__r.Name + '</li><li>Order Status: ' + order.Order_Status__c + '</li><li>Base Price: ₹ ' + order.BasePrice__c + '</li><li>GST: ₹ ' + order.GST__c + '</li><li>Delivery Charge: ₹ ' + order.Delivery_Charge__c + '</li><li>Grand Total: ₹ ' + order.Grand_Total__c + '</li><li>Order Date & Time: ' + order.Order_DateTime__c + '</li></ul><p>Thank you for using Pizza Palace Delivery Service!<br> Visit Again :)</p><p><a href="https://horizontal66-dev-ed.develop.my.site.com/pizzawebsite/s/invoice?orderId=' + order.Id + '"><button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Check Realtime Status</button></a></p></body></html>');

            // Send the email
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        } catch (Exception e) {
            throw new AuraHandledException('Error sending order confirmation email: ' + e.getMessage());
        }
    }
}