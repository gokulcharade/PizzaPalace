public with sharing class OrderControllerr {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getOrderData(Id orderId) {
      // Perform SOQL query to get order data
      Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;
      Order__c order = [
        SELECT Id, Account__c, Account__r.Name, Name, Order_Status__c, BasePrice__c, GST__c, Delivery_Charge__c, Grand_Total__c, Order_DateTime__c, DeliveryAddress__Street__s, DeliveryAddress__City__s, DeliveryAddress__PostalCode__s, DeliveryAddress__StateCode__s, DeliveryAddress__CountryCode__s, DeliveryAddress__Latitude__s, DeliveryAddress__Longitude__s, DeliveryAddress__GeocodeAccuracy__s, DeliveryAddress__c, Delivery_Person__r.Name 
        FROM Order__c 
        WHERE Account__c = :accountId AND Id = :orderId
      ];
  
      // Create a map of the order data to return
      Map<String, Object> data = new Map<String, Object>();
      data.put('Order Number', order.Name);
      data.put('Order Status', order.Order_Status__c);
      data.put('Account Name', order.Account__r.Name);
      data.put('Base Price', order.BasePrice__c);
      data.put('GST', order.GST__c);
      data.put('Delivery Charge', order.Delivery_Charge__c);
      data.put('Grand Total', order.Grand_Total__c);
      data.put('Order Date', order.Order_DateTime__c);
      data.put('Delivery Address', order.DeliveryAddress__c);
      data.put('Delivery Street', order.DeliveryAddress__Street__s);
      data.put('Delivery City', order.DeliveryAddress__City__s);
      data.put('Delivery Postal Code', order.DeliveryAddress__PostalCode__s);
      data.put('Delivery State', order.DeliveryAddress__StateCode__s);
      data.put('Delivery Country', order.DeliveryAddress__CountryCode__s);
      data.put('Delivery Person', order.Delivery_Person__r.Name);
  
      return data;
    }
  }