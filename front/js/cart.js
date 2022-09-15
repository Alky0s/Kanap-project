function displayCart () {
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
                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                                    </div>
                                                    <div class="cart__item__content__settings__delete">
                                                    <p class="deleteItem">Supprimer</p>
                                                    </div>
                                                </div>
                                                </div>
                                            </article>`
        });
    }

    
    let removeItem = document.getElementsByClassName('deleteItem');
    
    for (let i = 0; i < removeItem.length; i++) {
        removeItem[i].addEventListener('click', () => {
            let removeSelect = alreadyInCart[i];
            console.log(removeSelect);
            alreadyInCart = alreadyInCart.filter(product => (product.id != removeSelect.id && product.color != removeSelect.color) || (product.id == removeSelect.id && product.color != removeSelect.color) || (product.id != removeSelect.id && product.color == removeSelect.color));
            localStorage.setItem(
            "productsInCart",
            JSON.stringify(alreadyInCart)
            );
            alert("Ce produit a été supprimé du panier");
            window.location.href = "cart.html";  

            let productNumbers = localStorage.getItem("cartNumbers");
            productNumbers = parseInt(productNumbers);
            if (productNumbers) {
                localStorage.setItem(
                  "cartNumbers",
                  productNumbers - removeSelect.quantity
                );
              }      
        });     
    } 
     // Add total price to local storage

     let totalPriceArray = [];

     for (let i = 0; i < alreadyInCart.length; i ++) {
        // let priceProduct = 
        let priceProduct = alreadyInCart[i].price * alreadyInCart[i].quantity;
        
    //    Add each "priceProduct" to the array "totalPriceArray"
        totalPriceArray.push(priceProduct);
     }

    //  // Sum of all product prices
     const sum = (accumulator, currentValue) => accumulator + currentValue;
     const totalPrice = totalPriceArray.reduce(sum, 0);

    //  Put totalPrice to HTML 
    const getTotalPrice = document.getElementById(
        "totalPrice"
      ).innerHTML += `${totalPrice}`;
    
    // let getChangeQuantity = document.querySelector('.itemQuantity');
    //     getChangeQuantity.addEventListener('change', () => {
    //         let alreadyInCart = JSON.parse(localStorage.getItem('productsInCart'));
    //         console.log(alreadyInCart);
    //         const changeCartQuantity = alreadyInCart.find(product => product.id == changeCartQuantity.id);
    //         console.log(changeCartQuantity);
            
    //     }); 

      
            // let itemToUpdate = alreadyInCart[i];
            // console.log(itemToUpdate);
            // alreadyInCart  = alreadyInCart.find(product => (product.id != itemToUpdate.id && product.color != itemToUpdate.color) || (product.id == itemToUpdate.id && product.color != itemToUpdate.color) || (product.id != itemToUpdate.id && product.color == itemToUpdate.color));
        
    }
// }
//  function updateCartQuantity () {
//         let getChangeQuantity = document.getElementsByClassName('itemQuantity');
//         console.log(getChangeQuantity);
//         // let changeQuantity = parseInt(getChangeQuantity.value);
//         getChangeQuantity.addEventListener("change", console.log);
//     }
displayCart();

