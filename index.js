let loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click", doModal);

function doModal() {
    let myLoginButton = document.querySelector(".login-logout");
    if (myLoginButton.textContent == "Login") {
        let modal = document.querySelector("#loginModal");
        let body = document.querySelector("body");
        body.classList.add("modal-open");
        modal.classList.add("in");
    }
}



/*==================================================================
[ Focus input ]*/
$('.input100').each(function () {
    $(this).on('blur', function () {
        if ($(this).val().trim() != "") {
            $(this).addClass('has-val');
        }
        else {
            $(this).removeClass('has-val');
        }
    })
})


/*==================================================================
[ Validate ]*/
var input = $('.validate-input .input100');

$('.validate-form').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }

    return check;
});


$('.validate-form .input100').each(function () {
    $(this).focus(function () {
        hideValidate(this);
    });
});

function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    }
    else {
        if ($(input).val().trim() == '') {
            return false;
        }
    }

    if ($(input).attr('type') == 'phone' || $(input).attr('name') == 'phone') {
        if ($(input).val().trim().match(/(\+?\d{2}\s?)?(\s?\d{2}){4}/) == null) {
            return false;
        }
    }
    else {
        if ($(input).val().trim() == '') {
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

/*==================================================================
[ Show pass ]*/
var showPass = 0;
$('.btn-show-pass').on('click', function () {
    if (showPass == 0) {
        $(this).next('input').attr('type', 'text');
        $(this).find('i').removeClass('zmdi-eye');
        $(this).find('i').addClass('zmdi-eye-off');
        showPass = 1;
    }
    else {
        $(this).next('input').attr('type', 'password');
        $(this).find('i').addClass('zmdi-eye');
        $(this).find('i').removeClass('zmdi-eye-off');
        showPass = 0;
    }

});

const loginForm = document.querySelector(".login100-form");
const submitForm = document.querySelector(".my-login-form-button");
const donateForm = document.querySelector("#donate-form");
const submitDonateForm = document.querySelector(".submit-donate-button");


function pushBonuses(bonuses, userId) {
    console.log("Da");
    let totalBonuses = parseInt(bonuses);
    let actualBonuses = parseInt(localStorage.getItem("user-bonusCode"));
    totalBonuses = totalBonuses + actualBonuses;
    localStorage.setItem("user-bonusCode", totalBonuses);
    const payLoad = {
        bonusCode: totalBonuses
    };

    const postData = JSON.stringify(payLoad);
    fetch(`https://5bdffe29f2ef840013994a15.mockapi.io/messages/${userId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: postData
    })
        .then(res => res.json())
        .then(d => {
            console.log(d);
        });
}

if (donateForm) {

    donateForm.addEventListener("submit", e => {
        e.preventDefault();
        /*let formEmail = donateForm.elements.email.value;
        let formAddress = donateForm.elements.address.value;
        let formPhone = donateForm.elements.phone.value;*/
        let firstName = donateForm.elements.firstname.value;
        let lastName = donateForm.elements.lastname.value;
        let formShoePairs = donateForm.elements.shoes_number.value;
        let selectedWeek = donateForm.elements.week.value;
        let selectedTime = donateForm.elements.time.value;
        let userID = localStorage.getItem("user-id");
        if (submitDonateForm.innerHTML == "Get your bonus") {
            donateForm.elements.email.value = localStorage.getItem("user-email");
            pushBonuses(formShoePairs, userID);
            //addOrder(userID, firstName, lastName, formShoePairs, selectedTime, selectedWeek);
        }
        else {
            let formEmail = donateForm.elements.email.value;
            let formPhone = donateForm.elements.phone.value;
            let formMessage = donateForm.elements.message.value;
            let formAddress = donateForm.elements.address.value;
            const myData = {
                firstName: firstName,
                lastName: lastName,
                pairs: formShoePairs,
                week: selectedWeek,
                hour: selectedTime,
                email: formEmail,
                phone: formPhone,
                message: formMessage,
                address: formAddress
            }

            fetch("https://5bdffe29f2ef840013994a15.mockapi.io/orders")
                .then(res => res.json())
                .then(function (data) {
                    let ok = 0;
                    /*for (let i = 0; i < data.length; i++) {
                        if (data[i].email.toLowerCase() == myData.email.toLowerCase()) {
                            let email = document.querySelector(".email-input");
                            showValidate(email);
                            ok = 1;
                        }
                    }
    
    
                    if (validate(email) == false) {
                        ok = 1;
                    }
    
                    if (validate(myphone) == false) {
                        ok = 1;
    
                    }
                    */

                    if (ok == 0) {
                        fetch("https://5bdffe29f2ef840013994a15.mockapi.io/orders/", {
                            method: "post",
                            body: JSON.stringify(myData),
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            }
                        })
                            .then(res => { res.json(); })
                            .then(d => {
                            });

                        document.querySelector(".myAlert").style.display = "block";
                        document.querySelector("#donate-form").reset();
                        setTimeout(function () {
                            document.querySelector(".myAlert").style.display = "none";
                        }, 5000);


                    }
                })
        }
    });
}





loginForm.addEventListener("submit", e => {
    e.preventDefault();
    let formEmail = loginForm.elements.email.value;
    let formPassword = loginForm.elements.pass.value;
    let formAddress = loginForm.elements.address.value;
    let formPhone = loginForm.elements.phone.value;
    let myphone = document.querySelector(".phone-input");
    let email = document.querySelector(".email-input");
    if (submitForm.innerHTML === "Login") {
        checkLogin(formEmail, formPassword);
    }
    else {
        const myData = {
            email: formEmail,
            password: formPassword,
            phone: formPhone,
            address: formAddress,
            bonusCode: 0
        }

        fetch("https://5bdffe29f2ef840013994a15.mockapi.io/messages")
            .then(res => res.json())
            .then(function (data) {
                let ok = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].email.toLowerCase() == myData.email.toLowerCase()) {
                        let email = document.querySelector(".email-input");
                        showValidate(email);
                        ok = 1;
                    }
                }


                if (validate(email) == false) {
                    ok = 1;
                }

                if (validate(myphone) == false) {
                    ok = 1;

                }

                let title = document.querySelector(".login100-form-title");
                let loginButton = document.querySelector(".my-login-form-button");
                let myText = document.querySelector(".txt1");
                let signUp = document.querySelector(".sign-up");
                let emailInput = document.querySelector(".myemail-input");
                let passInput = document.querySelector(".mypassword-input");
                let address = document.querySelector(".myaddress-input");
                let phone = document.querySelector(".myphone-input");
                let logButton = document.querySelector(".my-wrap-form-button");

                if (ok == 1) {
                    //title.classList.toggle("bounceIn");
                }

                if (ok == 0) {
                    fetch("https://5bdffe29f2ef840013994a15.mockapi.io/messages/", {
                        method: "post",
                        body: JSON.stringify(myData),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                        .then(res => { res.json(); })
                        .then(d => {
                        });

                    logButton.style.display = "none";
                    emailInput.style.display = "none";
                    passInput.style.display = "none";
                    title.classList.toggle("bounceIn");
                    title.textContent = "Your account has been created";
                    title.style.fontSize = "24px";
                    loginButton.classList.toggle("bounceIn");
                    loginButton.innerHTML = "Sign Up";
                    myText.classList.toggle("bounceIn");
                    myText.textContent = "Want to log in to your account?";
                    signUp.classList.toggle("bounceIn");
                    signUp.textContent = "Log In";
                    address.style.display = "none";
                    phone.style.display = "none";

                }
            })
    }
});


function checkLogin(email, password) {
    const payLoad = {
        email: email,
        password: password
    };

    fetch("https://5bdffe29f2ef840013994a15.mockapi.io/messages")
        .then(res => res.json())
        .then(function (data) {
            let ok = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].email.toLowerCase() == payLoad.email.toLowerCase()) {
                    ok = 1;
                    if (data[i].password == payLoad.password) {
                        let body = document.querySelector("body");
                        let modalBackground = document.querySelector(".modal-backdrop");
                        let loginModal = document.querySelector("#loginModal");
                        loginModal.style.display = "none";
                        loginModal.classList.remove("show");
                        modalBackground.remove();
                        body.classList.remove("modal-open");
                        let loginButton = document.querySelector(".login-logout");
                        loginButton.textContent = "Logout";
                        let myspan = document.querySelector(".glyphicon-log-in");
                        myspan.classList.remove("glyphicon-log-in");
                        myspan.classList.add("glyphicon-log-out");
                        ok = 2;
                        if (data[i].email.toLowerCase() == "admin@admin.dk" && data[i].password == "admin") {
                            let dashboard = document.querySelector("#dashboard-button");
                            dashboard.style.display = "block";
                            localStorage.setItem("dashboard", "true");
                        }
                        else {
                            localStorage.setItem("dashboard", "false");
                        }

                        localStorage.setItem("logout", "Logout");
                        localStorage.setItem("user-email", data[i].email);
                        localStorage.setItem("user-address", data[i].address);
                        localStorage.setItem("user-id", data[i].id);
                        localStorage.setItem("user-phone", data[i].phone);
                        localStorage.setItem("user-bonusCode", data[i].bonusCode);
                        if (document.querySelector(".donate-title")) {
                            let donateTitle = document.querySelector(".donate-title");
                            donateTitle.innerHTML = "Welcome back!<br>\
                        How many shoes would you like to donate this time?";
                            document.querySelector(".telephone-input").style.display = "none";
                            document.querySelector(".email-donate-input").style.display = "none";
                            document.querySelector(".address-donate-input").style.display = "none";
                            document.querySelector(".submit-donate-button").innerHTML = "Get your bonus";
                        }

                        console.log(data[i]);
                    }
                }
            }
            if (ok == 1) {
                let password = document.querySelector(".password-input");
                showValidate(password);
            }

            if (ok == 0) {
                let email = document.querySelector(".email-input");
                showValidate(email);
            }

        })

}

init();

function init() {
    doLogin();
    let loginButton = document.querySelector("#login-button");
    let signUp = document.querySelector(".sign-up");
    loginButton.addEventListener("click", doLoginLogout);
    signUp.addEventListener("click", doSignUp);


}

function checkingCart() {
    let cartShoes = document.querySelectorAll(".single-item");
    if (cartShoes.length > 2 && cartShoes.length % 2 == 1) {
        cartShoes[cartShoes.length - 2].style.borderBottom = "2px solid green";
    }
}

setTimeout(checkingCart, 50);

function doLogin() {
    let myLoginButton = document.querySelector(".login-logout");
    if (localStorage.getItem("logout") == "Logout") {
        myLoginButton.textContent = localStorage.getItem("logout");
        let myspan = document.querySelector(".glyphicon-log-in");
        myspan.classList.remove("glyphicon-log-in");
        myspan.classList.add("glyphicon-log-out");
        console.log(localStorage);
    }
    if (localStorage.getItem("dashboard") == "true" && myLoginButton.textContent == "Logout") {
        let dashboard = document.querySelector("#dashboard-button");
        dashboard.style.display = "block";
    }
    if (localStorage.getItem("user-id") != "false" && document.querySelector(".donate-title")) {
        let donateTitle = document.querySelector(".donate-title");
        donateTitle.innerHTML = "Welcome back!<br>\
                        How many shoes would you like to donate this time?";
        document.querySelector(".telephone-input").style.display = "none";
        document.querySelector(".email-donate-input").style.display = "none";
        document.querySelector(".address-donate-input").style.display = "none";
        document.querySelector(".submit-donate-button").innerHTML = "Get your bonus";
    }
    console.log(localStorage);
}



function doLoginLogout() {
    let myLoginButton = document.querySelector(".login-logout");

    if (myLoginButton.textContent == "Logout") {
        myLoginButton.textContent = "Login";
        localStorage.logout = "Login";
        let myspan = document.querySelector(".login-icon");
        myspan.classList.remove("glyphicon-log-out");
        myspan.classList.add("glyphicon-log-in");
        let dashboard = document.querySelector("#dashboard-button");
        dashboard.style.display = "none";
        localStorage["user-id"] = "false";
        if (document.querySelector(".donate-title")) {
            let donateTitle = document.querySelector(".donate-title");
            donateTitle.innerHTML = "Donate your extra shoes now<br>\
        and make someone else's feet happy!";
            document.querySelector(".telephone-input").style.display = "block";
            document.querySelector(".email-donate-input").style.display = "block";
            document.querySelector(".address-donate-input").style.display = "block";
            document.querySelector(".submit-donate-button").innerHTML = "Submit";
        }

    }
}

function doSignUp() {
    let modal = document.querySelector("#loginModal");
    let emailInput = document.querySelector(".myemail-input");
    let passInput = document.querySelector(".mypassword-input");
    let logButton = document.querySelector(".my-wrap-form-button");
    let phone = document.querySelector(".myphone-input");
    let address = document.querySelector(".myaddress-input");
    logButton.style.display = "block";
    emailInput.style.display = "block";
    passInput.style.display = "block";
    if (modal.dataset.test == "login") {
        modal.dataset.test = "singUp";
        let title = document.querySelector(".login100-form-title");
        let loginButton = document.querySelector(".my-login-form-button");
        let myText = document.querySelector(".txt1");
        let signUp = document.querySelector(".sign-up");
        title.classList.toggle("bounceIn");
        title.textContent = "Create a new account";
        loginButton.classList.toggle("bounceIn");
        loginButton.innerHTML = "Sign Up";
        myText.classList.toggle("bounceIn");
        myText.textContent = "Already have an account?";
        signUp.classList.toggle("bounceIn");
        signUp.textContent = "Log In";
        phone.style.display = "block";
        address.style.display = "block";
    }
    else {
        modal.dataset.test = "login";
        let title = document.querySelector(".login100-form-title");
        let loginButton = document.querySelector(".my-login-form-button");
        let myText = document.querySelector(".txt1");
        let signUp = document.querySelector(".sign-up");
        title.classList.toggle("bounceIn");
        title.textContent = "Welcome!";
        loginButton.classList.toggle("bounceIn");
        loginButton.innerHTML = "Login";
        myText.classList.toggle("bounceIn");
        myText.textContent = "Don’t have an account?";
        signUp.classList.toggle("bounceIn");
        signUp.textContent = "Sign Up";
        phone.style.display = "none";
        address.style.display = "none";
    }

}

// Shop functionality

$(document).ready(function () {

    const $itemsContainer = $('.items-container');

    if ($('.items-container')) {
        $.getJSON(ITEMS_URL, itemList => {
            $itemsContainer.html('');
            itemList.forEach((item, index) => {
                const { image, name, price, bought, condition } = item;

                $itemsContainer.append(`
        <div class="shop-items">
          <div class="card">
          <div class="new-product" data-target="${condition}"><span class="new-condition">New!</span></div>
            <img class="card-img-top" src="/assets/images/${image}1.png" onmouseover="this.src='/assets/images/${image}2.png';"
              onmouseout="this.src='/assets/images/${image}1.png';" data-target="${index}" alt="Card image cap">
            <div class="card-body">
              <p class="card-text">${name}</p>
              <div class="d-flex justify-content-between align-items-center bottom-bar">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary add-and-donate-btn add-to-cart-btn" data-target="${index}">Add to cart</button>
                </div>
                <strong class="price-color price-tag">${price},-</strong>
              </div>
            </div>
          </div>
        </div>
        <div id="shoe-modal" class="modal-background modal hide">
                <aside class="modal-shoe-content">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <h3 class="modal-name">${name}</h3>
                    <img class="modal-img" src="/assets/images/${image}1.png" alt="data-image">
                    <p class="modal-bought">Bought on</p>
                    <div class="condition"><p class="modal-condition"></p><span class="condition-new"></span></div>
                    <h4 class="modal-price"></h4>
                </aside>
            </div>
        `);

                if (itemList[index].condition == "New") {
                    let $newShoe = $('.new-product');
                    if ($newShoe[$newShoe.length - 1]) {
                        $newShoe[$newShoe.length - 1].style.display = "block";
                    }
                }

            });


            $addBtn = $('.add-to-cart-btn');
            $addBtn.click(function () {
                const itemIndex = $(this).attr('data-target');
                addToCart(itemList[itemIndex]);
            });

            $image = $('.card-img-top');
            $image.click(function () {
                const itemIndex = $(this).attr('data-target');
                openModal(itemList[itemIndex]);
            });
        });
    }
});

function openModal(item) {
    let itemModal = document.querySelector("#shoe-modal");
    let myBody = document.querySelector("body");
    myBody.classList.add("modal-open");
    itemModal.classList.remove("hide");
    itemModal.style.display = "block";
    let modalName = document.querySelector(".modal-name");
    let modalPic = document.querySelector(".modal-img");
    let modalBoughtAt = document.querySelector(".modal-bought");
    let modalCondition = document.querySelector(".modal-condition");
    let modalPrice = document.querySelector(".modal-price");
    modalName.textContent = item.name;
    modalPic.src = "/assets/images/" + item.image + "1.png";
    modalBoughtAt.textContent = "Bought on: " + item.bought;
    var starSymbol = String.fromCharCode(9733);
    var emptySymbol = String.fromCharCode(9734);
    modalCondition.textContent = "Condition: ";
    let conditionNew = document.querySelector(".condition-new");
    let ok = 0;
    for (i = 1; i <= 5; i++) {
        if (ok == 1) {
            modalCondition.textContent += emptySymbol;
        }
        if (ok == 0 && item.condition >= i) {
            modalCondition.style.display = "-webkit-inline-box";
            modalCondition.textContent += starSymbol;
            conditionNew.style.display = "none";
            if (item.condition == i) {
                ok = 1;
            }
        }
        if (item.condition == "New") {
            conditionNew.style.display = "-webkit-inline-box";
            conditionNew.textContent = "New!";
            modalCondition.style.display = "none";
        }
    }
    modalPrice.textContent = "Price: " + item.price + " kr";
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    const modal = document.querySelector("#shoe-modal");
    modal.classList.add("hide");
    let myBody = document.querySelector("body");
    myBody.classList.remove("modal-open");

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    let modal = document.querySelector("#shoe-modal");
    if (event.target == modal) {
        modal.classList.add("hide");
        let myBody = document.querySelector("body");
        myBody.classList.remove("modal-open");
    }
}

// When the user clicks Esc button, close the modal
document.onkeydown = function (evt) {
    evt = evt || window.event;
    let modal = document.querySelector("#shoe-modal");
    if (evt.keyCode == 27) {
        modal.classList.add("hide");
        let myBody = document.querySelector("body");
        myBody.classList.remove("modal-open");
    }
};

const ITEMS_URL = '../products.json';
const STORAGE_KEY = 'OVI_CART';

const JSONcart = localStorage.getItem(STORAGE_KEY);
const cart = JSONcart ? JSON.parse(JSONcart) : [];

const getCartSize = () => {
    const size = cart.reduce((previous, current) => {
        return previous + Number(current.quantity);
    }, 0);


    const $badge = $('.cart-badge');
    $badge.text(size);
    if (size > 0) {
        $badge.removeClass('d-none');
    } else {
        $badge.addClass('d-none');
    }

    return size;

};

const addToCart = item => {
    const itemIndex = cart.findIndex(
        _item => _item.id.toString() === item.id.toString()
    );

    if (itemIndex > -1) {
        const newQuantity = Number(cart[itemIndex].quantity) + 1;
        cart[itemIndex].quantity = newQuantity;
    } else {
        cart.push({
            id: item.id,
            item,
            quantity: 1
        });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    getCartSize();
};

const removeFromCart = (id, removeOne) => {
    const itemIndex = cart.findIndex(
        _item => _item.id.toString() === id.toString()
    );

    if (itemIndex > -1) {
        if (removeOne) {
            const newQuantity = Number(cart[itemIndex].quantity) - 1;
            if (newQuantity < 1) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = newQuantity;
            }
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    getCartSize();
    let cartSize = getCartSize();
    if (cartSize == 0) {
        let shoesTitle = document.querySelector(".shoes-title");
        let theTotal = document.querySelector(".the-total");
        let proceedBtn = document.querySelector(".proceed-btn");
        let footer = document.querySelector("footer");
        proceedBtn.style.display = "none";
        theTotal.style.display = "none";
        shoesTitle.textContent = "Your shop cart is empty";
        footer.style.position = "absolute";
        footer.style.bottom = "5px";
        footer.style.left = "5%";
    }

};

$(document).ready(function () {
    getCartSize();
    let cartSize = getCartSize();
    if (cartSize == 0) {
        let shoesTitle = document.querySelector(".shoes-title");
        let theTotal = document.querySelector(".the-total");
        let proceedBtn = document.querySelector(".proceed-btn");
        let footer = document.querySelector("footer");
        proceedBtn.style.display = "none";
        theTotal.style.display = "none";
        shoesTitle.textContent = "Your shop cart is empty";
        footer.style.position = "absolute";
        footer.style.bottom = "5px";
        footer.style.left = "5%";
    }
});

// Shopping cart
let ok = 0;
function renderCart() {
    const $itemsContainer = $('.cart-items-container');
    const $subtotal = $('#subtotal');
    const $tax = $('#tax');
    const $total = $('#total');

    let billSubtotal = 0;

    $itemsContainer.html('');
    cart.forEach(cartItem => {
        const {
            item: { image, name, price },
            id,
            quantity
        } = cartItem;

        const subtotal = Number(price.replace('.', '')) * quantity;
        billSubtotal += subtotal;

        $itemsContainer.append(`
      <div class="single-item">
        <img class="single-pic card-img-top cart-img" src="/assets/images/${image}1.png" style="width:200px;height:200px";>
        <div class="name-div">
          <strong >Product:</strong> ${name} 
        </div> <br><br>
        <div class="quantity-div">
          <strong>Quantity:</strong> ${quantity}
        </div> <br><br>
        <div class="price-div">
          <strong>Price:</strong> ${price} kr
        </div> <br><br>
        <div class="btn-group bar-bottom">
        <button class="add-remove plus-btn btn btn-sm btn-outline-secondary" data-target="${id}">+</button>
        <button class="add-remove minus-btn btn btn-sm btn-outline-secondary" data-target="${id}">-</button>
        <button class="add-remove remove-btn btn btn-sm btn-outline-secondary" data-target="${id}">Remove</button>
        </div>
      </div>
      `);
    });

    $plusBtn = $('.plus-btn');
    $minusBtn = $('.minus-btn');
    $removeBtn = $('.remove-btn');

    $plusBtn.click(function () {
        const id = $(this).attr('data-target');
        const item = cart.find(cartItem => cartItem.id.toString() === id.toString())
            .item;
        addToCart(item);
        renderCart();
    });

    $minusBtn.click(function () {
        const id = $(this).attr('data-target');
        removeFromCart(id, true);
        renderCart();
    });

    $removeBtn.click(function () {
        const id = $(this).attr('data-target');
        removeFromCart(id);
        renderCart();
    });

    const tax = parseInt((25 / 100) * billSubtotal);
    $subtotal.html(billSubtotal + ' kr');
    $tax.html(tax + ' kr');
    $total.html(Number(billSubtotal + tax) + ' kr');
}

$(document).ready(function () {
    getCartSize();
    renderCart();
});



