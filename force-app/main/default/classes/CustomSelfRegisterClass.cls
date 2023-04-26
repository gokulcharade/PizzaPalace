/*
* Method Name  : 	CustomSelfRegisterClass
*/
global without sharing class CustomSelfRegisterClass {
    @AuraEnabled
    global static string createAccount(String firstName, String lastName , String email, String phone, String deliverystreet, String deliverycity, String selectedState, String selectedCountry){
        Savepoint rollbackStartPoint = Database.setSavepoint();
        try{
            System.debug('firstName : '+firstName);System.debug('lastName : '+lastName);System.debug('email : '+email);
            String contactId =	getUserAccountContactId( firstName ,  lastName,  email, phone, deliverystreet, deliverycity, selectedState, selectedCountry);
            if(contactId != null || contactId != '' ){
                System.debug('Contact Id : '+contactId);
                List<User> checkForExistingUser = [SELECT Id FROM User WHERE Email =:Email LIMIT 1];
                if(checkForExistingUser.isEmpty()){
                    System.debug('No Existing User Found Block');
                    Profile profile = [SELECT Id, Name FROM Profile WHERE Name = 'Demo Comm Profile'];
                    Id profileId = profile.Id;
                    System.debug('Profile Id : '+profileId);
                    String response = createCommunityUser(firstName , lastName , email , contactId, profileId);
                    System.debug('Response : '+response);
                    if(response == 'Registeration Failed'){
                        Database.rollback(rollbackStartPoint);
                        System.debug('ROLLBACK CALLED>>');
                    }
                    return response;
                }else{
                    Database.rollback(rollbackStartPoint);
                    System.debug('ROLLBACK CALLED>>');
                    system.debug('Email already exists!!!');
                    return 'Email already exists!!!';
                }
            }else{
                Database.rollback(rollbackStartPoint);
                System.debug('ROLLBACK CALLED>>');
                system.debug('Contact Id is empty or null');
                return 'Contact Id is empty or null';
            }
        }
        catch(Exception ex){
            Database.rollback(rollbackStartPoint);
            System.debug('ROLLBACK CALLED>> ');
            system.debug('Error occured while Registration!!!');
            return 'Error occured while Registration!'+ex.getMessage()+' @@ '+ex.getStackTraceString();
        }
    }
/*
* Method Name  : 	getUserAccountContactId
* Discription  :	Method to get the Contact Id of the Created User Account
* Returns	   :	userAccountContactId
*/
    global static String getUserAccountContactId(String firstName , String lastName, String email, String phone, String deliverystreet, String deliverycity, String selectedState, String selectedCountry ){
        Id personAccountRecordTypeId =  [SELECT Id FROM RecordType WHERE SobjectType ='Account' AND IsActive =True AND DeveloperName ='PersonAccount' LIMIT 1].Id;
        System.debug('personAccountRecordTypeId : '+personAccountRecordTypeId);
        Account userAccount = new Account(FirstName = firstName,
                                          LastName = lastName,
                                          PersonEmail = email,
                                          Delivery_Address__Street__s = deliverystreet,
                                          Delivery_Address__StateCode__s = selectedState,
                                          Delivery_Address__CountryCode__s = selectedCountry,
                                          Phone = phone,
                                          RecordTypeId = personAccountRecordTypeId);
        insert userAccount;
        System.debug('AccountId'+userAccount.Id);
        Id userAccountContactId =[SELECT PersonContactId  FROM Account WHERE Id =:userAccount.Id LIMIT 1].PersonContactId;
        return userAccountContactId;
    }
/*
* Method Name  : 	createCommunityUser
* Discription  :	Method to create Community User
* Returns	   :	Success Message / Error Message
*/
    global static String createCommunityUser(String firstName , String lastName , String emailId ,  String contactId, String profileId){
        try{
            system.debug(UserInfo.getLocale());
            system.debug('FName : '+firstName+' | LName : '+lastName+' | '+' Email : '+emailId+ ' | ContactId : '+contactId+' | Profile Id : '+profileId);
            User communityUser = new User(FirstName = firstName, LastName = lastName,
                                          Email = emailId,ContactId = contactId,ProfileId = profileId,
                                          UserName = emailId,Alias = firstName,CommunityNickName = firstName,
                                          TimeZoneSidKey = 'Asia/Colombo',LocaleSidKey =  'en_US',
                                          EmailEncodingKey = 'UTF-8',LanguageLocaleKey = 'en_US' );
            insert communityUser;
            system.debug('Registered Successfully! User Id is: '+communityUser.Id);
            return 'Registered Successfully';
        }
        catch(Exception ex){
            system.debug(ex.getMessage());
            system.debug(ex.getStackTraceString());
            return 'Registeration Failed'+ ex.getMessage();
        }
    }
}