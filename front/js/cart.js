// const productId = getProductId();

// const productColor = getProductColor();

// const productQuantity = getProductQuantity();
// console.log(productQuantity);

// fetch('http://localhost:3000/api/products/' + productId)
//     .then(data => data.json())
//     .then(jsonProduct => {
//         // Collecting title, price and description
//         document.getElementById('title').textContent = jsonProduct.name;
//         document.getElementById('price').textContent = jsonProduct.price;
//         document.getElementById('description').textContent = jsonProduct.description;
        
        
//         // For selecting color 
//         const colorsSelect = jsonProduct.colors;
        
//         for (const color of colorsSelect) {
//             document.getElementById('colors').innerHTML += `<option value="${color.toLowerCase()}">${color}</option>`;                                     
//         }
        
//         // Collecting images from API
//         const productImageUrl = jsonProduct.imageUrl;
//         const productImageAlt = jsonProduct.altTxt;
//         document.querySelector('.item__img').innerHTML = `<img src="${productImageUrl}" alt="${productImageAlt}">`;
 
//         // Adding products to cart + eventListener action on click
//         const addToCart = document.getElementById("addToCart");
//         addToCart.addEventListener('click', (event) => { 
//             cartNumbers();
//             event.preventDefault();
        
//         // Create a function to add products in localstorage

//         function cartNumbers(cartNumbers) {
//             let productNumbers = localStorage.getItem('cartNumbers');
//             productNumbers = parseInt(productNumbers);
            
//             if (productNumbers) {
//                 localStorage.setItem('cartNumbers', productNumbers + parseInt(productQuantity));
//             } else {
//                 localStorage.setItem('cartNumbers', parseInt(productQuantity));
//             }
//         }

//         // Array creation for Local storage
//         const productArray = [
//             {
//                 id: productId,
//                 quantity : parseInt(productQuantity),
//                 color : productColor
//             }
//         ];
//         console.log(productArray);
//         })

        
//     });

// // Get product ID with searchparams
// function getProductId() {
//     return new URL(window.location.href).searchParams.get('id');
// }

// // Get color value to the DOM
// function getProductColor() {
//     const colorValue = document.getElementById('colors');
//     const colorOptions = colorValue.value;
//     console.log(colorOptions);
// }

// // Get quantity value to the DOM
// function getProductQuantity() {
//     const quantity = document.getElementById('quantity');
//     const quantityValue = quantity.value;
//     console.log(quantityValue);
// }


