BASE_URL = "https://shopping-web-server.vercel.app/api/v1/items"

const addItem = async () => {
    try {
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
                await axios.post(`${BASE_URL}`, 
                    {
                        "name": itemNameValue,
                        "user": user                
                    }
                )

            }
            else{
                await axios.post(`${BASE_URL}`, 
                    {
                        "name": itemNameValue,
                        "description": itemDescriptionValue,
                        "user": user                
                    }
                )
            }
            location.reload();
        }
    }
    catch (error){
        console.log(error)
    }
}

async function showItems(){

    let displayItems = document.getElementById("itemHeading")
    let itemsExist = false

    try {
        const {data: {allItems}} = await axios.get(`${BASE_URL}`)
        if (allItems.length > 0){
            itemsExist = true 
        } else {
            itemsExist = false 
        }
        allItems.forEach((item) => {
            const {_id, name} = item
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `<div style = " display: flex;
            align-items: center;
            margin-top: 10px;">

            <label style="width: 400px; 
            height: 25px; 
            background-color: azure; 
            border-radius: 15px; 
            padding: 10px; 
            border: 2px solid black; 
            display: flex; 
            align-items: center;
            font-size: large;">
            ${name}
            <input style = "margin-left: auto" type = "checkbox" name = "completed" value = ${_id} />  </input>
        </label>
       
        <div style="margin-left: 10px;">
            <button class = "view" style="border-radius: 20px; ;color: white; background-color: rgb(243, 243, 243); color: black;" data-id = ${_id}> view </button>
            <button class = "del" style="border-radius: 20px; color: white; background-color: rgb(199, 62, 62); color: black; margin-left: 10px"  data-id = ${_id}> delete</button>
        </div>
        </div>
        `
        displayItems.appendChild(newDiv)
        }
    )
    if (itemsExist){  // This section of html displays the option to type the name of the User buying the items and the amount of the total bill.
        const twoTextField = document.createElement('div')
        twoTextField.innerHTML = `
                <div style = "font-size: 20px; margin-top: 100px; margin-left: 220px">
                    <div style="display: flex; align-items: center;">
                        <label for = "itemName" style = "width: 150px; text-align: left;"> User   </label >  
                        <div style="display: flex; flex-direction: column; height: 20px"> 
                            <input  type="text" id="billUser">
                            <span id="billUserMsg" style = "color: red; font-size: 14px; display: none; margin-top: 5px">User is required to create bill</span>
                        </div>
                    </div>
                
                </div>

                <div style = "font-size: 20px; margin-top: 50px; margin-left: 220px">
                    <div style="display: flex; align-items: center;">
                        <label for = "itemDescription" style = "width: 150px; text-align: left;"> Bill Price: </label >
                        <div style="display: flex; flex-direction: column; height: 20px"> 
                            <input  type="text" id="billPrice">
                            <span id="billPriceMsg" style = "color: red; font-size: 14px; display: none; margin-top: 5pxpx;">Please provide bill price in digits</span>
                        </div>    
                    </div> 
                </div>`
        displayItems.appendChild(twoTextField)    
        const billButton = document.createElement('div')
            billButton.innerHTML = `<div style = "margin-top: 30px;
            margin-left: 370px;">
                <button type = "button" style = " background-color: rgb(227, 59, 115);
                    border-radius: 12px;
                    width: 120px;
                    height: 30px; 
                    border: white;
                    font-size: medium;
                    color: white;
                    "
                    onclick="return createBill()">
                    <b> Create bill </b>
                </button>
            </div>`
        displayItems.appendChild(billButton)
    }
    
    }
    catch (error) {
        console.log(error)

    }

}

async function deleteItem(itemID){
    try{
        await axios.delete(`${BASE_URL}/${itemID}`)
    }
    catch (error){
        console.log(error)
    }
}

// all the view and delete buttons are added as children to the div section with id itemHeading. Thus, if we add an event listener to this parent element. It will apply to the child elements too 
document.getElementById("itemHeading").addEventListener('click', async (e) => { 
    if (e.target.classList.contains('view')){ // functionality for the edit button
        id = e.target.dataset.id  // stored in the data element of the button
        console.log(`view button pressed and data id is ${e.target.dataset.id}`)
        window.localStorage.setItem("itemID", id)
        window.location = "view.html"      
    }
    else if (e.target.classList.contains('del')){ // functionality for the delete button
        id = e.target.dataset.id  // stored in the data element of the button
        console.log(`delete button pressed and data id is ${e.target.dataset.id}`)
        try{
            await deleteItem(id);  // wait till this has finished executing. 
            location.reload();  // only reload the page once the item is deleted. 
        }
        catch(e){
            console.log(e)
        }
        
    }
}
)

async function createBill() {
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
                const {data: {item: {name}}} = await axios.get(`${BASE_URL}/${itemID}`)
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
  
    

