public with sharing class CommunityUserController {
    @AuraEnabled(cacheable=true)
    public static User getCurrentUser() {
        String userId = UserInfo.getUserId();
        
        System.debug('User ID: ' + userId);
     
        User currentUser;
        try {
            currentUser = [SELECT Id FROM User WHERE Id = :userId];
            System.debug('Current User ID: ' + currentUser.Id);
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
        }
        
        return currentUser;
    }
}