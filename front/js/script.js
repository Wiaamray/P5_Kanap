fetch("http://localhost:3000/api/products") 
.then((res) => res.json())
//Puis passer les données à addproducts
.then((response) => addproducts(response))
 


function addproducts(array){  //addproducts va récuperer les données

array.forEach((canape) => {

const { _id, imageUrl, altTxt, name, description} = canape
const link = addlink(_id)  // il va créer un id, article, image, h3, p
const article = document.createElement("article")
const image = addImage(imageUrl , altTxt)
const h3 = addH3(name)
const p = addParagraphe(description)

appendElementToArticle(article, image, h3, p)
appendChildren(link, article)
})
}

function appendElementToArticle(article, image, h3, p){

    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

function addlink(_id){  // créer le lien
    const link = document.createElement("a")
    link.href  = "./product.html?id=" + _id
    return link //sort link de la fonction
}

function appendChildren(link, article){ // Ici la fonction va chercher items et ajouter link quand quu'on lui a données
    const items = document.querySelector("#items")

    if (items != null){
        items.appendChild(link)
        link.appendChild(article) //le noeud nouvellement créé à son nœud “parent” via  appendChild.

    }
}


function addImage(imageUrl , altTxt){
    const image = document.createElement("img")//z  createElement  pour créer un noeud 
    image.src = imageUrl
    image.alt = altTxt
    return image 
}

function addH3(name){
 const h3 = document.createElement("h3")
h3.textContent = name
h3.classList.add ("productName")
return h3
}

function addParagraphe(description){
    const p = document.createElement("p")
    p.textContent = description //textContent  pour lui ajouter un contenu textuel 
    p.classList.add("productDescription")// classList  pour ajouter une classe
    return p
}


