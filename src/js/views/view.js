import icons from '../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data = '') {
    if (this._parentEl.classList.contains('recipe')) {
      this._parentEl.querySelector('.recipe__info-data--people').textContent =
        data.servings;
        return;
    }
    const prevEl = this._parentEl.querySelector('.preview__link--active');
    if (prevEl) prevEl.classList.remove('preview__link--active');
    const id = window.location.hash.slice(1);
    const el = this._parentEl.querySelector(`[href="#${id}"]`);
    if (!el) return;
    el.classList.add('preview__link--active');
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError() {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${this._errorMessage}</p>
     </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
