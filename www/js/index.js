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
        let secondCol = document.createElement("td");
        tableh.setAttribute("scope", "row");
        let category_button = document.createElement("button");
        category_button.setAttribute("class", "btn w-100");
        category_button.setAttribute(
            "onClick",
            "fetchSites(" + category["id"] + ")",
        );
        category_button.innerText = category.name;
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "btn btn-danger");
        let deleteFunction = "deleteCategory(" + category["id"] + ")";
        deleteButton.setAttribute("onClick", deleteFunction);
        deleteButton.innerText = "x";

        tableh.appendChild(category_button);
        secondCol.appendChild(deleteButton);
        tablerow.appendChild(tableh);
        tablerow.appendChild(secondCol);
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
    reloadTable();
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
            } else {
                reloadTable();
            }
        })
        .catch((error) => console.log("Not deleted: " + error));
}

function cleanCategoryTable() {
    let table = document.getElementById("category-table");
    table.innerHTML = "";
}

function reloadTable() {
    cleanCategoryTable();
    fetch("http://localhost:3000/categories")
        .then((res) => res.json())
        .then((data) => drawData(data));
}

function fetchSites(categoryID) {
    categoryUrl = "http://localhost:3000/categories/" + categoryID;
    fetch(categoryUrl)
        .then((res) => res.json())
        .then((data) => drawSites(data));
}

function drawSites(sitesData) {
    document.getElementById("sites-table").innerHTML = "";
    changeAddSiteButton(sitesData["id"]);
    sitesArray = sitesData["sites"];
    sitesArray.forEach((site) => {
        // Create tr
        let parent = document.getElementById("sites-table");
        let siteRow = document.createElement("tr");
        // Create site th
        let siteColumn = document.createElement("th");
        siteColumn.setAttribute("scope", "row");
        siteColumn.innerText = site["name"];
        // Create user td
        let userColumn = document.createElement("td");
        userColumn.innerText = site["user"];
        // Create date td
        let dateColumn = document.createElement("td");
        // Get date: first 10 digits, or until T
        let rawDate = site["updatedAt"];
        dateText = rawDate.slice(0, 10);
        dateColumn.innerText = dateText;
        // Create actions td
        let actionsColumn = document.createElement("td");
        // Create link to go
        let link = document.createElement("a");
        link.setAttribute("class", "btn btn-primary pt-1 pb-1 ps-2 pe-2 m-1");
        link.setAttribute("href", site["url"]);
        link.setAttribute("target", "_blank");
        link.innerText = "Go";
        // Create button to del
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute(
            "class",
            "btn btn-danger pt-1 pb-1 ps-2 pe-2 m-1",
        );
        deleteButton.setAttribute(
            "onClick",
            "deleteSite(" + site["id"] + ", " + sitesData["id"] + ")",
        );
        deleteButton.innerText = "X";
        // Create link to edit
        let editButton = document.createElement("button");
        editButton.setAttribute(
            "class",
            "btn btn-success pt-1 pb-1 ps-2 pe-2 m-1",
        );
        editButton.innerText = "Ed";

        //Append buttons
        actionsColumn.appendChild(link);
        actionsColumn.appendChild(deleteButton);
        actionsColumn.appendChild(editButton);

        // Append every column
        siteRow.appendChild(siteColumn);
        siteRow.appendChild(userColumn);
        siteRow.appendChild(dateColumn);
        siteRow.appendChild(actionsColumn);
        parent.appendChild(siteRow);
    });
}

//                <tr>
//                  <th scope="row">Facebook</th>
//                  <td>john-johnson</td>
//                  <td>20/12/2024</td>
//                  <td>
//                    <button class="btn btn-primary pt-1 pb-1"> Go
//                    </button>
//                    <button class="btn btn-danger pt-1 pb-1"> Del
//                    </button>
//                    <button class="btn btn-success pt-1 pb-1"> Ed
//                    </button>
//                  </td>
//                </tr>

function changeAddSiteButton(categoryID) {
    let button = document.getElementById("addSiteButton");
    button.setAttribute("href", "add-site.html?id=" + categoryID + "&");
}

function deleteSite(siteID, categoryID) {
    fetchUrl = "http://localhost:3000/sites/" + siteID;
    fetch(fetchUrl, {
        method: "DELETE",
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            } else {
                // Clean and reload
                document.getElementById("sites-table").innerHTML = "";
                fetchSites(categoryID);
            }
        })
        .catch((error) => console.log("Not deleted: " + error));
}
