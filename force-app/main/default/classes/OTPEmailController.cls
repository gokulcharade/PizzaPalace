public with sharing class OTPEmailController {
    @AuraEnabled(cacheable=false)
    public static void sendOTPEmail(String userEmail, Integer otp) {
        // Create the email message
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] { userEmail };
        mail.setToAddresses(toAddresses);
        mail.setSubject('Your OTP for verification');
        mail.setPlainTextBody('Your OTP is ' + otp);
        // Send the email message
        Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        if (results[0].isSuccess()) {
            System.debug('OTP email sent successfully: ');
        } else {
            System.debug('OTP email sending failed: ' + results[0].getErrors()[0].getMessage());
        }
    }
}