const pages = {};

// pages.base_url = "http://127.0.0.1:5500/frontend/";
function validateEmail(emailId) {
    let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailId.match(mailformat)) {
      return true;
    } else {
      // document.form1.text1.focus();
      return false;
    }
  }
  

pages.page_signin = () => {
  let signin_btn = document.getElementById("signin_btn");
  signin_btn.addEventListener("click", () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if ( username !== "" && password !== "") {
        document.getElementById("error_msg").innerHTML =  "";
        document.getElementById("error_msg").style.display = "None";

        console.log(username);
        console.log(password);
        console.log(signin_btn.value);
        console.log("hi");
    }
    else{
        document.getElementById("error_msg").innerHTML =  "Enter all the required fields";
        document.getElementById("error_msg").style.display = "block";

    };
  });
};

pages.page_signup = () => {
    let signup_btn = document.getElementById("signup_btn");
    signup_btn.addEventListener("click", () => {
  
      let email = document.getElementById("email").value;
      let first_name = document.getElementById("first_name").value;
      let last_name = document.getElementById("last_name").value;
      
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
  
      // check email 
      if (validateEmail(email) && first_name !== "" && last_name !== "" && username !== "" && password !== "") {
        document.getElementById("error_msg").innerHTML =  "";
        document.getElementById("error_msg").style.display = "none";
  
        console.log(first_name);
        console.log(last_name);
        console.log(email);
        console.log(username);
        console.log(password);
        console.log(signup_btn.value);
        console.log("hihello");
      } else {
        document.getElementById("error_msg").innerHTML =  "Enter all the required fields and a valid Email";
        document.getElementById("error_msg").style.display = "block";
      }
    });
  };

  pages.page_listProducts = () => {
    let add_to_favorite_btn = document.getElementById("add_to_favorite");
    let add_to_cart_btn = document.getElementById("add_to_cart");

    add_to_favorite_btn.addEventListener("click", () => {
     console.log("add_to_favorite")
    });

    add_to_cart_btn.addEventListener("click", () => {
        console.log("add_to_cart")
       });
    
    show_cart_btn.addEventListener("click", () => {
        var menu = document.getElementById("cart-menu");
        menu.classList.toggle("visible"); // Toggle the "visible" class
        console.log("show cart")
        });
   
  };

  pages.page_admin_list_products = () => {
    
        console.log("manage products")
      
   
  };

  pages.page_create_product = () => {
    
    console.log("create product")
  

};
pages.page_update_product = () => {
    
    console.log("update product")
  

};
  

  // this will load the scripts of the mentioned page
pages.loadFor = (page) => {
  eval("pages.page_" + page + "();");
};

