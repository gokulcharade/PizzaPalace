public with sharing class PincodeLookupController {
    
    // @AuraEnabled(cacheable=true)
    // public static List<String> getPizzaOutletsByPincode(String pincode) {

    //     List<Location__c> locations = [SELECT Id, Pincode__c, (SELECT Name FROM Pizza_Outlets__r) FROM Location__c];
    //     List<String> pizzaOutlets = new List<String>();
    //     for (Location__c loc : locations) {
    //         if (loc.Pincode__c == pincode) {
    //             for (Pincode__c po : loc.Pizza_Outlets__r) {
    //                 pizzaOutlets.add(po.Name);
    //             }
    //         }
    //     }
    //     return pizzaOutlets;
    // }
}