let loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click", doModal);

function doModal() {
    let modal = document.querySelector("#loginModal");
    let body = document.querySelector("body");
    body.classList.add("modal-open");
    modal.classList.add("in");
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
const submitForm = document.querySelector(".login100-form-btn");

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    let formEmail = loginForm.elements.email.value;
    let formPassword = loginForm.elements.pass.value;
    if (submitForm.innerHTML === "Login") {
        checkLogin(formEmail, formPassword);
    }
    else {
        const myData = {
            email: formEmail,
            password: formPassword
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
                    let title = document.querySelector(".login100-form-title");
                    let loginButton = document.querySelector(".login100-form-btn");
                    let myText = document.querySelector(".txt1");
                    let signUp = document.querySelector(".sign-up");
                    let emailInput = document.querySelector(".myemail-input");
                    let passInput = document.querySelector(".mypassword-input");
                    let logButton = document.querySelector(".wrap-login100-form-btn");
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
                        loginButton.textContent = " Logout";
                        let myspan = document.querySelector(".glyphicon-log-in");
                        myspan.classList.remove("glyphicon-log-in");
                        myspan.classList.add("glyphicon-log-out");
                        ok = 2;
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
    let loginButton = document.querySelector("#login-button");
    let signUp = document.querySelector(".sign-up");
    loginButton.addEventListener("click", doLogin);
    signUp.addEventListener("click", doSignUp);

}

function doLogin() {
    let loginButton = document.querySelector(".login-logout");
    if (loginButton.textContent == " Logout") {
        loginButton.textContent = "Login";
        let myspan = document.querySelector(".glyphicon-log-out");
        myspan.classList.remove("glyphicon-log-out");
        myspan.classList.add("glyphicon-log-in");
    }
}

function doSignUp() {
    let modal = document.querySelector("#loginModal");
    let emailInput = document.querySelector(".myemail-input");
    let passInput = document.querySelector(".mypassword-input");
    let logButton = document.querySelector(".wrap-login100-form-btn");
    logButton.style.display = "block";
    emailInput.style.display = "block";
    passInput.style.display = "block";
    if (modal.dataset.test == "login") {
        modal.dataset.test = "singUp";
        let title = document.querySelector(".login100-form-title");
        let loginButton = document.querySelector(".login100-form-btn");
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

    }
    else {
        modal.dataset.test = "login";
        let title = document.querySelector(".login100-form-title");
        let loginButton = document.querySelector(".login100-form-btn");
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
    }

}

