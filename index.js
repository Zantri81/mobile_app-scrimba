import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"        //importer "fonction" ici quand on doit les utiliser (ref, push etc)

const appSettings = {
    databaseURL: "https://realtime-database-c25fc-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()

})



onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {                // if pour eviter le bug "null" et empeché la suppression de shoppingList
        
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItemValue)
        }
    } else {
        shoppingListEl.iinnerHTML = "No items here... yet"
    }

})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]                // va afficher dans newEl.textContent soit la value soit la keys
    let itemValue = item[1]

    let newEl = document.createElement("li")        //cela va créer <li></li>
    
    newEl.textContent = itemValue           //ceci va ajouter du texte

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shopping-list/${itemID}`)      //ref= référence. Nous avons besoin de l'ID pour cibler le bon élément
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)            //ajoutera la variable a shoppingListEL (ul)
}