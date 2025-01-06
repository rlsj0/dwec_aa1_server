document.addEventListener("DOMContentLoaded", () => {
    // Hidden input: set value to category id
    const urlParameters = window.location.search;
    let params = new URLSearchParams(urlParameters);
    const categoryID = params.get("id");
    let hidden = document.getElementById("category-id");
    hidden.value = categoryID;
});

// Add invisible input with the category id.
