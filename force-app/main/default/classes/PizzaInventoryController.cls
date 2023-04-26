public without sharing class PizzaInventoryController {
    
    // //fetching pizza outlet info and pizza info
    // @AuraEnabled(cacheable=false)
    // public static List<Pizza_Inventory__c> fetchPizzaInventoryList(String outletId) {
    //     return [SELECT Id, 
    //             Status__c, 
    //             Pizza_Outlet__r.In_Operation__c, 
    //             Pizza_Outlet__r.Id, 
    //             Pizza_Outlet__r.Name,   
    //             Pizza_Outlet__r.Name__c,
    //             Pizza_Outlet__r.Address__City__s,
    //             Pizza_Outlet__r.Address__Street__s, 
    //             Pizza_Outlet__r.Address__PostalCode__s, 
    //             Pizza_Outlet__r.Address__StateCode__s, 
    //             Pizza_Outlet__r.Address__CountryCode__s, 
    //             Pizza_Outlet__r.Address__Latitude__s, 
    //             Pizza_Outlet__r.Address__Longitude__s, 
    //             Pizza_Outlet__r.Address__GeocodeAccuracy__s,  
    //             Pizza_Outlet__r.Active__c, 
    //             Pizza_Outlet__r.Description__c, 
    //             Pizza_Outlet__r.Opening_Timing__c, 
    //             Pizza_Outlet__r.Closing_Time__c, 
    //             Pizza__r.Id, 
    //             Pizza__r.Name, 
    //             Pizza__r.Pizza_Description__c, 
    //             Pizza__r.Pizza_Image__c, 
    //             Pizza__r.Price__c, 
    //             Pizza__r.Size__c, 
    //             Pizza__r.Pizza_Category__c 
    //             FROM Pizza_Inventory__c 
    //             WHERE Pizza_Outlet__r.Id = :outletId 
    //             AND Pizza_Outlet__r.In_Operation__c = true 
    //             AND Status__c = 'Available'];
    // }

    //fetching pizza outlet info 
    @AuraEnabled(cacheable=true)
    public static List<Pizza_Inventory__c> fetchPizzaInventoryList1(String outletId) {
        return [SELECT Id, 
                Status__c, 
                Pizza_Outlet__r.In_Operation__c, 
                Pizza_Outlet__r.Id, 
                Pizza_Outlet__r.Name,   
                Pizza_Outlet__r.Name__c,
                Pizza_Outlet__r.Address__City__s,
                Pizza_Outlet__r.Address__Street__s, 
                Pizza_Outlet__r.Address__PostalCode__s, 
                Pizza_Outlet__r.Address__StateCode__s, 
                Pizza_Outlet__r.Address__CountryCode__s,  
                Pizza_Outlet__r.Active__c, 
                Pizza_Outlet__r.Description__c, 
                Pizza_Outlet__r.Opening_Timing__c, 
                Pizza_Outlet__r.Closing_Time__c,
                Pizza_Outlet__r.Location__Latitude__s, 
                Pizza_Outlet__r.Location__Longitude__s
                FROM Pizza_Inventory__c 
                WHERE Pizza_Outlet__r.Id = :outletId 
                AND Pizza_Outlet__r.In_Operation__c = true 
                AND Status__c = 'Available'
                LIMIT 1];
    }

    //fetching pizza info
    @AuraEnabled(cacheable=true)
    public static List<Pizza_Inventory__c> fetchPizzaInventoryList2(String outletId) {
        return [SELECT Id, 
                Status__c, 
                Pizza__r.Id, 
                Pizza__r.Name, 
                Pizza__r.Pizza_Description__c, 
                Pizza__r.Pizza_Image__c, 
                Pizza__r.Price__c, 
                Pizza__r.Size__c, 
                Pizza__r.Pizza_Category__c 
                FROM Pizza_Inventory__c 
                WHERE Pizza_Outlet__r.Id = :outletId 
                AND Pizza_Outlet__r.In_Operation__c = true 
                AND Status__c = 'Available'];
    }

    
    
    //fetching accounts info
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }
    
    //doing by flow
    //method for creating cart for admin and community login user(disabled) (turn on afterwards)
    // @AuraEnabled(cacheable=false)
    // public static string createCartOfCommunityUser(){
    //     string accountId;
    //     string userId;
    //     try {
    //         List<Account> accounts = getAccounts();
    //         if(accounts != null && accounts.size() > 0) {
    //             accountId = accounts[0].Id;
    //             System.debug('Particular Account Id stored: ' + accountId);
    //         }
    //         //->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>activate
    //         //userId = UserInfo.getUserId();
    //         //User user = [SELECT AccountId FROM User WHERE Id = :userId];
    //         //accountId = user.AccountId;
    //         //System.debug('Current User ID: ' + userId);
    //         //System.debug('Account ID: ' + accountId);
    //         Cart__c cart = new Cart__c();
    //         cart.Account__c = accountId; 
    //         insert cart;
    //         return 'Success';
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }
    
    //making a entry in cart line items for that particular cart from which the account is logged in
    // @AuraEnabled(cacheable=false)
    // public static string storePizzaOrder(Integer quantity, String selectedPizza, Integer price) {
        
    //     //fetched and stored quantity and selectedpizza id in variables
    //     Integer orderQuantity = quantity;
    //     String orderPizza = selectedPizza;
    //     Integer orderPrice = price;
    //     System.debug(orderQuantity);
    //     System.debug(orderPizza);
        
    //     //try catch block for taking cart id from cart object and storing in cartid variable 
    //     String cartId;
    //     try {
    //         Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;
    //         List<Cart__c> carts = [SELECT Id FROM Cart__c WHERE Account__c =: accountId];
    //         if(carts != null && carts.size() > 0) {
    //             cartId = carts[0].Id;
    //             System.debug('Particular Cart Id stored: ' + cartId);
    //         }
            
    //         // Create a new Cart_Line_Items__c object
    //         CartLineItem__c newCartItem = new CartLineItem__c();
    //         newCartItem.Pizza__c = orderPizza;
    //         newCartItem.Quantity__c = orderQuantity;
    //         newCartItem.Cart__c = cartId; 
    //         newCartItem.Singleunitprice__c = orderPrice;
    
    //         Database.SaveResult result = Database.insert(newCartItem,false);
    //         if(result.isSuccess()){
    //             system.debug('data inserted successfully');
    //             return 'data inserted succesfully';
    //         }
    //         else{
    //             for(Database.Error err : result.getErrors()){
    //                 System.debug('Error message: '+ err.getMessage());
    //             }
    //             return 'success';
                
    //         }
            
    //     }
    //     catch (Exception e) {
    //         return 'Error : '+e.getMessage();
    //         //throw new AuraHandledException(e.getMessage());
    //     }        
    // }


    @AuraEnabled(cacheable=false)
    public static string storePizzaOrder(Integer quantity, String selectedPizza, Integer price) {
    
    //fetched and stored quantity and selectedpizza id in variables
    Integer orderQuantity = quantity;
    String orderPizza = selectedPizza;
    Integer orderPrice = price;
    System.debug(orderQuantity);
    System.debug(orderPizza);
    
    //try catch block for taking cart id from cart object and storing in cartid variable 
    String cartId;
    try {
        Id accountId = [SELECT AccountId FROM User WHERE Id = :UserInfo.getUserId()].AccountId;
        List<Cart__c> carts = [SELECT Id FROM Cart__c WHERE Account__c =: accountId];
        if(carts != null && carts.size() > 0) {
            cartId = carts[0].Id;
            System.debug('Particular Cart Id stored: ' + cartId);
        }
        
        // Check if an item with the same pizza id already exists in the cart
        List<CartLineItem__c> existingItems = [SELECT Id, Quantity__c FROM CartLineItem__c WHERE Cart__c = :cartId AND Pizza__c = :orderPizza];
        
        if (existingItems != null && existingItems.size() > 0) {
            // An item with the same pizza id already exists in the cart, so update its quantity
            CartLineItem__c existingItem = existingItems[0];
            existingItem.Quantity__c += orderQuantity;
            
            Database.SaveResult result = Database.update(existingItem, false);
            if(result.isSuccess()){
                system.debug('data updated successfully');
                return 'data updated succesfully';
            }
            else{
                for(Database.Error err : result.getErrors()){
                    System.debug('Error message: '+ err.getMessage());
                }
                return 'success';
            }
        } else {
            // Create a new Cart_Line_Items__c object
            CartLineItem__c newCartItem = new CartLineItem__c();
            newCartItem.Pizza__c = orderPizza;
            newCartItem.Quantity__c = orderQuantity;
            newCartItem.Cart__c = cartId; 
            newCartItem.Singleunitprice__c = orderPrice;

            Database.SaveResult result = Database.insert(newCartItem,false);
            if(result.isSuccess()){
                system.debug('data inserted successfully');
                return 'data inserted succesfully';
            }
            else{
                for(Database.Error err : result.getErrors()){
                    System.debug('Error message: '+ err.getMessage());
                }
                return 'success';
            }
        }
    }
    catch (Exception e) {
        return 'Error : '+e.getMessage();
        //throw new AuraHandledException(e.getMessage());
    }        
}


    
}