
//Liste totale des cartes

const cart = []
const productPriceByName = {
  "Kanap Sinopé"  : 1849,
  "Kanap Cyllène" : 4449,
  "Kanap Calycé"  : 3199,
  "Kanap Autonoé" : 1499,
  "Kanap Eurydomé": 2249,
  "Kanap Hélicé"  : 999,
  "Kanap Thyoné"  : 1999,
  "Kanap orthosie": 3999,
}


FindItemsCache()

// forEach (itérer sur les propriétés d’un tableau)
cart.forEach((item) => displayItem(item))


//Récupérer les items de caches
function FindItemsCache() {
//On cherche dans les éléments qui existe dans le localstorage dans le key mon panier
  const items =JSON.parse (localStorage.getItem("mon_panier"));
  if (!items || !Array.isArray(items)){

    return;
  }
  for (let i = 0; i < items.length; i++) {
    const itemObject = items [i]; 
    const item = {...itemObject, "price": productPriceByName[itemObject.name]}
 
    //chaque fois on trouve une carte on push cette objet

    cart.push(item)
  }
}

//Evenlistener pour un événément de clique sur le button confirmer
const confirmButton = document.querySelector("#order")
confirmButton.addEventListener("click", (e) => submitFormulaire(e))

//CREATION DE LA FICHE PRODUIT DANS LE PANIER
function displayItem(item) {
  const article = addArticle(item)

  const imageDiv = addImage(item)
  article.appendChild(imageDiv)
  makecartContent(item)

  const cardContent = makecartContent(item)
  article.appendChild(cardContent)
  displayArticle(article)
  displayTotalPrice(item)
  displayTotalQuantity(item)
}

//Création d'une balise article
function addArticle(item) {
  const article = document.createElement("article")
  //Pour ajouter la classe cart__item
  article.classList.add("cart__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}

// Ajouter article dans la section cart__items
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}

//Création de l'image dans la page cart.html
function addImage(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")
  console.log(div)
  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}

//création de la partie item content
function makecartContent(item) {
  const cardContent = document.createElement("div")
  cardContent.classList.add("cart__item__content")
  const description = makeDescription(item)
  const settings = makeSettings(item)
  //const addQuantity = addQuantityToSettings(settings, item)
  cardContent.appendChild(description)
  cardContent.appendChild(settings)
  //cardContent.appendChild(addQuantity)
  return cardContent
}

// Fonction d'ajout la partie description 
function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")
  const h2 = document.createElement("h2")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color
  const p2 = document.createElement("p")
  //textContent  Renvoie le texte de l'élément 
  p2.textContent = item.price + "€"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)

  return description
}

function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")
  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}

//fonction pour supprimer l'article dans le localstorage(From cache)
function deleteItem(item) {

  //cart.find trouve kanap qui y a même id  et même color
  const itemDelete = cart.findIndex(
    (kanap) => kanap.id === item.id && kanap.color === item.color)
  cart.splice(itemDelete, 1)
  console.log(itemDelete)
  displayTotalPrice()
  displayTotalQuantity()

  deletedataFromlocalstorage(item)
  deleteArticleFromPage(item)
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.setAttribute("value", "" +item.quantity)
  //console.log(typeof (item.quantity))
  input.addEventListener("input", () => updatePriceQuantity(item.id, input.value, item))
  input.setAttribute("value", "" +item.quantity)
  quantity.appendChild(input)
  settings.appendChild(quantity)
}

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))
  const p = document.createElement("p")
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}

//fonction calcul le prix total des articles
function displayTotalPrice(item) {
  let total = 0;
  const totalUnitPrice = document.querySelector("#totalPrice")
  cart.forEach(item => {
    const totalPrice = item.price * item.quantity
    total += totalPrice
  })

  totalUnitPrice.textContent = total
}


//Fonction pour calculer la quantité total des articles
function displayTotalQuantity(item) {
  let total = 0;
  const Quantity = document.querySelector("#totalQuantity")
  cart.forEach(item => {
    const totalQuantity = item.quantity
    total += totalQuantity
  })
  Quantity.textContent = total
}

//fonction de modification panier
function updatePriceQuantity(id, newValue, item) {
  const Itemupdate = cart.find((item) => item.id === id )
  Itemupdate.quantity = Number(newValue)
  item.quantity = Itemupdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  savenewData(item)  
}

//fonction de sauvegarde new data dans localstorage (écraser la nouvelle valeur dans le cache)
function savenewData(data) {
  console.log('save new Data', data) 

 //const savedata = JSON.stringify(item)
 //const key = `${item.id}-${item.color}`
 // localStorage.setItem("mon_panier", savedata)
 // savenewdata c'est une fonction qui a comme paramètre un objet data 
 //data c'est un produit 
 //la façons d'insérer data dans mon panier c'est de chercher ce produit dans mon panier
 // et saisir la nouvelle quantité
  let monpanier = JSON.parse(localStorage.getItem("mon_panier"))
  if(!monpanier || ! Array.isArray(monpanier)){
   monpanier = []
  }
  
  const existantvalue = monpanier.find(item => item.id == data.id && item.color == data.color)
  if (existantvalue){
    existantvalue.quantity = Number(data.quantity)
  
  localStorage.setItem("mon_panier", JSON.stringify (monpanier))
}
}

//Fonction de suppression item article kanap dans le cache localstorage
function deletedataFromlocalstorage(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}

//Fonction de suppression l'article de la page
function deleteArticleFromPage(item) {
  const articleDelete = document.querySelector(
    `article[data-id = "${item.id}"][data-color="${item.color}"]`
  )
  articleDelete.remove()
}



//formulaire 
//Envoyer les informations remplis au formulaire au back-end
//fonction envoie button confirmer
function submitFormulaire(e) {
  //de pas raffraichir la page
  e.preventDefault()
  //si le formulaire est vide, afficher ce message d'erreur
  if (cart.length === 0) {
    alert("Veuillez sélectionner votre article pour acheter")
    return
  }

  if (InvalidateForm()) return

 // if (InvalidateEmail()) return
  //if(InvalidateName()) return

  const body = addrequestBody()
  fetch("http://localhost:3000/api/products/order", {
      //poster des données
      method: "POST",
      //rendre le body en string avec stringify
      body: JSON.stringify(body),
      headers: {
        "content-Type": "application/json"
      }
    })

    .then((res) => res.json())
    .then((data) => {  
      const orderId = data.orderId
      console.log(orderId)
      alert("Votre commande a bien été effectuée !")

      window.location.href = "./confirmation.html?orderId=" + orderId;
      // window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
      return 
    })

}

function addrequestBody() {
  const form = document.querySelector(".cart__order__form")
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const address = form.elements.address.value
  const email = form.elements.email.value
  const city = form.elements.city.value
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: getIdCache()
  }

  return body

}

//Récuperation  id produit
//Objectif de cette fonction c'est récupérer tous les id qui existe dans mon panier dans localstorage
function getIdCache() {
  const ids = []
  const items =JSON.parse (localStorage.getItem("mon_panier"));
  if (!items || !Array.isArray(items)){

    return;
  }
  for (let i = 0; i < items.length; i++) {
    const itemObject = items [i]; 
    
  //chaque fois on trouve une carte on push cette objet
   ids.push(itemObject.id)
  }

 /*for (let i = 0; i < numberProducts; i++) {
    const key = localStorage.key(i)
    console.log(key)
    const id = key.split("-")[0]
    ids.push(id)
  }*/
  return ids
}

//Fonction si le formulaire est vide de pas redirigé vers la page confirmation
function InvalidateForm() {
  const form = document.querySelector(".cart__order__form")
  const input = form.querySelectorAll("input")
  input.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez remplir tous les champs")
      return true
    }
    return false
  })

}


const orderBtn = document.getElementById('order');
//console.log(orderBtn)

const validationForm = {
  firstName: {
    element: document.getElementById('firstName'),
    regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
    errorMsg: 'Prénom invalide'
  },
  lastName: {
    element: document.getElementById('lastName'),
    regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
    errorMsg: 'Nom invalide'
  },
  address: {
    element: document.getElementById('address'),
    regex: /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/,
    errorMsg: 'Adresse invalide'
  },
  city: {
    element: document.getElementById('city'),
    regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
    errorMsg: 'Ville invalide'
  },
  email: {
    element: document.getElementById('email'),
    regex: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
    errorMsg: 'Email invalide'
  }
};

const firstNameInput = document.getElementById('firstName');
firstNameInput.addEventListener('change', () => checkInput(validationForm.firstName));

const lastNameInput = document.getElementById('lastName');
lastNameInput.addEventListener('change', () => checkInput(validationForm.lastName));

const addressInput = document.getElementById('address');
addressInput.addEventListener('change', () => checkInput(validationForm.address));

const cityInput = document.getElementById('city');
cityInput.addEventListener('change', () => checkInput(validationForm.city));



function checkInput(input) {
  const inputElement = input.element;
  const inputRegex = input.regex;
  const errorMsg = input.errorMsg;
  const errorDiv = input.element.nextElementSibling;
  const isRegexValid = inputRegex.test(inputElement.value);

  if (isRegexValid) {
    errorDiv.innerText = '';
  } else {
    errorDiv.innerText = errorMsg;
  }
  return isRegexValid;
}