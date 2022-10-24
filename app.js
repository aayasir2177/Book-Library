// ======================== Classes ========================
// Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Book Storage
class Storage {
  static getBooks() {
    if (localStorage.getItem("library") === null) {
      const bookLibrary = [];
      localStorage.setItem("library", JSON.stringify(bookLibrary));
      return bookLibrary;
    } else {
      const bookLibrary = JSON.parse(localStorage.getItem("library"));
      return bookLibrary;
    }
  }

  static addToArray(title, author, isbn) {
    let bookLibrary = Storage.getBooks();
    bookLibrary.push(new Book(title, author, isbn));
    localStorage.setItem("library", JSON.stringify(bookLibrary));
  }

  static removeFromArray(isbn) {
    let bookLibrary = Storage.getBooks();
    bookLibrary.forEach((element, index) => {
      if (element.isbn === isbn) {
        bookLibrary.splice(index, 1);
      }
    });
    localStorage.setItem("library", JSON.stringify(bookLibrary));
  }
}

// User Interface
class UI {
  static populateBookList(bookLibrary) {
    let tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";

    bookLibrary.forEach((element) => {
      let tr = document.createElement("tr");

      tr.innerHTML = `
            <td>${element.title}</td>
            <td>${element.author}</td>
            <td>${element.isbn}</td>
            <td> 
            <button type="button" class="btn btn-danger btn-sm del" onclick="removeBook(this)">X</button>
            </td>
            `;

      tableBody.appendChild(tr);
    });
    console.log(bookLibrary);
  }

  // static removeFromBookList(rowToBeDeleted) {
  //   rowToBeDeleted.remove();
  // }
}

// ======================== Events ========================
// Populate book list on window load
window.onload = () => {
  let bookLibrary = Storage.getBooks();
  UI.populateBookList(bookLibrary);
};

// Add Book on Enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBook();
  }
});

// Add Book on Click
function addBook() {
  let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  if (title === "" || title === "" || isbn === "") {
    alert("Please fill the fields!");
  } else {
    Storage.addToArray(title, author, isbn);
    let bookLibrary = Storage.getBooks();
    UI.populateBookList(bookLibrary);

    (document.querySelector("#title").value = ""),
      (author = document.querySelector("#author").value = ""),
      (document.querySelector("#isbn").value = "");

    console.log(bookLibrary);
  }
}

// Remove Book on Click
function removeBook(e) {
  let isbn = e.parentNode.previousElementSibling.textContent;
  Storage.removeFromArray(isbn);
  let bookLibrary = Storage.getBooks();
  UI.populateBookList(bookLibrary);
}
