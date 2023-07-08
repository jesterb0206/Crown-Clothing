import {
  selectCategories,
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../category.selector';

const mockState = {
  categories: {
    isLoading: false,
    categories: [
      {
        title: 'mens',
        imageUrl: 'test',
        items: [
          {id: 1, name: 'Product 1'},
          {id: 2, name: 'Product 2'},
        ],
      },
      {
        title: 'womens',
        imageUrl: 'test',
        items: [
          {id: 3, name: 'Product 3'},
          {id: 4, name: 'Product 4'},
        ],
      },
    ],
  },
};

describe('Category Selectors', () => {
  test('selectCategories Should Return the Categories Data', () => {
    const categoriesSlice = selectCategories(mockState);
    expect(categoriesSlice).toEqual(mockState.categories.categories);
  });

  test('selectCategoriesIsLoading Should Return the isLoading State', () => {
    const isLoading = selectCategoriesIsLoading(mockState);
    expect(isLoading).toEqual(false);
  });

  test('selectCategoriesMap Should Convert an Array Into Its Appropriate Map', () => {
    const expectedCategoriesMap = {
      mens: [
        {id: 1, name: 'Product 1'},
        {id: 2, name: 'Product 2'},
      ],
      womens: [
        {id: 3, name: 'Product 3'},
        {id: 4, name: 'Product 4'},
      ],
    };

    const categoriesMap = selectCategoriesMap(mockState);
    expect(categoriesMap).toEqual(expectedCategoriesMap);
  });
});
