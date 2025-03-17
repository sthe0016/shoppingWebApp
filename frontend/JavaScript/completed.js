async function showCompleted(){
    completedBillsDisplay = document.getElementById("completedBillsDisplay")
    try{
        let divStr = ''
        let date = ''
        let price = ''
        let items = []
        let id = ''
        let user = ''
        const {data : {allcompleted}} = await axios.get("http://localhost:3000/api/v1/items/completed")
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
            divStr = `<div style = " display: flex;
            margin-top: 10px;">

            <label style="width: 400px; 
            margin-left: auto;
            margin-right: auto;
            height: auto; 
            background-color: azure; 
            border-radius: 15px; 
            padding: 10px; 
            border: 2px solid black; 
            display: flex; 
            align-items: flex-start;
            font-size: large;">

            <div style="display: flex; 
                flex-direction: column; 
                margin-top: 5px;
                width: 100%;">

                <span style="font-weight: bold;">${date}</span>

                <div style = "align-items: center;
                display: flex;
                flex-direction: column;
                justify-content: center;"
                >`
            items.forEach((item) =>{
                divStr =divStr.concat(`<span >${item.name}</span>`)

            })
            divStr = divStr.concat(`</div>
                
                <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 30px;">
                    <span style="font-weight: bold;">Price: ${price}</span>
                    <span style="font-weight: bold;">${user}</span>
                </div>

            </div>
            
            <div style="display: flex; align-items: center; height: 100%;">
            <input style = "margin-left: auto" type = "checkbox" name = "bills" value = ${id} />  </input>
            </div>

            </label>
            </div>
            `)
            newDiv.innerHTML = divStr
            completedBillsDisplay.appendChild(newDiv)
        }
    );
    if(allcompleted.length > 0){
        const billButton = document.createElement('div')
            billButton.innerHTML = `<div style = "margin-top: 30px;
            margin-left: 980px;">
                <button type = "button" style = " background-color: rgb(227, 59, 115);
                    border-radius: 12px;
                    width: 120px;
                    height: 30px; 
                    border: white;
                    font-size: medium;
                    color: white;
                    "
                    onclick="return deleteBill()">
                    <b> Delete bills </b>
                </button>
            </div>`
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
            await axios.delete(`http://localhost:3000/api/v1/items/completed/${setID}`)
            location.reload()
        }
    }
    
}

window.onload = function () {
    showCompleted()

}