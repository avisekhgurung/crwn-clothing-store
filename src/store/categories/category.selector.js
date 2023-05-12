import {createSelector} from 'reselect'

//Now basis of reselect is that it creates this concept of memorised selector
//Memorization is The process in which you cache the prev value of something so that if the i/p
//has not changed then you just return back the same output this works when we have pure function

const selectCategoryReducer = (state) => state.categories ;

export const selectCategories = createSelector(
  [selectCategoryReducer], //array of input
  (categoriesSlice) => categoriesSlice.categories //outp 
)


//using reselect

export const selectCategoriesMap = createSelector(
  [selectCategories], 
  (categories) => 
    categories.reduce((acc, category) => {
      const { title, items} = category;
      // acc[ title, items] = category;
      // acc[title.toLowerCase()] = items;
      acc[title.toLowerCase()]  = items;
      return acc;
    }, {})
  
)

// export const selectCategoriesMap = (state) => state.categories.categories
//   .reduce((acc, category) => {
//     const {title, items} = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {})


export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)