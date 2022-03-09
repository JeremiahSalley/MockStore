const searchInput = document.getElementById("search");

const invetory = [
  {
    id: 1,
    name: "short sleeve shirt",
    price: "$10.99",
    category: "shirt",
    Image: "images/shortSleeveShirt.jpg",
  },
  {
    id: 2,
    name: "long sleeve shirt",
    price: "$12.99",
    category: "shirt",
    Image: "images/longSleeveShirt.jpg",
  },
  {
    id: 3,
    name: "Black jeans",
    price: "$34.99",
    category: "pants",
    Image: "images/Pants1.jpg",
  },
  {
    id: 4,
    name: "Blue Jeans",
    price: "$24.99",
    category: "pants",
    Image: "images/Pants2.jpg",
  },
  {
    id: 5,
    name: "glasses",
    price: "$12.99",
    category: "accessory",
    Image: "images/glasses-accessory.jpg",
  },
  {
    id: 6,
    name: "belt",
    price: "$15.99",
    category: "accessory",
    Image: "images/belt-accessory.jpg",
  },
  {
    id: 7,
    name: 'Nike White Shoes',
    price: "$99",
    category: "shoes",
    Image: "images/download.jpg",
  },
  {
    id: 8,
    name: 'Nike Black Shoes',
    price: '$85',
    category: 'shoes',
    Image: "images/nikeBlackShoes.jpg",
  },
];

let shopItems = [];

shopItems = invetory.map((item) => {
  // create card
  card = document.createElement("div");
  card.classList.add("card");
  // create image div
  imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  // image tag
  image = document.createElement("img");
  image.classList.add("shop-item-image");
  image.setAttribute("src", item.Image);
  // append the image tag to imageContainer then append imageContainer to card div
  imageContainer.appendChild(image);
  card.appendChild(imageContainer);
  // place card div inside products div (can be found on html file)

  //Shop details section (name, price, and button)
  let shopDetails = document.createElement("div");
  shopDetails.classList.add("shop-item-details");
  // name
  let name = document.createElement("h5");
  name.classList.add("title");
  name.innerText = item.name.toUpperCase();
  // price
  let price = document.createElement("p");
  price.classList.add("price");
  price.innerText = item.price;

  // button
  let button = document.createElement("button");
  button.classList.add("add-cart-btn");
  button.innerText = "Add To Bag";
  // append to shopDetails then append to card
  shopDetails.appendChild(name);
  shopDetails.appendChild(price);
  shopDetails.appendChild(button);
  card.appendChild(shopDetails);

  document.getElementById("products").appendChild(card);

  return { name: item.name, category: item.category, element: card };
});

//shopItems is an array of item.name and card assiocated with name loop through the array and add a classList of hide

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  shopItems.forEach((product) => {
    console.log(product);

    const isVisible =
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value);
    product.element.classList.toggle("hide", !isVisible);
    // if isVisible not true it will hide the card and only show card that have the same value as the input
  });
});


//grab the add to bag button on each
let addToBag = document.getElementsByClassName("add-cart-btn");
// addToBag.addEventListener('click', checking)
for (let i = 0; i < addToBag.length; i++) {
  let addToCart = addToBag[i];
  addToCart.addEventListener("click", addToCartClick);
}

function addToCartClick(e) {
  let button = e.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("title")[0].innerText;
  let price = shopItem.getElementsByClassName("price")[0].innerText;
  let imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imgSrc);
  updateCartTotal()
}

function addItemToCart(title, price, imgSrc) {
  let newCartRow = document.createElement("div");
  newCartRow.classList.add('cart-row')
  let cartItems = document.getElementsByClassName("cart-items")[0];
//   newCartRow.classList.add('cart-row')
  let cartItemName = document.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemName.length; i++){
      if(cartItemName[i].innerHTML == title){
          alert(`${title} is already added to cart`)
          return

      }
  }
  let cartRowContents = `<div class="cart-item cart-column">
    <img
    src="${imgSrc}"
    alt="short sleeve shirt"
    class="cart-item-image"
    />
    <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input type="number" value="1" class="cart-quantity-input" />
      <button role="button" class="btn btn-danger">REMOVE</button>
  </div>`;
  newCartRow.innerHTML = cartRowContents;
  cartItems.appendChild(newCartRow);
  newCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItemsFromCart)
  newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// Creating the cart modal open and close feature
const cartBtn = document.querySelector(".cart");
let modal = document.querySelector(".modal-container");
let sectionHeader = document.querySelector('.section-header')
const closeModal = document.querySelector(".close-button");
let productscroll = document.getElementById('products')
cartBtn.addEventListener("click", cartModal);
closeModal.addEventListener("click",closeModalFunc)

function cartModal() {
  modal.classList.toggle("show-modal");
  modal.style.overflowY = 'auto';

  document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;
  body.style.height = '100vh';
  body.style.overflowY = 'hidden';
  updateCartTotal()
  removeItemsFromCart()
}

function closeModalFunc(){
  modal.classList.remove("show-modal");
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  body.style.height = '';
  body.style.overflowY = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

// remove item from cart
let removeFromCart = document.getElementsByClassName("btn-danger");
function removeItemsFromCart(){
    for (let i = 0; i < removeFromCart.length; i++) {
        let button = removeFromCart[i];
        button.addEventListener("click", function (event) {
          let buttonClicked = event.target;
          buttonClicked.parentNode.parentNode.remove();
          updateCartTotal();
        });
      }
}

// update the cart total 
function updateCartTotal() {
  let cartContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];

    // let price = parseFloat(priceElement.innerText.replace("$", ""));
    let price = priceElement.innerText.replace("$", "")
    let quantity = quantityElement.value;
    total = total + price * quantity;
    
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}



// Update the cart total when item quantity changes

let quantityInput = document.getElementsByClassName("cart-quantity-input");
for (let i = 0; i < quantityInput.length; i++) {
  let input = quantityInput[i];
  input.addEventListener("change", quantityChanged);
}

function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}


// purchase button 

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

function purchaseClicked(){
    alert('Thank you for your purchase')
    cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    // const body = document.body
    // body.style.overflowY = auto;
    cartModal()
    closeModalFunc()
    updateCartTotal()
}

