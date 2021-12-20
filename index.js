const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const deletBtn = document.getElementById("delete-btn")
const localStorageEntries = JSON.parse( localStorage.getItem("myEntries") )
const tabBtn = document.getElementById("save-tab")

let itemSpace = document.getElementById("item-space")
let myItems = []

tabBtn.addEventListener("click", () => {
    /* Chrome */
    chrome.tabs.query( {active: true, currentWindow: true}, (tabs)=>{
        console.log(tabs)
        myItems.push(tabs[0].url)
        localStorage.setItem("myEntries", JSON.stringify(myItems))
        render(myItems)
    })
    /* Firefox */

    
})

inputBtn.addEventListener("click", () => {
    myItems.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myEntries", JSON.stringify(myItems) )
    render(myItems)
})

deletBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    itemSpace.innerHTML = ""
    myItems = []
})

function render(myArray) {
    let listItems = ""
    for (let i = 0 ; i < myArray.length ; i++) {
        listItems += 
        `<li class="item">
            <a href="${myArray[i]}" target="_blank" rel="noopener">
                ${myArray[i]}
            </a>
        </li>`
    }
    itemSpace.innerHTML = listItems
}

// Init state
if(localStorageEntries) {
    myItems = localStorageEntries
    render(myItems)
}
