import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationsView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    let markup = '';
    const { curPage, pages } = this._data;
    if (curPage === 1 && pages > 1)
      markup = `
          <button class="btn--inline pagination__btn--next">
            <span>Page 2</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    else if (curPage === pages && pages > 1)
      markup = `
          <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pages - 1}</span>
          </button>`;
    else if (curPage > 1 && curPage < pages)
      markup = `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;

    return markup;
  }

  addHandlerPaginate(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      if (btn.classList.contains('pagination__btn--next')) this._data.curPage++;
      else this._data.curPage--;
      handler(this._data.curPage);
    });
  }
}

export default new PaginationsView();
