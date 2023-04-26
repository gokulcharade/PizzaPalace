public with sharing class SOQLControllerGeneric {
    @AuraEnabled(cacheable=true)
    public static List<Location__c> getLocationsByPincode(String pincode) {
        List<Location__c> locations = [SELECT Id, Pincode__c, Pizza_Outlet__r.Id, Pizza_Outlet__r.Name,Pizza_Outlet__r.Address__City__s, Pizza_Outlet__r.Address__Street__s
        FROM Location__c WHERE Pincode__c = :pincode];
        return locations; 
    }
}