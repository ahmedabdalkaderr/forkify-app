import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';

import View from './view.js';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'We could not find this recipe, please try another one!';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }


  addHandlerServings(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--tiny');
      let { servings } = this._data;
      if (!btn) return;
      if (btn.classList.contains('btn--increase-servings')) servings++;
      else if (servings > 1) servings--;
      handler(servings);
    });
  }

  addHandlerBookMark(handler) {
    this._parentEl.addEventListener('click', e => {
      let btn = e.target.closest('.btn--round');
      if (!btn) return;
      btn = btn.querySelector('.btn--bookmark');

      this._data.bookmarked
        ? btn.setAttribute('href', `${icons}#icon-bookmark`)
        : btn.setAttribute('href', `${icons}#icon-bookmark-fill`);

      this._data.bookmarked = !(this._data.bookmarked);
      handler();
    });
  }

  _generateMarkup() {
    return `
     <figure class="recipe__fig">
          <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--decrease-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
    
          </div>
          <button class="btn--round">
            <svg>
              <use class="btn--bookmark" href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

          ${this._data.ingredients
            .map(ing => this._generateMarkeupIngredient(ing))
            .join('')}
          
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  _generateMarkeupIngredient(ing) {
    return `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                  ing.quantity ? new Fraction(ing.quantity).toString() : ''
                }</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>`;
  }
}

export default new RecipeView();
