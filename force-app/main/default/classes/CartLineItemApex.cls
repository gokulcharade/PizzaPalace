public with sharing class CartLineItemApex {
    
    @AuraEnabled(cacheable=false)
    public static List<CartLineItem__c> getCartLineItems() {
        Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;
        List<CartLineItem__c> cartLineItems = [SELECT Id, Pizza__r.Name, Singleunitprice__c, Quantity__c FROM CartLineItem__c WHERE Cart__r.Account__c = :accountId];
        return cartLineItems;
    }

    @AuraEnabled
    public static String deleteCartItem(String cartLineItemId) {
        try {
            delete new CartLineItem__c(Id = cartLineItemId);
            System.debug('success from backend');
            return 'Hello';
            
        } catch(exception e) {
            return 'Error : ';
        }
    }
}
