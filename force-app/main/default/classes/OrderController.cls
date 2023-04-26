public with sharing class OrderController {
    @AuraEnabled(cacheable=false)
    public static List<Order__c> getOrderData(Id orderId) {
        Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;
        return [SELECT Id, Account__c,Account__r.Name, Name, Order_Status__c, BasePrice__c, GST__c, Delivery_Charge__c, Grand_Total__c, Order_DateTime__c, DeliveryAddress__Street__s, DeliveryAddress__City__s, DeliveryAddress__PostalCode__s, DeliveryAddress__StateCode__s, DeliveryAddress__CountryCode__s, DeliveryAddress__Latitude__s, DeliveryAddress__Longitude__s, DeliveryAddress__GeocodeAccuracy__s, DeliveryAddress__c, Delivery_Person__r.Name FROM Order__c WHERE Account__c = :accountId AND Id = :orderId];
    }

    @AuraEnabled
    public static String updateOrderPaymentStatus(Id orderId) {
        try {
            Order__c orderToUpdate = [SELECT Id, Payment_Status__c FROM Order__c WHERE Id = :orderId LIMIT 1];
            orderToUpdate.Payment_Status__c = true;
            update orderToUpdate;
            return 'Order payment status updated successfully';
        } catch (Exception e) {
            throw new AuraHandledException('Error updating order payment status: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static String sendemail(Id orderId) {
        try {
            sendOrderConfirmationEmail.sendOrderConfirmationEmail(orderId);
            return 'Order email sent successfully';
        } catch (Exception e) {
            throw new AuraHandledException('Error updating order payment status: ' + e.getMessage());
        }
    }

   
}
