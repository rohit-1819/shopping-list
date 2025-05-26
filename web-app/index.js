import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL : "https://shopping-list-7d1cb-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addToCart = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addToCart.addEventListener("click" , function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
    
    
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let vari = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i<vari.length; i++) {
            let currentItem = vari[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            renderShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
    
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function renderShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${itemVal}</li>`
    let itemID = item[0]
    let itemVal = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemVal

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)

    })

    shoppingListEl.append(newEl)
}