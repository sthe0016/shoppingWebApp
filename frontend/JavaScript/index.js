function checkUser()
{
    let userName = document.getElementById("userName")
    let userNameValue = userName.value
    if (userNameValue.length == 0){
        return alert("Please enter a name")
    }
    else{
        window.localStorage.setItem("userName", userNameValue)
        window.location = "./html/main.html"
    }
}