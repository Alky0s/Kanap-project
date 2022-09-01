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
            console.log(color);                                    
        }
        
        // Collecting images from API
        const productImageUrl = jsonProduct.imageUrl;
        const productImageAlt = jsonProduct.altTxt;
        document.querySelector('.item__img').innerHTML = `<img src="${productImageUrl}" alt="${productImageAlt}">`;
 
        const getProductQuantity = document.getElementById('quantity');

        // //  Add product to cart
        // const couleur = document.getElementById('colors').getElementsByTagName('option');
        // const couleur = document.getElementById('colors');
        // console.log(couleur);

        // const choixCouleur = couleur.innerText;
        // console.log(choixCouleur);

        let productArray = [
            {
                id: productId,
                quantity : parseInt(getProductQuantity.value),
                color: couleur
            }
        ];
        console.log(productArray);

        for (let i = 0; i < productArray.length; i ++) {
        document.getElementById("addToCart").addEventListener('click', () => {
            cartQuantity(productArray[i]);
        });
    }
    
        
        function cartQuantity(product) {

            let alreadyInCart = localStorage.getItem('cartQuantity');
            
            alreadyInCart =parseInt(alreadyInCart);
            
            if (alreadyInCart) {
                localStorage.setItem('cartQuantity', alreadyInCart + parseInt(getProductQuantity.value));
            } else {
                localStorage.setItem('cartQuantity', parseInt(getProductQuantity.value));
            }
            setItems(product);
        }
        function setItems(product) {
            let cartItems = localStorage.getItem('productsInCart');
            cartItems = JSON.parse(cartItems);
            console.log("My cart items are", cartItems);
        
            if(cartItems != null) {
                if (cartItems[product.id] == undefined) {
                    cartItems = {
                        ...cartItems,
                        [product.id]: product
                    }
                }
                cartItems[product.id].quantity += parseInt(getProductQuantity.value);
            } else {
                product.quantity = parseInt(getProductQuantity.value);
                cartItems = {
                    [product.id]: product
                }
            }
            
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        }
    });

function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}


