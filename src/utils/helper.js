import { config } from "../lib/env.js";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) return undefined;
    const parsedState = JSON.parse(serializedState);
    if (Array.isArray(parsedState)) {
      return parsedState;
    }
    return undefined;
  } catch (e) {
    console.warn("Could not load cart state", e);
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (e) {
    console.warn("Could not save cart state", e);
  }
};

const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  let cleanPath = path;
  if (cleanPath.startsWith('./assets/')) {
    cleanPath = cleanPath.substring(9);
  } else if (cleanPath.startsWith('/assets/')) {
    cleanPath = cleanPath.substring(8);
  } else if (cleanPath.startsWith('assets/')) {
    cleanPath = cleanPath.substring(7);
  }

  const BUCKET_URL = `${config.SUPABASE_URL}/storage/v1/object/public/product-images/`;

  return `${BUCKET_URL}${cleanPath}`;
};

export { loadFromLocalStorage, saveToLocalStorage, getImageUrl };
