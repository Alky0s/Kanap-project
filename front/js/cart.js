

// // Local storage
// function CartNumbers (product) {
//     let productNumbers = localStorage.getItem('CartNumbers'.value);

//     productNumbers = parseInt(productNumbers);

//     if (productNumbers) {
//         localStorage.setItem('CartNumbers', productNumbers + 1);
//     } else {
//         localStorage.setItem('CartNumbers', 1);
//     }
//     setItems(product);
// }  
// function setItems(product) {
//     // console.log("Inside of setItems");
//     // console.log("Look at", product);
    

//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     console.log("My cart items are", cartItems);

//     if(cartItems != null) {
//         if (cartItems[product.id] == undefined) {
//             cartItems = {
//                 ...cartItems,
//                 [product.id]: product
//             }
//         }
//         cartItems[product.id].quantity += 1;
//     } else {
//         product.quantity = 1;
//         cartItems = {
//             [product.id]: product
//         }
//     }
    
//     localStorage.setItem("productsInCart", JSON.stringify(cartItems));

//     // if (productsInCart) {
//     //     localStorage.setItem('cartItems', productsInCart + 1);
//     // } else {
//     //     localStorage.setItem('cartItems', 1);
//     // }
// }

// });

