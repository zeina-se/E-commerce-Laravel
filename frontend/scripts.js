const pages = {};
const token1 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3JlZ2lzdGVyIiwiaWF0IjoxNjkwNzE4Mzk0LCJleHAiOjE2OTA3MjE5OTQsIm5iZiI6MTY5MDcxODM5NCwianRpIjoidVBma0NqVDZwMExFcjNMcCIsInN1YiI6IjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.A695Ek76GXvMPHOwn0qIYbFJdHdMWZb8Cyqe7v0USbQ"

pages.base_url = "http://127.0.0.1:8000/api/";
pages.product_image_url = "http://localhost/E-commerce-Laravel/backend/storage/app/";

function validateEmail(emailId) {
    let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailId.match(mailformat)) {
      return true;
    } else {
      // document.form1.text1.focus();
      return false;
    }
  }
function display_products_admin(product_image,name,description,category,id_product){
 
  return `<div class="item">
  <div class="product-card">
      <div class="product-image">
        <img src="${product_image}" alt="Product Image">
        <button id="add_to_favorite" class="add-to-favorites-button"> <button id="delete" class="fa-button" onclick="pages.page_delete_product(${id_product})"><i class="fa fa-trash"></i></button></button>
      </div>
      <div class="product-info">
        <h2 class="product-title">${name}</h2>
        <p class="product-description">${description}</p>
        <p class="product-category">${category}</p>
        <div class="product-actions">
          <button id="edit" class="add-to-cart-button" onclick="pages.page_edit_product_form(${id_product})">Edit</button>
          
        </div>
      </div>
    </div>

</div>`;
} 
function display_products_user(product_image,name,description,category,id_product){
  return `<div class="item">
  <div class="product-card">
      <div class="product-image">
        <img src="${product_image}" alt="Product Image">
        <button id="add_to_favorite" class="add-to-favorites-button"> <button id="delete" class="fa-button"><i class="fa fa-trash"></i></button></button>
      </div>
      <div class="product-info">
        <h2 class="product-title">${name}</h2>
        <p class="product-description">${description}</p>
        <p class="product-category">${category}</p>
        <div class="product-actions">
          <button id="add_to_cart" class="add-to-cart-button">Edit</button>
          <input type="hidden" id="product" value="${id_product}">
        </div>
      </div>
    </div>

</div>`;
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
    console.log("manage products");
    const id = 25;
    const headers = new Headers();
    headers.append("Authorization", token1);
  
    fetch(pages.base_url + 'get_products/', {
      method: "GET",
      headers: headers,
    })
      .then(response => response.json())
      .then(data => {
        data.products.forEach(product => {
          console.log(product.category_id);
  
          let product_image = pages.product_image_url + product.image;
          document.getElementById("list_products").innerHTML += display_products_admin(product_image, product.name, product.description, product.category,product.id);
          });
  
      })
      .catch(error => console.log("Error: ", error));
  };

  pages.page_create_product = () => {
    create_btn.addEventListener("click", () => {
      const product_name = document.getElementById("product_name").value;
      const description = document.getElementById("description").value;
      const category = document.getElementById("category").value;
      
      const file_input = document.getElementById('myfile');
      const product_image = file_input.files[0];
  
      const data1 = new FormData();
      data1.append("product_name", product_name);
      data1.append("category_id", category);
      data1.append("description", description);
      data1.append("image", product_image);
  
      const headers = new Headers();
      headers.append("Authorization", token1);
      console.log(pages.base_url + 'add_update_product/add')
      fetch(pages.base_url + 'add_update_product/add', {
        method: "POST",
        headers: headers,
        body: data1,
      }).then(response => response.json())
      .then(data => {
        window.location.href = "read_products.html";
        // if (data.status == 'product created'){
        //   window.location.href = "";
        // }
      })
      .catch((error) => console.log("Error ", error));
    });
  };
pages.page_edit_product_form  = (id1) => {
  window.location.href="update_product.html?id="+id1;
}
pages.page_update_product = () => {
    
    console.log("update product2")
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const id = urlParams.get('id');
    console.log(id);
    const headers = new Headers();
    headers.append("Authorization", token1);
    // onload
    fetch(pages.base_url + 'get_products/'+id, {
      method: "Get",
      headers: headers,
      }).then(response => response.json())
    .then(data => {
      console.log(data.products);
      console.log(data.products['category_id'])
       
      document.getElementById("product_name").value = data.products['name'];
      document.getElementById("description").value = data.products['description'];
      document.getElementById("product_image").src = pages.product_image_url +data.products['image'];

    
    })
    .catch((error) => console.log("Error ", error));

    //onedit
    const update_btn = document.getElementById("update_btn");
    update_btn.addEventListener("click", () => {
      const product_name = document.getElementById("product_name").value;
      const description = document.getElementById("description").value;
      const category = document.getElementById("category").value;
      
      const file_input = document.getElementById('myfile');
      const product_image = file_input.files[0];
  
      const data1 = new FormData();
      data1.append("product_name", product_name);
      data1.append("category_id", category);
      data1.append("description", description);
      data1.append("image", product_image);
  
      const headers = new Headers();
      headers.append("Authorization", token1);
      console.log(pages.base_url + 'add_update_product/'+id)
      fetch(pages.base_url + 'add_update_product/'+id, {
        method: "POST",
        headers: headers,
        body: data1,
      }).then(response => response.json())
      .then(data => {
        //console.log(data.products);
        // if (data.status == 'product created'){
          location.reload();

        // }
      })
      .catch((error) => console.log("Error ", error));
    });
  };

  pages.page_delete_product = (id) => {
    
      const headers = new Headers();
      headers.append("Authorization", token1);
      console.log(pages.base_url + 'delete_product/'+id)
      fetch(pages.base_url + 'delete_product/'+id, {
        method: "GET",
        headers: headers
      }).then(response => response.json())
      .then(data => {
        window.location.href = "read_products.html";
       
      })
      .catch((error) => console.log("Error ", error));
    }
  

  // this will load the scripts of the mentioned page
pages.loadFor = (page) => {
  eval("pages.page_" + page + "();");
};

