
document.getElementById("sign-in-btn").addEventListener("click",function(){
    // get username
    const usernameInput = document.getElementById("username-input");
    const username = usernameInput.value;
    // validation
    if(username == ""){
        alert("Please show your user name!!");
        return;
    }

    // get password 
    const passwordInput = document.getElementById("password-input");
    const password = passwordInput.value;
    // validation
    if(password == ""){
        alert("Please show your password");
        return;
    }

    // login condition
    if(username == "admin" && password == "admin123"){
        window.location.assign("mainPage.html");
    }else{
        alert("Wrong username or password !! Try again");
    }
    usernameInput.value = "";
    passwordInput.value = "";
    
    
})