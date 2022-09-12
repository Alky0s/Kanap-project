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
                                                    <button class="deleteItem">Supprimer</button>
                                                    </div>
                                                </div>
                                                </div>
                                            </article>`
        });
    }
    let removeItem = document.getElementsByClassName('deleteItem');
    
    for (let i = 0; i < removeItem.length; i++) {
        removeItem[i].addEventListener('click', () => {
            let removeSelect = alreadyInCart[i].id;
            
            alreadyInCart = alreadyInCart.filter(el => el.id !== removeSelect);
            localStorage.setItem(
                "productsInCart",
                JSON.stringify(alreadyInCart)
              );
            alert("Ce produit a été supprimer du panier");
            window.location.href = "cart.html";

            // let productNumbers = localStorage.getItem("cartNumbers");
            // productNumbers = parseInt(productNumbers);
            // localStorage.setItem(
            // "cartNumbers",
            // productNumbers - alreadyInCart[i].quantity
            // );
        });
        


        
           
        
    }
}
displayCart();

