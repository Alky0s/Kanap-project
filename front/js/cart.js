function displayCart () {
    let alreadyInCart = localStorage.getItem('productsInCart');
    alreadyInCart = JSON.parse(alreadyInCart);
    let productContainer = document.getElementById('cart__items');

    if (alreadyInCart && productContainer) {
        productContainer.innerHTML = ``;
        Object.values(alreadyInCart).map(product => {
            productContainer.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                                <div class="cart__item__img">
                                                <img src="" alt="">
                                                </div>
                                                <div class="cart__item__content">
                                                <div class="cart__item__content__description">
                                                    <h2>${product.name}</h2>
                                                    <p>Vert</p>
                                                    <p>42,00 €</p>
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
        })
    }
    // console.log(alreadyInCart);
}
displayCart();