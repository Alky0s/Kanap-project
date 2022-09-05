const productId = getProductId();

fetch('http://localhost:3000/api/products/' + productId)
    .then(data => data.json())
    .then(jsonProduct => {
        // Collecting title, price and description
        document.getElementById('title').textContent = jsonProduct.name;
        document.getElementById('price').textContent = jsonProduct.price;
        document.getElementById('description').textContent = jsonProduct.description;
        
        
        // For selecting color 
        const colorsSelect = jsonProduct.colors;
        
        for (const color of colorsSelect) {
            document.getElementById('colors').innerHTML += `<option value="${color.toLowerCase()}">${color}</option>`;                                     
        }
        
        // Collecting images from API
        const productImageUrl = jsonProduct.imageUrl;
        const productImageAlt = jsonProduct.altTxt;
        document.querySelector('.item__img').innerHTML = `<img src="${productImageUrl}" alt="${productImageAlt}">`;
 
        // Adding products to cart + eventListener action on click
        const addToCart = document.getElementById("addToCart");

        addToCart.addEventListener('click', (event) => {

            // Get quantity value to the DOM
            const getProductQuantity = document.getElementById('quantity');
            
            // Get color value to the DOM
            const colorValue = document.getElementById('colors');
            const colorOptions = colorValue.value;

            // Array creation for Local storage
            const productArray = 
                {
                    name : jsonProduct.name,
                    id : productId,
                    quantity : parseInt(getProductQuantity.value),
                    color : colorOptions
                };
                cartNumbers(productArray);
                event.preventDefault();
            
            // Create a function to add products in localstorage
            function cartNumbers(product) {
                console.log(product.color);
                let productNumbers = localStorage.getItem('cartNumbers');
                productNumbers = parseInt(productNumbers);
                
                if (productNumbers) {
                    localStorage.setItem('cartNumbers', productNumbers + parseInt(getProductQuantity.value));
                } else {
                    localStorage.setItem('cartNumbers', parseInt(getProductQuantity.value));
                }
                setItems(product);
            }
            function setItems(product) {
                let alreadyInCart = localStorage.getItem('productsInCart');
                alreadyInCart = JSON.parse(alreadyInCart);
                console.log('I already added', alreadyInCart);
                if (alreadyInCart != null) {
                    if (alreadyInCart[product.name] == undefined) {
                        console.log(alreadyInCart[product.name]);
                        alreadyInCart = {
                            ...alreadyInCart,
                            [product.name]: product,
                        }
                        alreadyInCart[product.name].quantity;
                    } else {
                        alreadyInCart[product.name].quantity += product.quantity;
                    }
                    
                } else {
                    product.quantity;
                    alreadyInCart = {
                        [product.name]: product
                    }
                }

                

                
                localStorage.setItem('productsInCart', JSON.stringify(alreadyInCart));
            }
        })
    });

function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}




