document.addEventListener('DOMContentLoaded', function () {
  const awesomeList = document.getElementById('awesomeList');
  const textfieldTitle = document.getElementById('textfieldTitle');
  const textfieldAuthor = document.getElementById('textfieldAuthor');
  const btnAdd = document.getElementById('btnAdd');

  btnAdd.addEventListener("click", function (event) {
    event.preventDefault();

    const title = textfieldTitle.value;
    const author = textfieldAuthor.value;

    if (title.trim() === '' || author.trim() === '') {
      return;
    }

    createBookItem(title, author);

    saveBooks();

    textfieldTitle.value = '';
    textfieldAuthor.value = '';
  });

  function createBookItem(title, author) {
    const bookItem = document.createElement('div');
    const bookTitle = document.createElement('span');
    const br = document.createElement('br');
    const bookAuthor = document.createElement('span');
    const removeBtn = document.createElement('button');
    const hr = document.createElement('hr');
    const li = document.createElement('br');

    bookTitle.textContent = title;
    bookAuthor.textContent = author;
    removeBtn.textContent = 'Remove';

    removeBtn.addEventListener("click", function () {
      awesomeList.remove();
    });

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(br);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(li);
    bookItem.appendChild(removeBtn);
    bookItem.appendChild(hr);

    awesomeList.appendChild(bookItem);
  }

  function saveBooks() {
    const books = Array.from(awesomeList.children);

    const bookData = [];

    books.forEach((book) => {
      const title = book.querySelector('span').textContent;
      const author = book.querySelector('span + br + span').textContent;
      const bookObj = { title, author };
      bookData.push(bookObj);
    });
    localStorage.setItem('books', JSON.stringify(bookData));
  }
});
