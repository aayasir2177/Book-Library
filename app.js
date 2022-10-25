// ======================== Classes ========================
// Book Constructor
class Book {
  constructor(sr, title, author, isbn) {
    this.sr = sr;
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
      bookLibrary.push({
        sr: 0,
      });
      localStorage.setItem("library", JSON.stringify(bookLibrary));
      return bookLibrary;
    } else {
      const bookLibrary = JSON.parse(localStorage.getItem("library"));
      return bookLibrary;
    }
  }

  static addToArray(title, author, isbn) {
    let bookLibrary = Storage.getBooks();

    // Adds 1 to serial number everytime new task is created
    let sr = bookLibrary[bookLibrary.length - 1].sr + 1;
    bookLibrary = Storage.getBooks();

    bookLibrary.push(new Book(sr, title, author, isbn));
    localStorage.setItem("library", JSON.stringify(bookLibrary));
  }

  static removeFromArray(sr) {
    let bookLibrary = Storage.getBooks();

    // Removes the specific task from the array
    bookLibrary.forEach((element, index) => {
      if (element.sr === Number(sr)) {
        bookLibrary.splice(index, 1);
      }
    });

    // Resets the serial number
    for (let i = 0; i < bookLibrary.length; i++) {
      bookLibrary[i].sr = 0;
      bookLibrary[i].sr = i;
    }
    localStorage.setItem("library", JSON.stringify(bookLibrary));
  }
}

// User Interface
class UI {
  static populateBookList(bookLibrary) {
    let tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";

    bookLibrary.shift();
    bookLibrary.forEach((element) => {
      let tr = document.createElement("tr");

      tr.innerHTML = `
            <td>${element.sr}</td>
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
    let bookLibrary = Storage.addToArray(title, author, isbn);
    bookLibrary = Storage.getBooks();
    UI.populateBookList(bookLibrary);

    (document.querySelector("#title").value = ""),
      (author = document.querySelector("#author").value = ""),
      (document.querySelector("#isbn").value = "");

    console.log(bookLibrary);
  }
}

// Remove Book on Click
function removeBook(e) {
  let bookLibrary = Storage.getBooks();

  Storage.removeFromArray(
    e.parentNode.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.textContent
  );

  bookLibrary = Storage.getBooks();
  UI.populateBookList(bookLibrary);
}
