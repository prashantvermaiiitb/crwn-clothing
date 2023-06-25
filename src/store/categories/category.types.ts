/**
 * These strings are of specific types hence they will be converted to enums.
 * Enum will be used as objects with keys and these have only FIXED values.
 */
export enum CATEGORIES_ACTION_TYPES {
  SET_CATEGORIES_MAP = "SET_CATEGORIES_MAP",
  SET_CATEGORIES = "category/SET_CATEGORIES",
  // will be triggered when async request is made
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
}

// type of categoy of card
export type CategoryItem = {
  id: number;
  imageUrl: string;
  price: number;
  name: string;
};

// Home page usage
export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

// type of Categories [] shown on preview or All 
export type CategoryMap = {
  // all we know that this is key is a string
  [key: string]: CategoryItem[];
};
