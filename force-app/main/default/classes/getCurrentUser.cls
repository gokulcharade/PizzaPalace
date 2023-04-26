public with sharing class CommunityUserController {
    @AuraEnabled(cacheable=true)
    public static User getCurrentUser() {
        return [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()];
    }
}