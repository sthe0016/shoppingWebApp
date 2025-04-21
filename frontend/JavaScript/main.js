BASE_URL = "https://shopping-web-server.vercel.app/api/v1/items"


function showLoader(){
    let loadingElement = document.querySelector('.loader')
    loadingElement.classList.remove('loader-hidden')  // remove the loader-hidden class so only the loader class is visible
}

function hideLoader(){
    let loadingElement = document.querySelector('.loader')
    loadingElement.classList.add('loader-hidden')  // adds the loader-hidden class so the visibility is set to hidden
}

function showAddButtonLoader(){
    const addBtn = document.getElementById("addItemBtn");
    const spinner = addBtn.querySelector(".tiny-spinner");
    const btnText = addBtn.querySelector(".btn-text");
    addBtn.disabled = true
    spinner.classList.remove('tiny-spinner-hidden')
    btnText.textContent = "Adding..."

}

function hideAddButtonLoader(){
    const addBtn = document.getElementById("addItemBtn");
    const spinner = addBtn.querySelector(".tiny-spinner");
    const btnText = addBtn.querySelector(".btn-text");
    addBtn.disabled = false 
    spinner.classList.add('tiny-spinner-hidden')
    btnText.textContent = "Add Item"
    
}

function showDeleteButtonLoader(deleteBtn){  // We have to pass deleteBtn as an argument since there are multiple delete buttons. We can't refer by a common id. if we do, it will apply the animation to the first delete button the id returns
    const spinner = deleteBtn.querySelector(".tiny-spinner");
    const btnText = deleteBtn.querySelector(".btn-text");
    deleteBtn.disabled = true
    spinner.classList.remove('tiny-spinner-hidden')
    btnText.textContent = ""
}
function hideDeleteButtonLoader(deleteBtn){  // We have to pass deleteBtn as an argument since there are multiple delete buttons. We can't refer by a common id. if we do, it will apply the animation to the first delete button the id returns
    const spinner = deleteBtn.querySelector(".tiny-spinner");
    const btnText = deleteBtn.querySelector(".btn-text");
    deleteBtn.disabled = false 
    spinner.classList.add('tiny-spinner-hidden')
    btnText.textContent = "delete"
}

const addItem = async () => { // Declaring it as a async function means we are running it in a different thread (multi-tasking)
    try {
        //Note: await keyword is used to tell the the function to wait till this line is completed to run the next line. This is necessary since it is an asynchronous line. 
        let itemNameValue = document.getElementById("itemName").value
        let itemDescriptionValue = document.getElementById("itemDescription").value
        let errorMsg = document.getElementById("ItemNameMsg")
        user = localStorage.getItem("userName")
        if (itemNameValue === ""){
            errorMsg.style.display = "block";    // This shows the error message   
            return
        }
        else{
            if (itemDescriptionValue === ""){
                showAddButtonLoader()
                await axios.post(`${BASE_URL}`, 
                    {
                        "name": itemNameValue,
                        "user": user                
                    }
                )
                hideAddButtonLoader()

            }
            else{
                showAddButtonLoader()
                await axios.post(`${BASE_URL}`, 
                    {
                        "name": itemNameValue,
                        "description": itemDescriptionValue,
                        "user": user                
                    }
                )
                hideAddButtonLoader()
            }
            location.reload();
        }
    }
    catch (error){
        console.log(error)
    }
}

async function showItems(){  // Declaring it as a async function means we are running it in a different thread (multi-tasking)
    //Note: await keyword is used to tell the the function to wait till this line is completed to run the next line. This is necessary since it is an asynchronous line. 
    let displayItems = document.getElementById("itemHeading")
    let itemsExist = false

    try {
        showLoader()
        const {data: {allItems}} = await axios.get(`${BASE_URL}`)
        hideLoader()
        if (allItems.length > 0){
            itemsExist = true 
        } else {
            itemsExist = false 
        }
        allItems.forEach((item) => {
            const {_id, name} = item
            const newDiv = document.createElement('div');
            newDiv.innerHTML = // includes a view button and also a delete button with the loading animation functionality
            `
            <div class="main-item-style">

            <label class = "item-label-style">
            ${name}
            <input type = "checkbox" name = "completed" value = ${_id} data-name="${name}"/>  </input>
            </label>
    
            <button class = "view-button-style" data-id = ${_id}> view </button>   

            <button class = "delete-button-style"  data-id = ${_id}>  
            <span class="spinner tiny-spinner tiny-spinner-hidden"></span> 
            <span class="btn-text">delete</span>
            <!-- Initially we have both the tiny-spinner class and the tiny-spinner-hidden class. 
            As long as the tiny-spinner-hidden class is in the div tag, the loading animation will be hidden
            We remove this tiny-spinner-hidden class in the Javascript file when we want the animation to come on -->
            </button>

            </div>
        `
        displayItems.appendChild(newDiv)
        }
        )
        if (itemsExist){  // This section of html displays the option to type the name of the User buying the items and the amount of the total bill.
            const twoTextField = document.createElement('div')
            twoTextField.innerHTML = `
            <div class = "input-styles">
                <div class = "label-text-input-styles">
                    <label class = "label-styles" for = "itemName" > User:  </label >  
                    <div class = "text-input-error-div-style">
                        <input  class = "input-text-style" type="text" id="billUser">
                        <span id="billUserMsg"; class = "error-msg-style">Username is required to create bill</span>
                    </div>
                </div>

                <div class = "label-text-input-styles">
                    <label class = "label-styles" for = "itemDescription" > Bill Price: </label >
                    <div class = "text-input-error-div-style"> 
                        <input class = "input-text-style" type="text" id="billPrice">
                        <span id="billPriceMsg" class = "error-msg-style">Please provide bill price in digits</span>
                    </div> 
                </div>
            </div>
            `
            displayItems.appendChild(twoTextField)    
            const billButton = document.createElement('div')
                billButton.innerHTML = `<button type = "button" class = "create-bill-button-style"
                        onclick="return createBill()">
                        <b> Create bill </b>
                    </button>`
            displayItems.appendChild(billButton)
        }
    
    }
    catch (error) {
        console.log(error)

    }

}

async function deleteItem(itemID){  // Declaring it as a async function means we are running it in a different thread (multi-tasking)
    //Note: await keyword is used to tell the the function to wait till this line is completed to run the next line. This is necessary since it is an asynchronous line. 
    try{
        await axios.delete(`${BASE_URL}/${itemID}`)
    }
    catch (error){
        console.log(error)
    }
}

// all the view and delete buttons are added as children to the div section with id itemHeading. Thus, if we add an event listener to this parent element. It will apply to the child elements too 
document.getElementById("itemHeading").addEventListener('click', async (e) => { 
    // "e" is the object that contains information about the event that just happened. 
    console.log("something was clicked:", e.target); //  Test if anything is being caught
    if (e.target.classList.contains('view-button-style')){ // functionality for the edit button
        id = e.target.dataset.id  // stored in the data element of the button
        console.log(`view button pressed and data id is ${e.target.dataset.id}`)
        window.localStorage.setItem("itemID", id)
        window.location = "view.html"      
    }
    
    else if (e.target.closest('.delete-button-style')){
        // Note: we use closest instead of classList.contains, because the classList.contains will return false. 
        // This is because, the delete is actually wrapped in a span with class "btn-text". We use the .closest functionality 
        // to find the parent class. 
        // functionality for the delete button
        const deleteBtn = e.target.closest('.delete-button-style');
        id = deleteBtn.dataset.id  // stored in the data element of the button
        console.log(`delete button pressed and data id is ${e.target.dataset.id}`)
        try{
            showDeleteButtonLoader(deleteBtn)
            await deleteItem(id);  // await keyword indicates to wait till this has finished executing to execute next line.
            hideDeleteButtonLoader(deleteBtn)
            location.reload();  // only reload the page once the item is deleted. 
        }
        catch(e){
            console.log(e)
        }
        
    }
}
)

async function createBill() { // Declaring it as a async function means we are running it in a different thread (multi-tasking)
    //Note: await keyword is used to tell the the function to wait till this line is completed to run the next line. This is necessary since it is an asynchronous line. 
    try
    {
        billUserValue = document.getElementById("billUser").value
        billPriceValue = document.getElementById("billPrice").value
        errorMsgUser = document.getElementById("billUserMsg")
        errorMsgBill = document.getElementById("billPriceMsg")
        let checkboxes = document.getElementsByName("completed")
        let itemID = ""
        let completedItemsArr = []
        let anyChecked = false
        completedItemsIDs = []
        for (let checkbox of checkboxes){
            if (checkbox.checked){
                anyChecked = true
                itemID = checkbox.value                 
                const name = checkbox.dataset.name
                completedItemsArr.push({"name": name}) 
                completedItemsIDs.push(itemID)  // remember the item id's that have been selected 
            }
        }
        if (anyChecked){
            if (billUserValue == ""){
                errorMsgUser.style.display = "block";    // This shows the error message   
                return
            }
            else{
                errorMsgUser.style.display = "none";    // This hides the error message 
            }
            if (billPriceValue != ""){
                if(isNaN(parseFloat(billPriceValue)) || !isFinite(billPriceValue)){
                    errorMsgBill.style.display = "block";  // This shows the error message 
                    return
                }
            }
            else{
                errorMsgBill.style.display = "none"   // This hides the error message 
                billPriceValue = "Not specified"   // indicates the price of the bill was not specified 
            }
            showLoader()
            completedItemsIDs.forEach((id) => deleteItem(id))   // Delete all the items that have been selected
            const date = new Date();
            const dayStr = date.getDate()
            const monthStr = date.getMonth() + 1  // month is 0 based indexing so we do + 1 
            const yearStr = date.getFullYear()
            dateStr = `${dayStr}/${monthStr}/${yearStr}`
            await axios.post(`${BASE_URL}/completed`,
                {
                    "items": completedItemsArr,
                    "date": dateStr, 
                    "user": billUserValue,
                    "price": billPriceValue
                }
            )
            hideLoader()
            location.reload()
            return

        }  
        else{
            alert("No items were selected to create bill")
            return
        }
             

    }
    catch (error){
        console.log(error)
    }    
}

window.onload = function()
{
    showItems()
}
  
    

