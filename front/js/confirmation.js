
const orderId = getorder()
displayOrderId(orderId)
RemoveAll()


//Récupération du Numéro de commande
function getorder(){
    
const paramsString = window.location.search
const urlParams = new URLSearchParams(paramsString)
return urlParams.get("orderId")


}

//Affichage du Numéro de commande
function displayOrderId(orderId){
const orderIdElement = document.getElementById("orderId")
orderIdElement.textContent = orderId
console.log(orderId)
}


//Supprimer tous de mon localstorage apès passé la commande
function RemoveAll(){
const cache = window.localStorage
cache.clear()
}