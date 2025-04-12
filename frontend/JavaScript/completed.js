BASE_URL = "https://shopping-web-server.vercel.app/api/v1/items"

async function showCompleted(){
    completedBillsDisplay = document.getElementById("completedBillsDisplay")
    try{
        let divStr = ''
        let date = ''
        let price = ''
        let items = []
        let id = ''
        let user = ''
        const {data : {allcompleted}} = await axios.get(`${BASE_URL}/completed`)
        allcompleted.forEach(
            (completedSet) => {
            const newDiv = document.createElement('div');
            date = completedSet.date
            if(isNaN(parseFloat(completedSet.price)) || !isFinite(completedSet.price)){
                price = 'Not Specified'
            }
            else{
                price = `$${completedSet.price}`
            }
            
            items = completedSet.items
            id = completedSet._id
            user = completedSet.user
            divStr = `<div class = "completedItems-bill-style">

            <label class = "label-style">

            <div style="
                width: 100%;">

                <span class="bold-style">${date}</span>

                <div class = "bill-items-style"
                >`
            items.forEach((item) =>{
                divStr =divStr.concat(`<span >${item.name}</span>`)

            })
            divStr = divStr.concat(`</div>
                
                <div class = "price-user-style">
                    <span class="bold-style">Price: ${price}</span>
                    <span class="bold-style">${user}</span>
                </div>

            </div>
            
            
            <input class = "checkbox-style" type = "checkbox" name = "bills" value = ${id} />  </input>

            </label>
            </div>
            `)
            newDiv.innerHTML = divStr
            completedBillsDisplay.appendChild(newDiv)
        }
    );
    if(allcompleted.length > 0){
        const billButton = document.createElement('div')
            billButton.innerHTML = `
                <button type = "button" class = "completed-delete-button-style"
                    onclick="return deleteBill()">
                    <b> Delete bills </b>
                </button>`
        completedBillsDisplay.appendChild(billButton)
    }

    }
    catch(error){
        console.log(error)

    }
}

async function deleteBill(){
    let checkboxes = document.getElementsByName("bills")
    let anyChecked = false
    for (let checkbox of checkboxes){
        if(checkbox.checked){
            anyChecked = true 
            setID = checkbox.value
            await axios.delete(`${BASE_URL}/completed/${setID}`)
            location.reload()
        }
    }
    
}

window.onload = function () {
    showCompleted()

}