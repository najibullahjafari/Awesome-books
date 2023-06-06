// CL

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = this.loadBooksFromLocalStorage() || [];
    this.render();
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    this.saveBooksToLocalStorage();
    this.render();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooksToLocalStorage();
    this.render();
  }

  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks).map(bookData => new Book(bookData.title, bookData.author)) : null;
  }

  render() {
    const awesomeList = document.getElementById('awesomeList');
    awesomeList.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookItem = document.createElement('div');
      bookItem.className = 'book-item';

      const bookDetails = document.createElement('div');
      bookDetails.className = 'book-details';
      
      const bookTextCon = document.createElement('div');
      bookDetails.className = 'bookContainer';

      const bookTitle = document.createElement('span');
      bookTitle.className = 'book-title';
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement('span');
      bookAuthor.className = 'book-author';
      bookAuthor.textContent = book.author;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => this.removeBook(index));

      bookDetails.appendChild(bookTitle);
      bookDetails.appendChild(document.createElement('br'));
      bookDetails.appendChild(bookAuthor);

      bookItem.appendChild(bookDetails);
      bookItem.appendChild(removeBtn);

      awesomeList.appendChild(bookItem);
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const bookForm = document.getElementById('bookForm');
  const textfieldTitle = document.getElementById('textfieldTitle');
  const textfieldAuthor = document.getElementById('textfieldAuthor');

  const bookCollection = new BookCollection();

  bookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = textfieldTitle.value;
    const author = textfieldAuthor.value;

    if (title.trim() === '' || author.trim() === '') {
      return;
    }

    bookCollection.addBook(title, author);

    textfieldTitle.value = '';
    textfieldAuthor.value = '';
  });
});
