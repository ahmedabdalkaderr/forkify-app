import 'regenerator-runtime/';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  recipes: [],
  pagination: {
    resultsPerPage: RES_PER_PAGE,
    curPage: 1,
    pages: null,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      publisher: recipe.publisher,
      title: recipe.title,
      quantity: recipe.quantity,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      unit: recipe.unit,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    if (!data) return;
    const { recipes } = data.data;
    state.recipes = recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        title: rec.title,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const loadPagination = async function (curPage) {
  try {
    state.pagination.pages = Math.ceil(state.recipes.length / RES_PER_PAGE);
    state.pagination.curPage = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function () {
  const { resultsPerPage, curPage } = state.pagination;
  const start = (curPage - 1) * resultsPerPage;
  const end = curPage * resultsPerPage;
  return state.recipes.slice(start, end);
};

export const updateServings = async function (newServings) {
  const oldServings = state.recipe.servings;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / oldServings;
  });
  state.recipe.servings = newServings;
};

const findIndex = function (id) {
  state.bookmarks.forEach((bookmark, index) => {
    if (bookmark.id === id) return index;
  });
};
export const updateBookmark = async function () {
  if (state.recipe.bookmarked) state.bookmarks.push(state.recipe);
  else {
    const index = findIndex(state.recipe.id);
    state.bookmarks.splice(index, 1);
  }
};
