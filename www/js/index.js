document.addEventListener("DOMContentLoaded", () => {
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

    fetch("http://localhost:3000/categories")
        .then((res) => res.json())
        .then((data) => drawData(data));
});

// Remind: the fetch returns an array of objects

function addCategory(category_name) {
    fetch("http://localhost:3000/categories", {
        method: "POST",
        body: JSON.stringify({
            "name": category_name,
        }),
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch(() => console.log("Error"));
}
