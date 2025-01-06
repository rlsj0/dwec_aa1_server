let siteInput;
let urlInput;
let userInput;
let passwordInput;
let descriptionInput;
let button;

document.addEventListener("DOMContentLoaded", () => {
    // Declare variables
    siteInput = document.getElementById("site-name");
    urlInput = document.getElementById("url-site");
    userInput = document.getElementById("user-site");
    passwordInput = document.getElementById("password-site");
    button = document.getElementById("saveButton");
    descriptionInput = document.getElementById("description-site");
    // Hidden input: set value to category id
    const urlParameters = window.location.search;
    let params = new URLSearchParams(urlParameters);
    const categoryID = params.get("id");
    let hidden = document.getElementById("category-id");
    hidden.value = categoryID;
});

// Called from add-site.html
function verifyForm() {
    if (
        siteInput.value != "" &&
        urlInput.value != "" && userInput.value != "" &&
        passwordInput.value != ""
    ) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

// Called from add-site.html
function addSite() {
    // Add site name and description
    siteName = siteInput.value;
    url = urlInput.value;
    user = userInput.value;
    password = passwordInput.value;
    description = descriptionInput.value;
    categoryID = document.getElementById("category-id").value;
    console.log(siteName);
    console.log(url);
    console.log(user);
    console.log(password);
    console.log(description);

    let fetchUrl = "http://localhost:3000/categories/" + categoryID;
    fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify({
            "name": siteName,
            "url": url,
            "user": user,
            "password": password,
            "description": description,
        }),
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch(() => console.log("Error"));

    // Clean the input fields to prevent double submit
    cleanInput();
}

function cleanInput() {
    siteInput.value = "";
    userInput.value = "";
    urlInput.value = "";
    passwordInput.value = "";
    descriptionInput.value = "";
}
