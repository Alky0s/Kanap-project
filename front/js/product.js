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

    // Getting price
    const productPrice = parseInt(jsonProduct.price);

    // Getting button to add a product to cart
    let addToCart = document.getElementById("addToCart");
    
    // When I click...
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
        image : productImageUrl,
        alt : productImageAlt,
        price : productPrice
      };

      //  Add total quantity to local storage
      let productNumbers = localStorage.getItem("cartNumbers");
      productNumbers = parseInt(productNumbers);

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
        // If there's nothing in the cart
        else {
          if (alreadyInCart == null) {
            alreadyInCart = [];
            alreadyInCart.push(productArray);
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(alreadyInCart)
            );
            // If there's something in, same id and color
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
            
            // If there's something in, different id and color
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
       //  Add total price to local storage
      // let cartCost = localStorage.getItem("totalCost");
      //  console.log('my product price is', cartCost);
      // if (cartCost == null) {
      //   localStorage.setItem("totalCost", productPrice);
      //   console.log('my product price is', cartCost);
      // } else {
      //   cartCost = parseInt(cartCost);
      //   localStorage.setItem(
      //     "totalCost",
      //     cartCost + productPrice
      //   );
      // }
      //   console.log('my total cost is', cartCost); 
    });
  });
      
      
          
  
  

function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}





