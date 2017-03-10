(function(){
  "use strict";

  angular
  .module("ShoppingListCheckOff",[])
  .controller("toBuyController", toBuyController)
  .controller("alreadyBoughtController", alreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  toBuyController.$inject = ['ShoppingListCheckOffService'];
  function toBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.title = "To Buy:";
    toBuy.ShoppingList = ShoppingListCheckOffService.getShoppingList();
    toBuy.boughtList = ShoppingListCheckOffService.getBoughtList();
    toBuy.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    }
    toBuy.isBought = function () {
      if(toBuy.ShoppingList.length == 0 && toBuy.boughtList.length>0){
        return true
      }
      else {
        return false
      }
    }
  }

  alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function alreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.title = "Already Bought:";
    bought.boughtList = ShoppingListCheckOffService.getBoughtList();
    bought.ShoppingList = ShoppingListCheckOffService.getShoppingList();
    bought.isBought = function () {
      if(bought.ShoppingList.length > 0 && bought.boughtList.length==0){
        return true
      }
      else {
        return false
      }
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var shoppingList = [
      { name: "cookies", quantity: 10},
      { name: "chocolate", quantity: 15},
      { name: "Ice Cream", quantity: 5},
      { name: "limon", quantity: 20},
      { name: "lollipop", quantity: 25},
      { name: "cake", quantity: 5}
    ];
    var boughtList = [];

    service.getShoppingList = function () {
       return shoppingList;
     };

    service.getBoughtList = function () {
      return boughtList;
    };

    service.buyItem = function (index) {
      var removeItem = shoppingList.splice(index,1);
      var boughtItem  = {
        name: removeItem[0].name,
        quantity: removeItem[0].quantity
      }
      boughtList.push(boughtItem);
    };

  }

})();
