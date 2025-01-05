document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/categories")
        .then((res) => res.json())
        .then((data) => drawData(data));
});

let drawData = (data) => {
    data.forEach((category) => {
        let parent = document.getElementById("category-table");
        let tablerow = document.createElement("tr");
        let tableh = document.createElement("th");
        tableh.setAttribute("scope", "row");
        let category_button = document.createElement("button");
        category_button.setAttribute("class", "btn");

        // child.innerText = JSON.stringify(category)
        category_button.innerText = category.name;
        tableh.appendChild(category_button);
        tablerow.appendChild(tableh);
        parent.appendChild(tablerow);
    });
};
// Remind: the fetch returns an array of objects

function addCategory() {
    let categoryName = document.getElementById("category-name").value;
    fetch("http://localhost:3000/categories", {
        method: "POST",
        body: JSON.stringify({
            "name": categoryName,
        }),
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch(() => console.log("Error"));

    // Reload the DOM
    fetch("http://localhost:3000/categories")
        .then((res) => res.json())
        .then((data) => drawData(data));
}

// Disable/enable button to add category when empty/filled
// The event listener is in the index.html because it
// interfered with the bootstrap javascript
function checkCategorySubmit() {
    if (document.forms["category"]["category-name"].value != "") {
        document.forms["category"]["addCategoryBtn"].disabled = false;
    } else {
        document.forms["category"]["addCategoryBtn"].disabled = true;
    }
}

function deleteCategory(categoryID) {
    let categoryUrl = "http://localhost:3000/categories/" + categoryID;

    // TODO: error handling (the backend fails when trying to delete
    // a category with a non-existing id).

    fetch(categoryUrl, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    })
        // As the possible error is not rejected by fetch, I have to check it manually
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        })
        .catch((error) => console.log("Not deleted: " + error));
}
