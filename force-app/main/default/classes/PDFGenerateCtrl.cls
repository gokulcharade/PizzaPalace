public class PDFGenerateCtrl {
    public Contact con{get;set;}
    public String currentRecordId{get;set;}
 
    public PDFGenerateCtrl(){
        currentRecordId  = ApexPages.CurrentPage().getparameters().get('id');
        if(currentRecordId != null && String.isNotBlank(currentRecordId)){
            con = [SELECT Id, Name, Email FROM Contact WHERE Id =:currentRecordId];
        }
    }
 
    @AuraEnabled(cacheable=true)
    public static List<Contact> fetchRecords(){
        try {
            List<Contact> conList = new List<Contact>();
 
            conList = [Select id, Name, Email from Contact];              
            return conList;
        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }
 
    @AuraEnabled
    public static String sendPdf(String contactId) {
        PageReference pdf = new pagereference('/apex/ContactDataPDF?id='+contactId);
        pdf.getParameters().put('id', contactId);
     
        Blob body;
        try {
            // returns page as a PDF
            body = pdf.getContent();
        } catch (Exception e) {
            body = Blob.valueOf('data');
        }
 
        //insert content version
        ContentVersion CV = new ContentVersion();
        CV.Title = 'TechdicerContact.pdf';
        CV.PathOnClient = 'TechdicerContact.pdf';
        CV.VersionData = body;
        CV.FirstPublishLocationId = contactId;
        insert CV;
         
        Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
        attach.setContentType('application/pdf');
        attach.setFileName('TechdicerContact.pdf');
        attach.Body = body;
 
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] {'rijwanmohmmed@gmail.com'});
        mail.setSubject('Generate PDF from Apex Salesforce');
        mail.setHtmlBody('Generate PDF from Apex Salesforce');
        mail.setFileAttachments(new Messaging.EmailFileAttachment[] {attach}); 
        // Send the email
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        return 'Email sent Successfully with PDF.';
   }
}