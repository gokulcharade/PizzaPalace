public with sharing class OrderLineItemController {
    @AuraEnabled(cacheable=true)
    public static List<Order_Line_Item__c> getOrderLineItems(Id orderId) {
        Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;
        return [SELECT Id, Name, Pizza__c, Pizza__r.Name, Pizza__r.Price__c, Quantity__c, Amount__c, Order__c
        FROM Order_Line_Item__c
        WHERE Order__r.Account__c = :accountId AND Order__r.Id = :orderId];
    }
}

