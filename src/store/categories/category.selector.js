import { createSelector } from 'reselect';


const selectCategoreyReducer = (state) =>  state.categories;

export const selectCategories = createSelector(
  [selectCategoreyReducer],
  (categoriesSlice) => 
    categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category)=>{
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    },{})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoreyReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);