//JavaScript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//Database addition
const Endorsments = {
    databaseURL: "https://endorsments-8d153-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
//constant declaration
const App =initializeApp(Endorsments)
const Database  =  getDatabase(App) 
const   endorsmentsInDB = ref(Database, "endorsmentList")


const textArea = document.getElementById("text-area")
const btnPublish = document.getElementById("btn-publish")
const allEndorsments = document.getElementById("all-endorsments")

//When publish button is clicked
btnPublish.addEventListener("click", function() {
    let inputValue = textArea.value
    
    push(endorsmentsInDB, inputValue)
    
    clearTextArea()
})
//When new valueic added to the database
onValue(endorsmentsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndrosment()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToAllEndorsments(currentItem)
        }    
    } else {
        allEndorsments.innerHTML = "No items here... yet"
    }
})

// FUNCTIONS

function clearEndrosment(){
    allEndorsments.innerHTML = ""
}
function clearTextArea() {
    textArea.value = ""
}
function appendItemToAllEndorsments(item){
     let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(Database, `endorsmentList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    allEndorsments.append(newEl)
}