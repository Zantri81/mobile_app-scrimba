import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"       //importer ref, push quand il y a besoin

const appSettings = {
    databaseURL: "https://realtime-database-c25fc-default-rtdb.europe-west1.firebasedatabase.app/"      //ajouter la database de firebase
}

const app = initializeApp(appSettings)      //connecte le projet avec Firebase
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEL = document.getElementById("input-field")
const addBtnEL = document.getElementById("add-button")

addBtnEL.addEventListener("click", function() {
    let inputValue = inputFieldEL.value
    
    // Challenge: Use the Firebase function 'push' to push inputValue to the database
    inputValue.push(shoppingListInDB, inputValue)
    
    console.log(inputValue)
})