// novelCollection.js

import { Novel } from './novel.js';

export class NovelCollection {
  constructor() {
    this.novels = [];
  }

  saveNovels() {
    localStorage.setItem('novels', JSON.stringify(this.novels));
  }

  addNovel = (title, author) => {
    const novel = new Novel(title, author);
    this.novels.push(novel);
    this.saveNovels();
    this.displayNovels();
  };

  removeNovel = (id) => {
    this.novels = this.novels.filter((novel) => novel.id !== id);
    this.saveNovels();
    this.displayNovels();
  };

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
      novelItem.classList.add(index % 2 === 0 ? 'even' : 'odd');

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

    novelList.classList.toggle('border', this.novels.length > 0);
  }
}
