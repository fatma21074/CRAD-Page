var inputName= document.getElementById("inputName");
var inputType= document.getElementById("inputType");
var inputPrice= document.getElementById("inputPrice");
var inputDesc= document.getElementById("inputDesc");
var inputImg=document.getElementById("inputImg");

var tbody=document.getElementById("tbody");

var inputSearch=document.getElementById("inputSearch");
var addBtns=document.getElementById('addBtn')
var editBtns=document.getElementById('editBtn')


function isValidName() {
   var regexName=/^[A-Za-z]{3,16}$/;
   var name=inputName.value;
   if(regexName.test(name)){
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    nameAlert.classList.add('d-none');
    return true;
   }
   else{
    inputName.classList.remove("is-valid");
    inputName.classList.add("is-invalid");
    nameAlert.classList.remove('d-none');
    return false;
   }
}

function isValidPrice() {
    var regexPrice=/^(10000|[1-9][0-9]{3})$/;
    var price=inputPrice.value;
    if(regexPrice.test(price)){
        inputPrice.classList.add("is-valid");
        inputPrice.classList.remove("is-invalid");
        priceAlert.classList.add('d-none');
        return true;
    }
    else{
         inputPrice.classList.remove("is-valid");
        inputPrice.classList.add("is-invalid");
        priceAlert.classList.remove('d-none');
        return false;
    }
}

function isValidType() {
var regexType=/^(Mobile|Screen|Tablet)$/i;
var type=inputType.value;
if(regexType.test(type)){
inputType.classList.add('is-valid');
inputType.classList.remove('is-invalid');
typeAlert.classList.add('d-none');
return true;
}
else{
    inputType.classList.remove('is-valid');
inputType.classList.add('is-invalid');
typeAlert.classList.remove('d-none');
return false;
}
}

function isValidDesc() {
    var regexDesc=/^[A-Za-z\s]{1,500}$/;
    var desc=inputDesc.value;
    if(regexDesc.test(desc)){
        inputDesc.classList.add('is-valid');
        inputDesc.classList.remove('is-invalid');
        descAlert.classList.add('d-none')
        return true;
    }
    else{
         inputDesc.classList.remove('is-valid');
        inputDesc.classList.add('is-invalid');
        descAlert.classList.remove('d-none');
        return false
    }
}



var Index;

var ProductList=[]
if(localStorage.getItem('product')!=null){
ProductList=JSON.parse(localStorage.getItem('product'));
display();
}


function addProduct() {
    if (isValidName() && isValidPrice() && isValidType() && isValidDesc()) {

        var product = {
            name: inputName.value,
            price: inputPrice.value,
            type: inputType.value,
            desc: inputDesc.value,
            img: inputImg.files[0] ? URL.createObjectURL(inputImg.files[0]) : '',
        };

        ProductList.push(product);
        localStorage.setItem('product', JSON.stringify(ProductList));
        display();
        clearfrom();

        Swal.fire({
            title: "Good job!",
            text: "You Added the Product!",
            icon: "success"
        });
    }
}


function clearfrom () {
   (inputDesc.value=''),
   (inputName.value=''),
   (inputPrice.value=''),
    (inputType.value=''),
    (inputImg.value=''); 
};

function display(){
    var box='';
    for(var i=0;i<ProductList.length;i++)
        {
        box+=`<tr>
                 <th>${i+1}</th>
                 <td>${ProductList[i].name}</td>
                 <td>${ProductList[i].type}</td>
                 <td>${ProductList[i].price}</td>
                 <td>${ProductList[i].desc}</td>
                 <td><img src="${ProductList[i].img}" alt="Product Image"></td>
              <td>
                <button class="btn btn-warning" onclick="editProduct(${i})">edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>
              </td>
            </tr>
        `
    };
tbody.innerHTML=box;
}

function searchProduct(){
var text = inputSearch.value.toLowerCase();
var name;
var box='';
    for(var i=0;i<ProductList.length;i++) 
        {
            name=ProductList[i].name.toLowerCase();
            if(name.includes(text)){
                box+=`<tr>
                         <th>${i+1}</th>
                         <td>${ProductList[i].name}</td>
                         <td>${ProductList[i].type}</td>
                         <td>${ProductList[i].price}</td>
                         <td>${ProductList[i].desc}</td>
                         <td><img src="${ProductList[i].img}" alt="Product Image"></td>

                      <td>
                        <button class="btn btn-warning" id="editBtn" onclick="editProduct(${i})">edit</button>
                        <button class="btn btn-danger" id="deleteBtn" onclick="deleteProduct(${i})">delete</button>
                      </td>
                    </tr>`
            };
    
           }
tbody.innerHTML=box;
}


function deleteProduct(x){
ProductList.splice(x,1);
localStorage.setItem( 'product',JSON.stringify(ProductList));
// console.log(ProductList);
   display();
   Swal.fire({
  title: "Good job!",
  text: "You Delete the Product!",
  icon: "error"
});
}


function editProduct(y){
    inputName.value = ProductList[y].name;
    inputType.value = ProductList[y].type;
    inputPrice.value = ProductList[y].price;
    inputDesc.value = ProductList[y].desc;
    
    editBtns.classList.remove('d-none');
    addBtns.classList.add('d-none');
    Index = y;
}

function updateProduct() {
    if (isValidName() && isValidPrice() && isValidType() && isValidDesc()) {

        var updatedProduct = {
            name: inputName.value,
            price: inputPrice.value,
            type: inputType.value,
            desc: inputDesc.value,
            img: inputImg.files[0]
                ? URL.createObjectURL(inputImg.files[0])
                : ProductList[Index].img,
        };

        ProductList.splice(Index, 1, updatedProduct);
        localStorage.setItem('product', JSON.stringify(ProductList));

        Swal.fire({
            title: "Good job!",
            text: "You Updated the Product!",
            icon: "success"
        });

        display();
        clearfrom();
        editBtns.classList.add('d-none');
        addBtns.classList.remove('d-none');
    }
}

