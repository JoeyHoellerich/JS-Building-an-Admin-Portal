// my npm start doesn't really work right, so I'm not able to connect to the localhost and test my code out

async function adminStart(){
    // request a list of books from website (returns JSON object)
    let listBooks = await fetch("http://localhost:3001/listBooks", {
        method: "GET"
    })

    // convert JSON to array of books
    let bookArray = await listBooks.json();

    // create list container (ol);
    let bookList = document.createElement("ol");
    bookList.setAttribute("id", "bookList")

    // add empty list to body
    document.body.append(bookList);

    // define function that displays books to admin. Book is an object from API
    function showBooks(book){
        // grab the list of books
        let bookBox = document.querySelector("#bookList");

        // create new list element (for storing title)
        let bookLi = document.createElement("li");

        // add book title to bookLi
        bookLi.innerHTML = book.title;

        // add input field 
        let textInput = document.createElement("input");
        // set the type of input to number
        textInput.setAttribute("type", "number");
        textInput.setAttribute("name", book.id);

        //create new button
        let saveBtn = document.createElement("button");
        //set id of button to match the id of the book
        saveBtn.setAttribute("id", book.id);
        saveBtn.innerHTML = "Save";
        // set the onClick attribute to run the function replace with the selected id
        saveBtn.setAttribute("onClick", "replaceQty(this.id)");

        // append bookLi to bookList
        bookBox.append(bookLi);
    }

    // iterate through arry of books
    listBooks.forEach((book) => {
        // for each item in the array, run showBooks function
        showBooks(book);
    })
} 

async function replaceQty(clickedID) {
    // used for querySelector to find the correct input value
    let identifyer = `input[name="${clickedID}"]`;
    let newQuantityField = document.querySelector(identifyer);

    await fetch("http://localhost:3001/updateBook", {
        // replace existing value
        method: "PATCH",
        headers: "application/json",
        body: JSON.stringify({
            // the book we are trying to update ID should match the button id
            id: clickedID,
            // change the quantity field to the value in the associated input field
            quantity: newQuantityField.value
        })
    })
}


adminStart();

