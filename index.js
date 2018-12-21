/*==================================================================
[ Initializing function is called ]*/
init();

/*==================================================================
[ When window is scrolled: show scroll to top button ]*/
window.onscroll = function () { showScroll() };

/*==================================================================
[ Initialize function ]*/
function init() {
    doLogin();
    /*==================================================================
    [ Set time for dashboard ]*/
    if (document.querySelector(".real-time")) {

        function getTime() {
            //Arrays for weekdays and months
            let weekArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            //Get the html elements where we are going to add the date and the time
            let realDay = document.querySelector(".real-day");
            let realTime = document.querySelector(".real-time");

            //Creating the elements in the fornmat we need
            let theNewDay;
            let theNewTime;

            //Generate the actual date and make it a string in order to be procesed later on
            let date = new Date;
            let today = date.toString();

            //Getting hours and minutes
            let hourNow = date.getHours();
            let minutesNow = date.getMinutes();


            //Setting the clock for AM
            if (hourNow > 12) {

                theNewTime = hourNow;

                //Adding 0 for minutes under 10 ( 5 -> 05)
                if (minutesNow < 10) {
                    minutesNow = "0" + minutesNow;
                }

                //Creating the final format for the time
                theNewTime = theNewTime + ":" + minutesNow + " " + "PM";
            }
            //Setting the clock for PM
            else {
                theNewTime = hourNow;

                //Adding 0 for minutes under 10 ( 5 -> 05)
                if (minutesNow < 10) {
                    minutesNow = "0" + minutesNow;
                }

                //Creating the final format for the time
                theNewTime = theNewTime + "." + minutesNow + " " + "AM";
            }

            realTime.textContent = theNewTime;

            //Getting the first 3 letters from the day of the week
            let weekDay = today.slice(0, 3);


            //Getting the full name of the day of the week we need
            for (let i = 0; i < weekArray.length; i++) {
                let sliceDay = weekArray[i].slice(0, 3);
                if (sliceDay == weekDay) {

                    //Set the day we need
                    theNewDay = weekArray[i];


                }
            }

            //Adding the day and the number ending letters for the day  
            if (today.slice(8, 10) == "01" || today.slice(8, 10) == "21" || today.slice(8, 10) == "31") {
                theNewDay = theNewDay + " " + "1st";
            }
            else if (today.slice(8, 10) == "02" || today.slice(8, 10) == "22") {
                theNewDay = theNewDay + " " + "2nd";
            }
            else if (today.slice(8, 10) == "03" || today.slice(8, 10) == "23") {
                theNewDay = theNewDay + " " + "3rd";
            }
            //Modifying dates like 04, 05 to be 4th and 5th
            else if (today.slice(8, 9) == "0") {
                theNewDay = theNewDay + " " + today.slice(9, 10) + "th";
            }
            //All the dates from 10-31 will get th at the end
            else {
                theNewDay = theNewDay + " " + today.slice(8, 10) + "th";
            }
            //Adding month and year
            let actualMonth = monthArray[date.getMonth()];
            let actualYear = date.getFullYear();
            theNewDay = theNewDay + " " + actualMonth + " " + actualYear;
            //Adding the final created format to the website paragraph
            realDay.textContent = theNewDay;

        }
        //Looping the function every 0.9 second
        setInterval(getTime, 900);

    }
    /*==================================================================
    [ Checking if it's the administrator logging in ]*/
    if (localStorage.getItem("user-email") == "admin@admin.dk") {
        showAdministratorData();
    }
    document.querySelector("#backToTopBtn").addEventListener("click", getToTop);
    let loginButton = document.querySelector("#login-button");
    let signUp = document.querySelector(".sign-up");
    loginButton.addEventListener("click", doLoginLogout);
    signUp.addEventListener("click", doSignUp);
    const proceedBtn = document.querySelector(".proceed-btn");
    if (proceedBtn) {
        proceedBtn.addEventListener("click", payAndUpdateBonuses);
    }
    /*==================================================================
    [ Shoes your bonuses when logged in ]*/
    let shoesPageTitle = document.querySelector(".shoes-subtitle");

    if (shoesPageTitle) {

        if (parseInt(localStorage.getItem("user-bonusCode")) > 0) {
            shoesPageTitle.innerHTML += " <br />";
            shoesPageTitle.innerHTML += "You have " + localStorage.getItem("user-bonusCode") + " bonus codes available";
            shoesPageTitle.style.color = "#2ECC40";
        }
        else {
            shoesPageTitle.innerHTML += " <br />";
            shoesPageTitle.innerHTML += "You have no bonus codes available";
            shoesPageTitle.style.color = "#a94442";
        }
    }


}

/*==================================================================
[ Login buttons ]*/
let loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click", doModal);

/*==================================================================
[ Sign up from sign up button home ]*/
let signUpSpan = document.querySelector(".sign-up-home");
if (signUpSpan) {
    signUpSpan.addEventListener("click", doModal);
}

/*==================================================================
[ Show modal ]*/
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

/*==================================================================
[ Submit form buttons ]*/
const loginForm = document.querySelector(".login100-form");
const submitForm = document.querySelector(".my-login-form-button");
const donateForm = document.querySelector("#donate-form");
const submitDonateForm = document.querySelector(".submit-donate-button");

/*==================================================================
[ Show Dashboard Content ]*/
function showAdministratorData() {
    const totalUsers = document.querySelector(".total-users");
    const averageShoesUser = document.querySelector(".average-shoes-user");

    if (totalUsers) {

        fetch("https://5bdffe29f2ef840013994a15.mockapi.io/users")
            .then(res => res.json())
            .then(function (data) {
                totalUsers.textContent = data.length;
                let totalOfShoes = 0;
                for (let i = 0; i < data.length; i++) {
                    let number = parseInt(data[i].bonusCode);
                    totalOfShoes += number;
                }
                averageShoesUser.textContent = Math.round(totalOfShoes / data.length * 100) / 100;
            }
            );
    }

    const totalDonations = document.querySelector(".total-donations");
    const totalShoesDonated = document.querySelector(".total-shoes-donated");
    const averageShoesDonation = document.querySelector(".average-shoes-donation");



    if (totalDonations) {

        fetch("https://5bdffe29f2ef840013994a15.mockapi.io/orders")
            .then(res => res.json())
            .then(function (data) {
                totalDonations.textContent = data.length;
                let totalShoes = 0;
                for (let i = 0; i < data.length; i++) {
                    let number = parseInt(data[i].pairs);
                    totalShoes += number;

                }
                /*==================================================================
                [ List all the orders ]*/
                if (document.querySelectorAll(".donation").length < data.length) {
                    for (let j = 0; j < data.length; j++) {
                        const donationsContainer = document.querySelector(".donations-list");
                        const donationsTemplate = document.querySelector("#donations-template").content;
                        let clone = donationsTemplate.cloneNode(true);
                        clone.querySelector(".reference-number").textContent = "Reference number: #" + data[j].id;
                        clone.querySelector(".customer-name").textContent = "Donor name: " + data[j].firstName + " " + data[j].lastName;
                        clone.querySelector(".donated-pairs").textContent = "Donated pairs of shoes: " + data[j].pairs;
                        clone.querySelector(".pick-up-week").textContent = "Pick-up: " + data[j].week;
                        clone.querySelector(".pick-up-time").textContent = "Pick-up time: " + data[j].hour;
                        clone.querySelector(".customer-email").textContent = "Donor email: " + data[j].email;
                        clone.querySelector(".customer-phone").textContent = "Donor phone: " + data[j].phone;
                        clone.querySelector(".customer-address").textContent = "Donor address: " + data[j].address;
                        clone.querySelector(".customer-message").textContent = "Donor message: " + data[j].message;
                        donationsContainer.appendChild(clone);
                    }
                }
                totalShoesDonated.textContent = totalShoes;
                averageShoesDonation.textContent = Math.round(totalShoes / data.length * 100) / 100;
            }
            );
    }

    const moneyIncome = document.querySelector(".money-income");
    const totalPurchases = document.querySelector(".total-purchases");
    const averageIncomePurchase = document.querySelector(".average-income-purchase");
    const bonusCodesUsed = document.querySelector(".bonus-codes-used");
    const totalDiscountsCash = document.querySelector(".total-discounts-used");

    if (moneyIncome) {
        fetch("https://5bdffe29f2ef840013994a15.mockapi.io/money")
            .then(res => res.json())
            .then(function (data) {
                let myTotalIncome = 0;
                let totalBonusCodesUsed = 0;
                for (let i = 0; i < data.length; i++) {
                    let number = parseInt(data[i].paid);
                    myTotalIncome += number;
                    let numberCodes = parseInt(data[i].bonusCodesUsed);
                    totalBonusCodesUsed += numberCodes;
                }
                moneyIncome.textContent = myTotalIncome + ",-";
                averageIncomePurchase.textContent = Math.round(myTotalIncome / data.length) + ",-";
                totalPurchases.textContent = data.length;
                bonusCodesUsed.textContent = totalBonusCodesUsed;
                totalDiscountsCash.textContent = totalBonusCodesUsed * 20 + ",-";
            }
            );
    }

    const shoesOnSell = document.querySelector(".shoes-on-sell");
    const newShoesSell = document.querySelector(".new-shoes-sell");
    const oldShoesSell = document.querySelector(".old-shoes-sell");

    if (shoesOnSell) {
        fetch("https://5bdffe29f2ef840013994a15.mockapi.io/products")
            .then(res => res.json())
            .then(function (data) {
                shoesOnSell.textContent = data.length;
                let myNewShoes = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].condition == "New") {
                        myNewShoes++;
                    }
                    newShoesSell.textContent = myNewShoes;
                    oldShoesSell.textContent = data.length - myNewShoes;
                }
            }
            );
    }
}
setInterval(showAdministratorData, 3000);

/*==================================================================
[ After payment effects (proceed to payment button), updating database or show errors ]*/
function payAndUpdateBonuses() {
    let selectBonusCodes = document.querySelector(".select-bonus-codes");
    let yourBonuses = localStorage.getItem("user-bonusCode");
    let selectedBonusesNumber = parseInt(selectBonusCodes.value);
    let yourBonusesNumber = parseInt(yourBonuses);

    if (selectedBonusesNumber <= yourBonusesNumber) {
        let newBonusCodes = yourBonusesNumber - selectedBonusesNumber;
        localStorage.setItem("user-bonusCode", newBonusCodes);

        let userID = localStorage.getItem("user-id");

        const payLoad = {
            bonusCode: newBonusCodes
        };

        const postData = JSON.stringify(payLoad);
        fetch(`https://5bdffe29f2ef840013994a15.mockapi.io/users/${userID}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: postData
        })
            .then(res => res.json())
            .then(d => {

            });

        window.location.href = "https://paypal.me/stepaheadk";

        let totalNumber = document.querySelector("#total");
        totalNumber = parseInt(totalNumber.textContent);

        const yourIncome = {
            paid: totalNumber,
            bonusCodesUsed: selectedBonusesNumber
        };

        fetch("https://5bdffe29f2ef840013994a15.mockapi.io/money/", {
            method: "post",
            body: JSON.stringify(yourIncome),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(d => {

            });



    }
    else {

        document.querySelector(".myAlert").style.display = "block";
        setTimeout(function () {
            document.querySelector(".myAlert").style.display = "none";
        }, 5000);
    }



}

/*==================================================================
[ Push bonus codes for existing user after donation ]*/
function pushBonuses(bonuses, userId) {

    let totalBonuses = parseInt(bonuses);
    let actualBonuses = parseInt(localStorage.getItem("user-bonusCode"));
    totalBonuses = totalBonuses + actualBonuses;
    localStorage.setItem("user-bonusCode", totalBonuses);
    const payLoad = {
        bonusCode: totalBonuses
    };

    const postData = JSON.stringify(payLoad);
    fetch(`https://5bdffe29f2ef840013994a15.mockapi.io/users/${userId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: postData
    })
        .then(res => res.json())
        .then(d => {

        });
    document.querySelector(".myAlert").style.display = "block";
    document.querySelector("#donate-form").reset();
    setTimeout(function () {
        document.querySelector(".myAlert").style.display = "none";
    }, 5000);
}

/*==================================================================
[ Add new donation for existing user in orders(database) ]*/
function addOrder(firstname, lastname, shoePairs, selectedTime, selectedWeek, formMessage) {
    let formEmail = localStorage.getItem("user-email");
    let formPhone = localStorage.getItem("user-phone");
    let formAddress = localStorage.getItem("user-address");
    const myData = {
        firstName: firstname,
        lastName: lastname,
        pairs: shoePairs,
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


            }
        });


}

/*==================================================================
[ Handling donate form on submit ]*/
if (donateForm) {

    donateForm.addEventListener("submit", e => {
        e.preventDefault();
        let firstName = donateForm.elements.firstname.value;
        let lastName = donateForm.elements.lastname.value;
        let formShoePairs = donateForm.elements.shoes_number.value;
        let selectedWeek = donateForm.elements.week.value;
        let selectedTime = donateForm.elements.time.value;
        let formMessage = donateForm.elements.message.value;
        let userID = localStorage.getItem("user-id");

        /*==================================================================
        [ Submiting existing user ]*/
        if (submitDonateForm.innerHTML == "Get your bonus") {
            donateForm.elements.email.value = localStorage.getItem("user-email");
            pushBonuses(formShoePairs, userID);
            addOrder(firstName, lastName, formShoePairs, selectedTime, selectedWeek, formMessage);
        }
        /*==================================================================
        [ Submiting non-existing user ]*/
        else {
            let formEmail = donateForm.elements.email.value;
            let formPhone = donateForm.elements.phone.value;
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

/*==================================================================
[ Handling login form ]*/
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    let formEmail = loginForm.elements.email.value;
    let formPassword = loginForm.elements.pass.value;
    let formAddress = loginForm.elements.address.value;
    let formPhone = loginForm.elements.phone.value;
    let myphone = document.querySelector(".phone-input");
    let email = document.querySelector(".email-input");
    /*==================================================================
    [ Submiting login form when button is named login ]*/
    if (submitForm.innerHTML === "Login") {
        checkLogin(formEmail, formPassword);
    }
    /*==================================================================
    [ Submiting login form when button is named sign up (send new user to database) ]*/
    else {
        const myData = {
            email: formEmail,
            password: formPassword,
            phone: formPhone,
            address: formAddress,
            bonusCode: 0
        }

        fetch("https://5bdffe29f2ef840013994a15.mockapi.io/users")
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
                    fetch("https://5bdffe29f2ef840013994a15.mockapi.io/users/", {
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

/*==================================================================
[ Checking if the user who is logging in has an account ]*/
function checkLogin(email, password) {
    const payLoad = {
        email: email,
        password: password
    };

    fetch("https://5bdffe29f2ef840013994a15.mockapi.io/users")
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
                        if (modalBackground) {
                            modalBackground.remove();
                        }
                        body.classList.remove("modal-open");
                        let loginButton = document.querySelector(".login-logout");
                        loginButton.textContent = "Logout";
                        let myspan = document.querySelector(".glyphicon-log-in");
                        myspan.classList.remove("glyphicon-log-in");
                        myspan.classList.add("glyphicon-log-out");
                        ok = 2;
                        /*==================================================================
                        [ Checking if it's the administrator logging in ]*/
                        if (data[i].email.toLowerCase() == "admin@admin.dk" && data[i].password == "admin") {
                            let dashboard = document.querySelector("#dashboard-button");
                            dashboard.style.display = "block";
                            localStorage.setItem("dashboard", "true");
                            showAdministratorData();
                        }
                        else {
                            localStorage.setItem("dashboard", "false");
                        }
                        /*==================================================================
                        [ Setting local storage in order to keep user logged in on all the pages ]*/
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
                        if (document.querySelector(".your-bonus-codes")) {
                            document.querySelector(".your-bonus-codes").style.display = "block";
                        }
                        if (document.querySelector(".shoes-subtitle")) {
                            document.querySelector(".shoes-subtitle").style.display = "block";
                        }

                    }
                }
            }
            /*==================================================================
            [ Password is wrong ]*/
            if (ok == 1) {
                let password = document.querySelector(".password-input");
                showValidate(password);
            }

            /*==================================================================
            [ User is wrong or incorect ]*/
            if (ok == 0) {
                let email = document.querySelector(".email-input");
                showValidate(email);
            }

        })

}

/*==================================================================
[ Show scroll when scrolling down ]*/
function showScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

/*==================================================================
[ Get tot the top of document ]*/
function getToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/*==================================================================
[ Get the border for odd items in the cart ]*/
function checkingCart() {
    let cartShoes = document.querySelectorAll(".single-item");
    if (cartShoes.length > 2 && cartShoes.length % 2 == 1) {
        cartShoes[cartShoes.length - 2].style.cssText = "border-bottom: 2px solid green";
    }

}

/*==================================================================
[ Login button in nav bar is changing to logout ]*/
function doLogin() {
    let myLoginButton = document.querySelector(".login-logout");
    if (localStorage.getItem("logout") == "Logout") {
        myLoginButton.textContent = localStorage.getItem("logout");
        let myspan = document.querySelector(".glyphicon-log-in");
        myspan.classList.remove("glyphicon-log-in");
        myspan.classList.add("glyphicon-log-out");
        if (document.querySelector(".your-bonus-codes")) {
            document.querySelector(".your-bonus-codes").style.display = "block";
        }
        if (document.querySelector(".shoes-subtitle")) {
            document.querySelector(".shoes-subtitle").style.display = "block";
        }

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


}

/*==================================================================
[ Login button in nav bar is changing to login ]*/
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
        if (document.querySelector(".your-bonus-codes")) {
            document.querySelector(".your-bonus-codes").style.display = "none";
            renderCart();
        }
        if (document.querySelector(".shoes-subtitle")) {
            document.querySelector(".shoes-subtitle").style.display = "none";

        }
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

/*==================================================================
[ Change from login form to sign up form / from sign up to login form ]*/
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

/*==================================================================
[ Open modal for particular item when click on it (shoes page) ]*/
function openModal(item) {
    let itemModal = document.querySelector("#shoe-modal");
    let myBody = document.querySelector("body");
    myBody.classList.add("modal-open");
    itemModal.classList.remove("hide");
    itemModal.style.display = "block";
    let modalName = document.querySelector(".modal-name");
    let modalPic = document.querySelector(".modal-img");
    let modalBoughtAt = document.querySelector(".modal-bought");
    let modalSize = document.querySelector(".modal-size");
    let modalCondition = document.querySelector(".modal-condition");
    let modalPrice = document.querySelector(".modal-price");
    modalName.textContent = item.name;
    modalPic.src = "/assets/images/" + item.image + "1.png";
    modalBoughtAt.textContent = "Bought on: " + item.bought;
    modalSize.textContent = "Size: " + item.size;
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
            modalBoughtAt.textContent = "Model from: " + item.bought;
        }
    }
    modalPrice.textContent = "Price: " + item.price + " kr";
}

/*==================================================================
[ Close the modal when the user clicks on <span> (x) ]*/
function closeModal() {
    const modal = document.querySelector("#shoe-modal");
    modal.classList.add("hide");
    let myBody = document.querySelector("body");
    myBody.classList.remove("modal-open");

}

/*==================================================================
[ Close modal when user click anywhere outside of the modal ]*/
window.onclick = function (event) {
    let modal = document.querySelector("#shoe-modal");
    if (event.target == modal) {
        modal.classList.add("hide");
        let myBody = document.querySelector("body");
        myBody.classList.remove("modal-open");
    }
}

/*==================================================================
[ Close modal when user press ESC button ]*/
document.onkeydown = function (evt) {
    evt = evt || window.event;
    let modal = document.querySelector("#shoe-modal");
    if (evt.keyCode == 27) {
        modal.classList.add("hide");
        let myBody = document.querySelector("body");
        myBody.classList.remove("modal-open");
    }
};

/*==================================================================
[ Getting endpoint and setting the local storage for items in cart ]*/
const ITEMS_URL = 'https://5bdffe29f2ef840013994a15.mockapi.io/products';
const STORAGE_KEY = 'OVI_CART';

const JSONcart = localStorage.getItem(STORAGE_KEY);
const cart = JSONcart ? JSON.parse(JSONcart) : [];

/*==================================================================
[ Getting the cart-size ]*/
const getCartSize = () => {
    const size = cart.reduce((previous, current) => {
        return previous + Number(current.quantity);
    }, 0);

    /*==================================================================
    [ Handling cart badge ]*/
    const $badge = $('.cart-badge');
    $badge.text(size);
    if (size > 0) {
        $badge.removeClass('d-none');
    } else {
        $badge.addClass('d-none');
    }

    return size;

};

/*==================================================================
[ Add to cart ]*/
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
    /*==================================================================
    [ Show item added alert on shoes page ]*/
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    if (document.querySelector(".myAlertShoes")) {
        document.querySelector(".myAlertShoes").style.display = "block";
        setTimeout(function () {
            document.querySelector(".myAlertShoes").style.display = "none";
        }, 5000);
    }
    getCartSize();
    checkingCart();

};

/*==================================================================
[ Remove from the cart ]*/
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
    /*==================================================================
    [ Show cart is empty if there is nothing in cart ]*/
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

/*==================================================================
[ Handling shopping cart ]*/
let ok = 0;
function renderCart() {
    const $itemsContainer = $('.cart-items-container');
    const $subtotal = $('#subtotal');
    const $yourDeduction = $('#yourDeduction');
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
        <button class="add-remove plus-btn btn btn-sm btn-outline-secondary add-one-more" data-target="${id}">+</button>
        <button class="add-remove minus-btn btn btn-sm btn-outline-secondary" data-target="${id}">-</button>
        <button class="add-remove remove-btn btn btn-sm btn-outline-secondary" data-target="${id}">Remove</button>
        </div>
      </div>
      `);
    });

    $plusBtn = $('.plus-btn');
    $minusBtn = $('.minus-btn');
    $removeBtn = $('.remove-btn');

    /*==================================================================
    [ Update cart if bonus codes are changed ]*/
    $(".select-bonus-codes").change(function () {
        renderCart();
    });


    /*==================================================================
    [ Increase quantity for one item and check cart ]*/
    $plusBtn.click(function () {
        const id = $(this).attr('data-target');
        const item = cart.find(cartItem => cartItem.id.toString() === id.toString())
            .item;
        addToCart(item);
        renderCart();
    });

    /*==================================================================
    [ Decrease quantity for one item and check cart ]*/
    $minusBtn.click(function () {
        const id = $(this).attr('data-target');
        removeFromCart(id, true);
        renderCart();
    });

    /*==================================================================
    [ Remove item from cart ]*/
    $removeBtn.click(function () {
        const id = $(this).attr('data-target');
        removeFromCart(id);
        renderCart();
    });

    /*==================================================================
    [ Handle the total and calculate the discounts ]*/
    let bonusCodes = document.querySelector("#bonus_codes_added");
    let yourDeduction = parseInt(bonusCodes.value) * 20;
    if (document.querySelector(".your-bonus-codes").style.display == "none") {
        yourDeduction = 0;
    }
    $subtotal.html(billSubtotal + ' kr');
    $yourDeduction.html(yourDeduction + ' kr');
    $total.html(Number(billSubtotal - yourDeduction) + ' kr');
}



$(document).ready(function () {

    /*==================================================================
    [ Shop functionality ]*/
    const $itemsContainer = $('.items-container');

    if ($('.items-container')) {
        $.getJSON(ITEMS_URL, itemList => {
            $itemsContainer.html('');
            itemList.forEach((item, index) => {
                const { image, name, price, bought, condition, size } = item;

                if (itemList[index].stock > 0) {

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
                    <p class="modal-size">Size</p>
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

    /*==================================================================
    [ Show cart is empty if there is nothing in cart ]*/
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

    getCartSize();
    renderCart();
    checkingCart();

    /*=========================================================================
    [ Animate the button and then call it self on completing the animation ]*/
    function pulse() {
        /*=========================================================================
        [ Only when user on top of the page the the button will animate ]*/
        if ($(window).scrollTop() <= 0) {
            $('.storage-scroll').delay(200).fadeOut('slow').delay(50).fadeIn('slow', pulse);
        }
        else {
        }
    }
    /*=========================================================================
    [ When document is ready, trigger the animation ]*/
    pulse();

    $('#storage-room-section').scroll(function () {
        if ($(this).scrollTop() > 0) {
            /*=========================================================================
            [ Stop tha animation ]*/
            $('.storage-scroll').clearQueue();
            // This will hide the bar
            $('.storage-scroll').fadeOut("fast");
        } else {
            /*=========================================================================
            [ Restart the animation ]*/
            pulse();
        }
    });

});