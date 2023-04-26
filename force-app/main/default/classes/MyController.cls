public with sharing class MyController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Id> getUserAndAccountId() {
        User currentUser = [SELECT Id, AccountId FROM User WHERE Id = :UserInfo.getUserId()];
        Id userId = currentUser.Id;
        Id accountId = currentUser.AccountId;
        Map<String, Id> result = new Map<String, Id>();
        result.put('userId', userId);
        result.put('accountId', accountId);
        return result;
    }
}