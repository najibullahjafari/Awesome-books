// novel.js

export class Novel {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }
}
