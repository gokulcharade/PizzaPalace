public with sharing class allorder {
    @AuraEnabled(cacheable=true)
    public static List<Order__c> allorder() {
        Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;
        return [SELECT Id, Account__c,Account__r.Name, Name, Order_Status__c, BasePrice__c, GST__c, Delivery_Charge__c, Grand_Total__c, Order_DateTime__c, DeliveryAddress__Street__s, DeliveryAddress__City__s, DeliveryAddress__PostalCode__s, DeliveryAddress__StateCode__s, DeliveryAddress__CountryCode__s, DeliveryAddress__Latitude__s, DeliveryAddress__Longitude__s, DeliveryAddress__GeocodeAccuracy__s, DeliveryAddress__c, Delivery_Person__r.Name FROM Order__c WHERE Account__c = :accountId ORDER BY Order_DateTime__c DESC];
    }
}
