const productId = getProductId();


fetch('http://localhost:3000/api/products/' + productId)
    .then(data => data.json())
    .then(jsonProduct => {
        console.log(jsonProduct);

        document.getElementById('title').textContent = jsonProduct.name;
        document.getElementById('price').textContent = jsonProduct.price;
        document.getElementById('description').textContent = jsonProduct.description;
        // console.log(jsonProduct.imageUrl);
        const colorSelect = jsonProduct.colors;
        
        for (let jsonProductColor of colorSelect) {
            console.log(jsonProductColor);
            
            document.getElementById('colors').innerHTML += `<option value="">${jsonProductColor}</option>`;                                      
        }

        var productImage = document.createElement("img");
        productImage.src = jsonProduct.imageUrl;
        
        var src = document.querySelector(".item__img");
        src.appendChild(productImage);
    });

function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}

