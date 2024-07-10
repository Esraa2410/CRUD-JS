var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var add = document.getElementById('add');
var update = document.getElementById('update');


var productsContainer = [];
if(localStorage.getItem('products')!=null){
    productsContainer=JSON.parse(localStorage.getItem('products'));
    display(productsContainer);
}

function addProduct() {
    if(validateName()){
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        cateo: productCategoryInput.value,
        desc: productDescInput.value
    }

    productsContainer.push(product);
    localStorage.setItem("products" ,JSON.stringify(productsContainer))
    display(productsContainer);
    clearInputs();
}else{
    alert('name Invaild')
}
}

function validateName(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    return regex.test(productNameInput.value)
}

function updateProduct(id){
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        cateo: productCategoryInput.value,
        desc: productDescInput.value
    }
    productsContainer.fill(product,id,id+1)
     localStorage.setItem("products" ,JSON.stringify(productsContainer))
     display(productsContainer);
     clearInputs();
}



function display(arr) {
    cartona = ``;
    for (var i = 0; i < arr.length; i++) {
        cartona += `
          <tr>
                    <td>${arr[i].name}</td>
                     <td>${arr[i].price}</td>
                      <td>${arr[i].cateo}</td>
                       <td>${arr[i].desc}</td>
                    <th><button onclick="setUpdate(${i})" class="btn btn-outline-primary">Update</button> </th>
                    <th><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button> </th>
                </tr>
        `

    }
    document.getElementById('tableBody').innerHTML = cartona;
}

function setUpdate(id){
    add.classList.replace('d-block','d-none');
    update.classList.replace('d-none','d-block');
    productNameInput.value=productsContainer[id].name;
    productPriceInput.value=productsContainer[id].price;
    productCategoryInput.value=productsContainer[id].cateo;
    productDescInput.value=productsContainer[id].desc;
    update.value=id;
}


function clearInputs() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";

}

function deleteProduct(id){
    productsContainer.splice(id,1);
    localStorage.setItem("products" ,JSON.stringify(productsContainer))
    display(productsContainer);
}

function searchProducts(term){
    var matchProducts=[]
    for(let i=0;i<productsContainer.length;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            console.log(i);
            matchProducts.push(productsContainer[i])

        }
    }
    display(matchProducts)

   
} 