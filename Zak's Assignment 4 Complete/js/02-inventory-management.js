/*eslint-env browser*/

function view(inventory) {
    "use strict";
    var i, stored;
    //LOOP THROUGH INVENTORY ARRAY
    for (i = 0; i < inventory.length; i += 1) {
        //RETRIEVE THE STORED QUANTITIES FROM STORAGE
        stored = localStorage.getItem(inventory[i].sku);
        //CHECK TO MAKE SURE WE GOT SOMETHING BACK FROM STORAGE
        if (stored !== null) {
            inventory[i].quantity = stored;
        }
        //DISPLAY THE INVENTORY TO THE USER
        window.console.log(
            inventory[i].sku + "\t" +
            inventory[i].product + "\t $" +
            inventory[i].cost + "\t (" +
            inventory[i].quantity + ")");
    }
    window.console.log("");
}

function update(inventory) {
    "use strict";
    var i, newQuantity, skuToUpdate;
    //ASK THE USER WHAT SKU THEY WANT TO UPDATE
    skuToUpdate = parseInt(window.prompt("Enter sku to update"), 10);
    //MAKE SURE THE USER ENTERS A SOMEWHAT VALID SKU
    if (skuToUpdate === null || isNaN(skuToUpdate)) {
        window.alert("The entered sku is not valid");
    } else {
        //IF IT PASSES CHECK, LOOP THROUGH INVENTORY
        for (i = 0; i < inventory.length; i += 1) {
            //CHECK FOR A MATCHING SKU
            if (inventory[i].sku === skuToUpdate) {
                //ASK USER WHAT THEY WANT TO UPDATE QUANTITY TO
                newQuantity = parseInt(window.prompt("Enter quantity"), 10);
                //MAKE SURE THE USER ENTERS A VALID NUMERIC QUANTITY
                if (newQuantity === null || isNaN(newQuantity)) {
                    window.alert("The quantity you entered is not valid");
                } else {
                    //UPDATE WEB STORAGE WITH NEW QUANTITY
                    localStorage.setItem(inventory[i].sku, newQuantity);
                    //UPDATE INVENTORY
                    inventory[i].quantity = newQuantity;
                    //DISPLAY THE RESULT TO THE USER
                    window.console.log("The quantity of \"" + inventory[i].product + "\" was updated to " + newQuantity + " unit(s)");
                    //ADD A SPACE
                    window.console.log("");
                    //DISPLAY THE UPDATED INVENTORY
                    view(inventory);
                    return true;
                }
            }
        }
    }
}

function displayMenu() {
    "use strict";
    window.console.log("Welcome to the Invectory Management Application");
    window.console.log("");
    window.console.log("COMMAND MENU");
    window.console.log("view - View all products");
    window.console.log("update - Update stock on hand");
    window.console.log("exit - Exit the program");
    window.console.log("");
}

function getInventory() {
    "use strict";
    //BUILD ARRAY OF PRODUCTS WE SELL
    var tshirt = [], jeans = [], jacket = [], hat = [], socks = [], inventory;
    
    tshirt.sku = 101;
    tshirt.product = "TShirt";
    tshirt.quantity = 15;
    tshirt.cost = 24.99;
    
    jeans.sku = 102;
    jeans.product = "Jeans";
    jeans.quantity = 7;
    jeans.cost = 39.99;
    
    jacket.sku = 103;
    jacket.product = "Jacket";
    jacket.quantity = 8;
    jacket.cost = 34.99;
    
    hat.sku = 104;
    hat.product = "Hats";
    hat.quantity = 2;
    hat.cost = 19.99;
    
    socks.sku = 105;
    socks.product = "Socks";
    socks.quantity = 20;
    socks.cost = 9.99;
    
    //POPULATE MULTI-DIMENSIONAL ARRAY TO REPRESENT INVENTORY
    inventory = [tshirt, jeans, jacket, hat, socks];
    
    //RETURN ARRAY OF INVENTORY
    return inventory;
}

window.addEventListener("load", function () {
    "use strict";
    var inventory, command;
    //DISPLAY COMMAND MENU
    displayMenu();
    //INITIALIZE OUR PRODUCTS
    inventory = getInventory();
    //RESPOND TO USER COMMANDS
    while (true) {
        command = window.prompt("Enter command");
        if (command !== null) {
            if (command === "view") {
                view(inventory);
            } else if (command === "update") {
                update(inventory);
            } else if (command === "exit") {
                break;
            } else {
                window.alert("Please enter a valid command!");
            }
        } else {
            break;
        }
    }
    window.console.log("Program terminated.");
});






