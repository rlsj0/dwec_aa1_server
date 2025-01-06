let urlInput;
let userInput;
let passwordInput;
let button;

document.addEventListener("DOMContentLoaded", () => {
    // Declare variables
    urlInput = document.getElementById("url-site");
    userInput = document.getElementById("user-site");
    passwordInput = document.getElementById("password-site");
    button = document.getElementById("saveButton");
    // Hidden input: set value to category id
    const urlParameters = window.location.search;
    let params = new URLSearchParams(urlParameters);
    const categoryID = params.get("id");
    let hidden = document.getElementById("category-id");
    hidden.value = categoryID;
});

function verifyForm() {
    if (
        urlInput.value != "" && userInput.value != "" &&
        passwordInput.value != ""
    ) {
        button.disabled = false;
    }
}
