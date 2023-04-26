public with sharing class GetCurrentUserAccountId {
    @InvocableMethod(label='Get Current User Account ID' description='Returns the ID of the current user account')
    public static List<Id> getCurrentUserAccountId() {
        List<Id> accountIds = new List<Id>();
        Id accountId = [SELECT Id, Name, OwnerId FROM Account WHERE OwnerId = :UserInfo.getUserId() LIMIT 1].Id;
        accountIds.add(accountId);
        return accountIds;
    }
}