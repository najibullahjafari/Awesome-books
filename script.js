// PUBLIC CLASSES

class Novel {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }
}

class NovelCollection {
  constructor() {
    this.novels = [];
  }

  saveNovels() {
    localStorage.setItem('novels', JSON.stringify(this.novels));
  }

  addNovel(title, author) {
    const novel = new Novel(title, author);
    this.novels.push(novel);
    this.saveNovels();
    this.displayNovels();
  }

  removeNovel(id) {
    this.novels = this.novels.filter((novel) => novel.id !== id);
    this.saveNovels();
    this.displayNovels();
  }

  loadNovels() {
    const storedNovels = localStorage.getItem('novels');
    if (storedNovels) {
      this.novels = JSON.parse(storedNovels);
    }
  }

  displayNovels() {
    const novelList = document.getElementById('bookList');
    novelList.innerHTML = '';

    this.novels.forEach((novel, index) => {
      const novelItem = document.createElement('div');
      novelItem.classList.add('book-item');
      if (index % 2 === 0) {
        novelItem.classList.add('even');
      } else {
        novelItem.classList.add('odd');
      }

      const novelInfo = document.createElement('span');
      novelInfo.textContent = `${novel.title} by ${novel.author}`;

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('btn', 'btn-danger', 'btn-sm');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => this.removeNovel(novel.id));

      novelItem.appendChild(novelInfo);
      novelItem.appendChild(removeBtn);

      novelList.appendChild(novelItem);
    });

    if (this.novels.length > 0) {
      novelList.classList.add('border');
    } else {
      novelList.classList.remove('border');
    }
  }
}

const novelCollection = new NovelCollection();
novelCollection.loadNovels();
novelCollection.displayNovels();

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title !== '' && author !== '') {
    novelCollection.addNovel(title, author);
    titleInput.value = '';
    authorInput.value = '';
  }
});

const addNewNovelSection = document.querySelector('.textfield-and-btn');
const novelListSection = document.getElementById('bookList');
const contactPageSection = document.querySelector('.contact-container');
const displayDataSection = document.querySelector('.dispay-data');
const pageHeaderSection = document.querySelector('.page-header');
const addNewBtn = document.querySelector('.nav-btn-add');
const addNewNovelsSection = document.querySelector('.textfield-and-btn');

function showList() {
  novelListSection.style.display = 'block';
  addNewNovelSection.style.display = 'none';
  contactPageSection.style.display = 'none';
  pageHeaderSection.innerHTML = `<h1>All Awesome Books</h1>`;
}
showList();

function addNew() {
  novelListSection.style.display = 'none';
  addNewNovelSection.style.display = 'block';
  contactPageSection.style.display = 'none';
  pageHeaderSection.innerHTML = `<h1>Add a new Books</h1>`;
}
addNew();

function contact() {
  novelListSection.style.display = 'none';
  addNewNovelSection.style.display = 'none';
  contactPageSection.style.display = 'block';
  pageHeaderSection.innerHTML = `<h1>Contact Information</h1>`;
}
contact();

function displayData() {
  addNewNovelsSection.style.display = 'none';
  novelListSection.style.display = 'block';
  contactPageSection.style.display = 'none';
  pageHeaderSection.innerHTML = '<h1>All Awesome Books</h1>';
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  displayDataSection.textContent = formattedDate;
}
displayData();

function updateAddNewBtn() {
  if (window.innerWidth < 768) {
    addNewBtn.innerHTML = `<span>Add</span>`;
  } else {
    addNewBtn.innerHTML = `<span>Add new</span>`;
  }
}

updateAddNewBtn();
window.addEventListener('resize', updateAddNewBtn);
