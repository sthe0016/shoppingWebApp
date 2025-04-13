BASE_URL = "https://shopping-web-server.vercel.app/api/v1/items"


function showLoader(){
    let loadingElement = document.querySelector('.loader')
    loadingElement.classList.remove('loader-hidden')  // remove the loader-hidden class so only the loader class is visible
}

function hideLoader(){
    let loadingElement = document.querySelector('.loader')
    loadingElement.classList.add('loader-hidden')  // adds the loader-hidden class so the visibility is set to hidden
}

async function showItem() {
    try{
        itemId = localStorage.getItem("itemID")
        userName = document.getElementById("userName")
        itemName = document.getElementById("itemName")
        itemDescription = document.getElementById("itemDescription")
        showLoader()
        const {data: {item}} = await axios.get(`${BASE_URL}/${itemId}`)
        hideLoader()
        userName.value = item.user
        itemName.value = item.name
        if (item.description === undefined){
            itemDescription.value = ""
        }
        else{
            itemDescription.value =  item.description
        }
        
    }
    catch (error) {
        console.log(error)
    }
}

async function editItem(){
    try{
        let itemId = localStorage.getItem("itemID")
        let userNameValue = document.getElementById("userName").value
        let itemNameValue = document.getElementById("itemName").value
        let itemDescriptionValue = document.getElementById("itemDescription").value
        let errorMsg = document.getElementById("ItemNameMsg")
        if (userNameValue === ""){
            userNameValue = localStorage.getItem("userName")
        }
        if (itemNameValue === ""){
            errorMsg.style.display = "block";    // This shows the error message   
        }
        else{
            errorMsg.style.display = "none";    // This hides the error message
            if (itemDescriptionValue === ""){
                await axios.patch(`${BASE_URL}/${itemId}`,
                    {
                        "name": itemNameValue,
                        "user": userNameValue
                    }
                )
            }
            else{
                await axios.patch(`${BASE_URL}/${itemId}`,
                    {
                        "name": itemNameValue,
                        "description": itemDescriptionValue,
                        "user": userNameValue
                    }
                )
            }
        }
        
        window.location = "main.html"
    }
    catch (error) {
        console.log(error)
    }

}

window.onload = function () 
{
    showItem()

}