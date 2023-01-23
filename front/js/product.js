const paramsString = window.location.search;
const urlParams = new URLSearchParams(paramsString)
const productId = urlParams.get("id")
if(productId != null){
    let itemPrice = 0
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

addImage(imageUrl, altTxt)
addTitle(name)
addPrice(itemPrice)
addDescription(description)
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

//fonction pour récupérer la description

function addDescription(description){
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

//Ajouter l'événement de click

const button = document.querySelector("#addToCart")
if(button != null){

    button.addEventListener("click", (e) => {
const color = document.querySelector("#colors").value
const quantity = document.querySelector("#quantity").value

if(color == null ||  color === "" || quantity == null || quantity == 0 || quantity<0 ) {

    alert ("please select a valid color and quantity")
    }

//fabriquer un objet (storer dans le localstorage)
    const data = {
        id : productId,
        color: color,
        quantity: Number(quantity),
    }
    
//save data to localstorage(stringify pour transformer en string) 
localStorage.setItem(productId, JSON.stringify(data))



//redirection vers url page cart.html (url relative)

//Condition avant la redirection vers l'url

if(color == null ||  color === "" || quantity == null || quantity == 0 || quantity<0 ){
return false}

else{
    window.location.href = "cart.html"
}


   
    })
}