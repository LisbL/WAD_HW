document.getElementById("signup-form").addEventListener("submit", function(event) {
    const pwd = document.getElementById("password").value;
    const errors = [];

    //conditions
    if (pwd.length < 8 || pwd.length > 15) {
        errors.push("The password must be between 8 and 15 characters");
    }
    if (!/^[A-Z]/.test(pwd)) {
        errors.push("It should start with an uppercase alphabet");
    }
    if (!/[A-Z]/.test(pwd)) {
        errors.push("Includes at least one uppercase alphabet character");
    }
    if ((pwd.match(/[a-z]/g) || []).length < 2) {
        errors.push("Includes at least two lowercase alphabet characters");
    }
    if (!/[0-9]/.test(pwd)) {
        errors.push("Includes at least one numeric value");
    }
    if (!/_/.test(pwd)) {
        errors.push("It should include the character '_'");
    }

    if (errors.length > 0) {
        event.preventDefault();
        document.getElementById("error-message").innerHTML =
            "The password is not valid:<br><br> " + errors.join("<br> ");
    }
});
