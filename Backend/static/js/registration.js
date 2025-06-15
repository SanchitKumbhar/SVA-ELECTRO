document.querySelectorAll(".role-option").forEach((elem)=>{
    elem.addEventListener("click",check=>{
        console.log(elem.innerHTML);
        
    if (elem.innerHTML == "Client") {
        document.querySelector("#register-form").setAttribute("action","/register/user/1")         
    }       
    else if (elem.innerHTML == "government") {
        document.querySelector("#register-form").setAttribute("action","/register/user/3")        

    } 
    else if (elem.innerHTML == "Business") {
        document.querySelector("#register-form").setAttribute("action","/register/user/2")         
        
    } 
    })
})

