const productId = getProductId();

fetch("http://localhost:3000/api/products/" + productId)
  .then((data) => data.json())
  .then((jsonProduct) => {
    // Collecting title, price and description
    document.getElementById("title").textContent = jsonProduct.name;
    document.getElementById("price").textContent = jsonProduct.price;
    document.getElementById("description").textContent =
      jsonProduct.description;

    // For selecting color
    const colorsSelect = jsonProduct.colors;

    for (const color of colorsSelect) {
      document.getElementById(
        "colors"
      ).innerHTML += `<option value="${color.toLowerCase()}">${color}</option>`;
    }

    // Collecting images from API
    const productImageUrl = jsonProduct.imageUrl;
    const productImageAlt = jsonProduct.altTxt;
    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src="${productImageUrl}" alt="${productImageAlt}">`;

    let addToCart = document.getElementById("addToCart");

    addToCart.addEventListener("click", () => {
      // Get quantity value to the DOM
      const getProductQuantity = document.getElementById("quantity");
      const productQuantity = parseInt(getProductQuantity.value);

      // Get color value to the DOM
      const colorValue = document.getElementById("colors");
      const productColor = colorValue.value;
      // Constant name changing
      const productName = jsonProduct.name;
  
      // Array creation for Local storage
      const productArray = {
        name: productName,
        id: productId,
        quantity: productQuantity,
        color: productColor,
      };

      //  Add total quantity to local storage
      let productNumbers = localStorage.getItem("cartNumbers");
      productNumbers = parseInt(productNumbers);

      // console.log(productNumbers);
      if (productNumbers) {
        localStorage.setItem(
          "cartNumbers",
          productNumbers + productQuantity
        );
      } else {
        localStorage.setItem("cartNumbers", productQuantity);
      }
     
        //  Check if there is something in Local storage
      let alreadyInCart = JSON.parse(localStorage.getItem("productsInCart"));

      // Check if color and quantity are selected
      if (
          productColor == null ||
          productColor === "" ||
          productQuantity === 0
        ) {
          alert ("Please select a color/quantity"); /* return ? */
        } 
          else {
            if (alreadyInCart == null) {
              alreadyInCart = [];
              alreadyInCart.push(productArray);
              localStorage.setItem(
                "productsInCart",
                JSON.stringify(alreadyInCart)
              );
          } else if (alreadyInCart != null) {
              for (let i = 0; i < alreadyInCart.length; i++) {
                if (
                  alreadyInCart[i]["id"] === productId &&
                  alreadyInCart[i]["color"] === productColor
                ) { 
                  return alreadyInCart[i]["quantity"] += productQuantity,
                  localStorage.setItem(
                    "productsInCart",
                    JSON.stringify(alreadyInCart)
                  );
                }
              }
              
              for (let i = 0; i < alreadyInCart.length; i++) {
                if (
                  alreadyInCart[i]["id"] === productId &&
                  alreadyInCart[i]["color"] != productColor || alreadyInCart[i]["id"] != productId
                ) { 
                  return (alreadyInCart.push(productArray)),
                  localStorage.setItem(
                    "productsInCart",
                    JSON.stringify(alreadyInCart)
                  );
                }
              }
            }
      }
    });
  });
      
      
          
  
  

function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}





