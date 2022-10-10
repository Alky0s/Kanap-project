function displayCart() {
    let alreadyInCart = localStorage.getItem('productsInCart');
    alreadyInCart = JSON.parse(alreadyInCart);
    let productContainer = document.getElementById('cart__items');
    
    if (alreadyInCart && productContainer) {
        productContainer.innerHTML = ``;
        Object.values(alreadyInCart).map(product => {
            productContainer.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                                <div class="cart__item__img">
                                                    <img src="${product.image}" alt="${product.alt}">
                                                </div>
                                                <div class="cart__item__content">
                                                    <div class="cart__item__content__description">
                                                        <h2>${product.name}</h2>
                                                        <p>${product.color}</p>
                                                        <p>${product.price}€</p>
                                                    </div>
                                                    <div class="cart__item__content__settings">
                                                        <div class="cart__item__content__settings__quantity">
                                                            <p>Qté : </p>
                                                            <input type="number" data-id="${product.id}" data-color="${product.color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                                        </div>
                                                        <div class="cart__item__content__settings__delete">
                                                            <p class="deleteItem">Supprimer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>`  
        }) 
    }  
    // Delete a product from localStorage
    let removeItem = document.getElementsByClassName('deleteItem');
    removeProduct(removeItem);
       
    // Add total price to local storage
    let totalPriceArray = [];

    for (let i = 0; i < alreadyInCart.length; i ++) {
        let priceProduct = alreadyInCart[i].price * alreadyInCart[i].quantity;
        
        //Add each "priceProduct" to the array "totalPriceArray"
        totalPriceArray.push(priceProduct);
    }

    //  // Sum of all product prices
    const price = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = totalPriceArray.reduce(price, 0);
   
    //  Put totalPrice to the DOM 
    const getTotalPrice = document.getElementById("totalPrice").innerHTML += `${totalPrice}`;

    //   Put quantity to the DOM
    let totalQuantityArray = [];

    for (let i = 0; i < alreadyInCart.length; i ++) {
        let quantityProduct = alreadyInCart[i].quantity;
        console.log(quantityProduct);

         //Add each "quantityProduct" to the array "totalQuantityArray"
         totalQuantityArray.push(quantityProduct);
    }

    //  // Sum of all product quantities
    const quantity = (accumulator, currentValue) => accumulator + currentValue;
    const totalQuantity = totalQuantityArray.reduce(quantity, 0);
    const getTotalQuantity = document.getElementById("totalQuantity").innerHTML += `${totalQuantity}`;     
    
    // Update price and quantity
    let inputQuantities = document.querySelectorAll('.itemQuantity');
    alreadyInCart = JSON.parse(localStorage.getItem('productsInCart'));

    inputQuantities.forEach(inputQuantity => {
        inputQuantity.addEventListener("change", (e) => {
            for (article of alreadyInCart) {
                if (article.id === inputQuantity.dataset.id && article.color === inputQuantity.dataset.color) {
                    article.quantity = parseInt(e.target.value);
                    console.log('test', article.quantity);
                    localStorage.setItem("productsInCart", JSON.stringify(alreadyInCart));
                    window.location.href = "cart.html";
                }
            }
        }); 
    })    
}       
displayCart();


// 1/ AddEventListener
let getOrderButton = document.getElementById('order');
getOrderButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Get form values from DOM
    const formValues = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value
    }
    alreadyInCart = JSON.parse(localStorage.getItem('productsInCart'));
    
    // Check if each form field is valid
    const regExTextFields = (value) => {
        return /^[a-zA-Zàâéèëêïîôùüç -]{3,20}$/.test(value);
    }
    function firstNameControl() {
        if (regExTextFields(formValues.firstName)) {
            document.getElementById('firstNameErrorMsg').textContent =  "";
            return true;
            } else {
            document.getElementById('firstNameErrorMsg').textContent =  "La saisie du prénom est incorrecte ou manquante"
            return false;
            } 
    }
    
    function lastNameControl() {
        if (regExTextFields(formValues.lastName)) {
            document.getElementById('lastNameErrorMsg').textContent =  "";
            return true;
            } else {
            document.getElementById('lastNameErrorMsg').textContent = "La saisie du nom est incorrecte ou manquante"
            return false;
            }
    }

    function addressControl() {
        if (/^([0-9a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s-]{8,50})$/.test(formValues.address)) {
            document.getElementById('addressErrorMsg').textContent =  "";
            return true;
            } else {
            document.getElementById('addressErrorMsg').textContent = "La saisie de l'adresse est invalide ou manquante"
            return false;
            }
    }
    function cityControl() {
        if (regExTextFields(formValues.city)) {
            document.getElementById('cityErrorMsg').textContent =  "";
            return true;
            } else {
            document.getElementById('cityErrorMsg').textContent = "La saisie de la ville est incorrecte ou manquante"
            return false;
            }
    }

    function emailControl() {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email)) {
            document.getElementById('emailErrorMsg').textContent =  "";
            return true;
            } else {
            document.getElementById('emailErrorMsg').textContent = "L'adresse mail n'est pas valide ou manquante"
            return false;
            }
    }
    
    
    // Check if the form is valid
    if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
        localStorage.setItem('contact', JSON.stringify(formValues));
        // window.location.href = "cart.html";
    } else {
        return 
    }
 
    // Body for POST request
    const orderInfo = {
        contact : {
          firstName : formValues.firstName,
          lastName : formValues.lastName,
          address : formValues.address,
          city : formValues.city,
          email : formValues.email
        },
        products : getIdsFromCart ()
      }

    // Send order with POST request
    const sendToOrder = fetch ("http://localhost:3000/api/products/order", {
            method : "POST",
            body : JSON.stringify(orderInfo),
            headers : {
                "Content-Type": "application/json"
            },
    });

    sendToOrder.then(async(response)=> {
        try {
            const formInfo = await response.json();
            const orderId = formInfo.orderId;
            // localStorage.setItem('orderId', JSON.stringify(orderId));
            window.location.href = "confirmation.html" + "?orderId=" + orderId;
        } catch(e) {
            console.log('e');
            console.log(e);
        }
    })
});

function getIdsFromCart () {
    const ids = [];
    for (let i = 0; i < alreadyInCart.length; i ++) {
        const alreadyInCartId = alreadyInCart[i]["id"];
        ids.push(alreadyInCartId);
    }
    return ids
}

function removeProduct(removeItem) {
    for (let i = 0; i < removeItem.length; i++) {
        removeItem[i].addEventListener('click', () => {
            let alreadyInCart = localStorage.getItem('productsInCart');
            alreadyInCart = JSON.parse(alreadyInCart);
            let removeSelect = alreadyInCart[i];
            console.log(removeSelect);
            alreadyInCart = alreadyInCart.filter(product => (product.id != removeSelect.id && product.color != removeSelect.color) || (product.id == removeSelect.id && product.color != removeSelect.color) || (product.id != removeSelect.id && product.color == removeSelect.color));
            localStorage.setItem(
            "productsInCart",
            JSON.stringify(alreadyInCart)
            );
            alert("Ce produit a été supprimé du panier");
            window.location.href = "cart.html";       
        });     
    } 
}

