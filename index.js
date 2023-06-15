// Import the necessary modules
import { NovelCollection } from './modules/novelCollection.js';

import { DateTime } from '../../node_modules/luxon/src/luxon.js';

// some public consts

// nav-btn-list
// nav-btn-add
// nav-btn-contact
const novelListSection = document.getElementById('bookList');
const addNewNovelSection = document.querySelector('.textfield-and-btn');
const contactPageSection = document.querySelector('.contact-container');
const pageHeaderSection = document.querySelector('.page-header');
// novelCollection.display.style = 'none';
// contactPageSection.display.style = 'none';

window.onload = () => {
  addNewNovelSection.style.display = 'none';
  novelListSection.style.display = 'block';
  contactPageSection.style.display = 'none';
  pageHeaderSection.innerHTML = '<h1>All Awesome Books</h1>';
};
// Create an instance of NovelCollection
const novelCollection = new NovelCollection();

// Load novels and display them
novelCollection.loadNovels();
novelCollection.displayNovels();

// Function to handle adding a new novel
const addNovel = () => {
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title !== '' && author !== '') {
    novelCollection.addNovel(title, author);
    titleInput.value = '';
    authorInput.value = '';
  }
};

// Add event listener to the add button
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addNovel);

const showList = () => {
  novelListSection.style.display = 'block';
  addNewNovelSection.style.display = 'none';
  contactPageSection.style.display = 'none';
  pageHeaderSection.innerHTML = '<h1>All Awesome Books</h1>';
};

const addNew = () => {
  novelListSection.style.display = 'none';
  addNewNovelSection.style.display = 'block';
  contactPageSection.style.display = 'none';
  pageHeaderSection.innerHTML = '<h1>Add a new Book</h1>';
};

const contact = () => {
  novelListSection.style.display = 'none';
  addNewNovelSection.style.display = 'none';
  contactPageSection.style.display = 'block';
  pageHeaderSection.innerHTML = '<h1>Contact Information</h1>';
};

// Add event listeners to the navigation buttons
const listBtn = document.querySelector('.nav-btn-list');
listBtn.addEventListener('click', showList);

const addNewBtn = document.querySelector('.nav-btn-add');
addNewBtn.addEventListener('click', addNew);

const contactBtn = document.querySelector('.nav-btn-contact');
contactBtn.addEventListener('click', contact);

const displayData = () => {
  const displayDataSection = document.querySelector('.display-data');
  const currentDate = DateTime.now().toLocaleString(DateTime.DATE_FULL);
  displayDataSection.textContent = currentDate;
};
displayData();

// ... remaining code ...
