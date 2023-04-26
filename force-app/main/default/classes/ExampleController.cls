public without sharing class ExampleController {
    @AuraEnabled(cacheable=false)
    //public static List<CartLineItem__c> getCartLineItemsByAccountId() {
    public static string getCartLineItemsByAccountId() {
        try {
            // //Id userId = UserInfo.getUserId();
            // Id userId = '0052w00000GMzemAAD';
            // System.debug('userId: ' + userId);

            // User user = [SELECT AccountId FROM User WHERE Id = :userId];
            // System.debug('user: ' + user);

            // String accountId = user.AccountId;
            // System.debug('accountId: ' + accountId);
            Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;

            List<Cart__c> carts = [SELECT Id FROM Cart__c WHERE Account__c = :accountId];
            System.debug('carts: ' + carts);

            List<CartLineItem__c> cartLineItems = [SELECT Id, Name, Cart__c, Pizza__c, Quantity__c, Singleunitprice__c
                                                   FROM CartLineItem__c
                                                   WHERE Cart__c IN :carts];
            System.debug('cartLineItems: ' + cartLineItems);

            // Add the following code to collect Order__c IDs
            //List<Order__c> orders = [SELECT Id FROM Order__c WHERE Account__c = :accountId];
            //System.debug('orders: ' + orders);

            //List<String> orderIds = new List<String>();
            //for(Order__c order : orders) {
            //    orderIds.add(String.valueOf(order.Id));
            //}
            //String orderIdsString = JSON.serialize(orderIds);
            //System.debug('orderIds: ' + orderIds);
            
            // Order__c order = [SELECT Id FROM Order__c WHERE Account__c = :accountId LIMIT 1];
			// Id orderId = order.Id;
			// System.debug('orderId: ' + orderId);
            Id selectedDeliveryPerId;
            List<Delivery_Per__c> deliveryPers = [SELECT Id FROM Delivery_Per__c];
            if (deliveryPers != null && deliveryPers.size() > 0) {
                Integer randomIndex = (Integer)Math.floor(Math.random() * deliveryPers.size());
                selectedDeliveryPerId  = deliveryPers[randomIndex].Id;
            }

            Order__c newOrder = new Order__c();
            newOrder.Account__c = accountId;
            newOrder.Delivery_Person__c = selectedDeliveryPerId ;
            insert newOrder;
            Id orderId = newOrder.Id;

            System.debug('orderId: ' + orderId);

            // create a new feedback record
            Feedback__c newFeedback = new Feedback__c();

            // set the custom fields
            newFeedback.Orders__c = orderId; // set the value of the Orders__c field to the new order's ID
            newFeedback.User__c = UserInfo.getUserId(); // set the value of the User__c field to the ID of the user who is giving feedback

            // insert the new feedback record
            insert newFeedback;

            // Loop through the CartLineItem__c records to create Order_Line_Item__c records
            List<Order_Line_Item__c> newOrderLineItems = new List<Order_Line_Item__c>();
            for(CartLineItem__c cartLineItem : cartLineItems) {
                // Create a new Order Line Item record
                Order_Line_Item__c newOrderLineItem = new Order_Line_Item__c();

                // Set the field values for the new record
                newOrderLineItem.Amount__c = cartLineItem.Singleunitprice__c * cartLineItem.Quantity__c;
                //newOrderLineItem.Name = cartLineItem.Pizza__r.Name;
                newOrderLineItem.Order__c = orderId; // Assuming only one order for now
                newOrderLineItem.Pizza__c = cartLineItem.Pizza__c;
                newOrderLineItem.Quantity__c = cartLineItem.Quantity__c;

                // Add the new record to the list to be inserted
                newOrderLineItems.add(newOrderLineItem);
            }

            // Insert the new records
            try {
                insert newOrderLineItems;
                System.debug('Created ' + newOrderLineItems.size() + ' new Order_Line_Item__c records.');
                
            } catch(Exception e) {
                System.debug('Error inserting Order_Line_Item__c records: ' + e.getMessage() + e.getCause() + e.getStackTraceString()+ e.getLineNumber()+e.getInaccessibleFields()+e.getTypeName());
                return 'success';
            }

            return orderId;
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            return ' error '+ e.getMessage() +' error2 '+ e.getCause() +' error 3'+ e.getStackTraceString()+' error 4'+ e.getLineNumber()+'hello';
        }
    }

    @AuraEnabled(cacheable=false)
    public static string getAccountId() {
        try {
            Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;
            return AccountId;
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            return ' error ';
        }
    }
}