import PreviewView from './previewView.js';

class ResultsView extends PreviewView {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'no recipes found for your query! please try again.';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview.bind(this)).join('');
  }
}

export default new ResultsView();
