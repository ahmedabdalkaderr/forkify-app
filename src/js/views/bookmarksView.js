import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'no bookmarks yet, find a nice recipe and bookmark it.';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview.bind(this)).join('');
  }

}

export default new BookmarksView();
