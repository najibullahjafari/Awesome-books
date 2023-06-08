// PUBLIC CLASSES

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }
}

class BookCollection {
  constructor() {
    this.books = [];
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    this.saveBooks();
    this.displayBooks();
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.saveBooks();
    this.displayBooks();
  }

  loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
  }

  displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');
      if (index % 2 === 0) {
        bookItem.classList.add('even');
      } else {
        bookItem.classList.add('odd');
      }

      const bookInfo = document.createElement('span');
      bookInfo.textContent = `${book.title} by ${book.author}`;

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('btn', 'btn-danger', 'btn-sm');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => this.removeBook(book.id));

      bookItem.appendChild(bookInfo);
      bookItem.appendChild(removeBtn);

      bookList.appendChild(bookItem);
    });

    if (this.books.length > 0) {
      bookList.classList.add('border');
    } else {
      bookList.classList.remove('border');
    }
  }
}

const bookCollection = new BookCollection();
bookCollection.loadBooks();
bookCollection.displayBooks();

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title !== '' && author !== '') {
    bookCollection.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
  }
});

const addNewbook = document.querySelector('.textfield-and-btn');
const bookLists = document.getElementById('bookList');
const contactPage = document.querySelector('.contact-container');
const displayData = document.querySelector('.dispay-data');
const pageHeader = document.querySelector('.page-header');
const addNewBtn = document.querySelector('.nav-btn-add');
const addNewBooks = document.querySelector('.textfield-and-btn');

function showList() {
  bookLists.style.display = 'block';
  addNewbook.style.display = 'none';
  contactPage.style.display = 'none';
  pageHeader.innerHTML = `<h1>All Awesome Books</h1>`;
}
showList();

function addNew() {
  bookLists.style.display = 'none';
  addNewbook.style.display = 'block';
  contactPage.style.display = 'none';
  pageHeader.innerHTML = `<h1>Add a new book</h1>`;
}
addNew();

function contact() {
  bookLists.style.display = 'none';
  addNewbook.style.display = 'none';
  contactPage.style.display = 'block';
  pageHeader.innerHTML = `<h1>Contact Infrormation</h1>`;
}
contact();

function displayDatas() {
  addNewBooks.style.display = 'none';
  bookLists.style.display = 'block';
  contactPage.style.display = 'none';
  pageHeader.innerHTML = '<h1>All Awesome Books</h1>';
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  displayData.textContent = formattedDate;
}
displayDatas();

function updateAddNewBtn() {
  if (window.innerWidth < 768) {
    addNewBtn.innerHTML = `<span>Add</span>`;
  } else {
    addNewBtn.innerHTML = `<span>Add new</span>`;
  }
}

updateAddNewBtn();
window.addEventListener('resize', updateAddNewBtn);
