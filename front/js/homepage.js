fetch("http://localhost:3000/api/products")
    .then(data => data.json())
    .then(jsonItemList => {
        for(let jsonItem of jsonItemList){
            let item = new Items(jsonItem);
            document.getElementById("items").innerHTML += `<a href="./product.html?id=${item._id}">
                                                            <article>
                                                                <img src="${item.imageUrl}" alt="${item.altTxt}">
                                                                <h3 class="productName">${item.name}</h3>
                                                                <p class="productDescription">${item.description}</p>
                                                            </article>
                                                        </a>`;
                                                                                    
        }
    });