import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import bookmarksView from './views/bookmarksView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
let r = false;
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    resultsView.update();
    bookmarksView.update();

    const { recipe } = model.state;

    recipeView.render(recipe);
    if (r === false) {
      recipeView.addHandlerServings(updateServings);
      r = true;
    }
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  resultsView.renderSpinner();

  const query = searchView.getQuery();
  if (!query) return;
  await model.loadSearchResults(query);
  await model.loadPagination();

  resultsView.render(model.getSearchResultPage());

  paginationView.render(model.state.pagination);
};

const controlPagination = async function (page) {
  model.state.pagination.curPage = page;
  paginationView.render(model.state.pagination);
  resultsView.render(model.getSearchResultPage());
};

const updateServings = async function (servings) {
  await model.updateServings(servings);
  recipeView.update(model.state.recipe);
};

const controlBookMark = async function () {
  await model.updateBookmark();
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerBookMark(controlBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPaginate(controlPagination);
};

init();
