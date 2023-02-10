
const paramsString = window.location.search;
const urlParams = new URLSearchParams(paramsString)
const productId = urlParams.get("id")
console.log({productId})
if(productId != null){
    let itemPrice = 0
    let imgUrl, altText, articleName
}


fetch(`http://localhost:3000/api/products/${productId}`)
.then((response) => response.json())
.then((res) => getdata(res))


function getdata(info){
const altTxt = info.altTxt
const colors = info.colors
const description =  info.description
const imageUrl = info.imageUrl
const name = info.name
const _id = info._id
itemPrice = info.price

imgUrl= imageUrl
altText = altTxt
articleName = name


addImage(imageUrl, altTxt)
addTitle(name)
addPrice(itemPrice)
addCartcontent(description)
addColors(colors)
}
//Fonction pour création d'image
function addImage(imageUrl, altTxt){
const image = document.createElement("img")

image.src = imageUrl
image.alt = altTxt
const parent = document.querySelector(".item__img")
if (parent!=null)
parent.appendChild(image)
}

//fonction pour récupérer le title
function addTitle(name){
document.querySelector("#title").textContent = name
}

//fonction pour récupérer le prix
function addPrice(price){
    const span = document.querySelector("#price")
    if (span!= null) span.textContent = price
}

//Fonction pour récupérer la description

function addCartcontent(description){
const p = document.querySelector("#description") 
if (p!=null) p.textContent = description
}


//fonction pour récupérer les options des couleurs
function addColors(colors){
    const colorSelect = document.querySelector("#colors")
    if(colorSelect!=null){
       colors.forEach((color) => {
       const option = document.createElement("option")
       option.value = color
       option.textContent = color
       colorSelect.appendChild(option)
        })
    }
}

//Ajouter l'événement de click sur le bouton ajouter au panier
const button = document.querySelector("#addToCart")
button.addEventListener("click", Validation)

function Validation() {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value

  if (isOrderInvalid(color, quantity)) return

  redirectToCart()
}


function isOrderInvalid(color, quantity) {
if(color == null ||  color === "" ) {



    alert ("please select a valid color ")

    return }

    if(quantity == null || quantity == 0 || quantity<= 0 || estEntier() === false ){

        alert ("please select a valid number")

        return 
    }

   
// verifier que le chiffre entré est un entier
function estEntier() {
    let quantite = Number(document.getElementById('quantity').value)
    if (Number.isInteger(quantite)) {
        return 
      
    }  isItemInCart()
    return false
}


//function saveOrder(color, quantity){
//fabriquer un objet (storer dans le localstorage)
const key = `${productId}-${color}`
//il faut chercher dans le localstorage si la valeur de key déja existante
//si cette valeur existe déjà il faut récupérer cette valeur et augmenter la quantité

let monpanier = JSON.parse(localStorage.getItem("mon_panier"))
//si le localstorage contient le key mon panier et si la valeur de cette dernière est un tableau
  if(!monpanier || ! Array.isArray(monpanier)){
   monpanier = []
  }

const existantvalue = monpanier.find(item => item.id == productId && item.color == color)
if (existantvalue){
  existantvalue.quantity = existantvalue.quantity + Number(quantity)

localStorage.setItem("mon_panier", JSON.stringify (monpanier))

return ;
}

const data = {
        id : productId,
        color: color,
        quantity: Number(quantity),
        imageUrl: imgUrl,
        altTxt : altText,
        name: articleName,
       //price: itemPrice
    }
//La fonction setItem permet d’écrire une valeur dans le localStorage   
//save data to localstorage(stringify pour transformer en string) 
//localStorage.setItem(key, JSON.stringify(data))

 monpanier.push(data)
 localStorage.setItem("mon_panier", JSON.stringify (monpanier) )
//}
}
//redirection vers url page cart.html (url relative)
//Condition avant la redirection vers l'url
function redirectToCart() {
    //fenêtre pop-up
 const popupConfirmation =() =>{
   if(window.confirm(`Votre commande de ${quantity} ${articleName} ${color} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
      
   }
}
   window.location.href = "cart.html"
}






