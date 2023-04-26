// public with sharing class AccountController {
//     @AuraEnabled(cacheable=true)
//     public static List<Account> getAccounts() {
//         return [SELECT Id, Name FROM Account];
//     }

// }
public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static string methodName(){
        string accountId;
        string userId;
        try {
            List<Account> accounts = getAccounts();
            if(accounts != null && accounts.size() > 0) {
                accountId = accounts[0].Id;
                System.debug('Particular Account Id stored: ' + accountId);
            }
            
            //userId = UserInfo.getUserId();
            //User user = [SELECT AccountId FROM User WHERE Id = :userId];
            //accountId = user.AccountId;
            //System.debug('Current User ID: ' + userId);
            //System.debug('Account ID: ' + accountId);

            Cart__c cart = new Cart__c();
            cart.Account__c = accountId; 
            insert cart;
            System.debug('success');
            return 'Success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}