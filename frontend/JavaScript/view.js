BASE_URL = "https://shopping-web-server.vercel.app/api/v1/items"

async function showItem() {
    try{
        itemId = localStorage.getItem("itemID")
        userName = document.getElementById("userName")
        itemName = document.getElementById("itemName")
        itemDescription = document.getElementById("itemDescription")
        const {data: {item}} = await axios.get(`${BASE_URL}/${itemId}`)
        userName.value = item.user
        itemName.value = item.name
        itemDescription.value = item.description
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