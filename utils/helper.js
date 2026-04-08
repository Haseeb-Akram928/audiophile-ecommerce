import { config } from "../lib/env.js";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) return undefined;
    const parsedState = JSON.parse(serializedState);
    if (Array.isArray(parsedState)) {
      return parsedState;
    }
    return undefined; // If not an array, treat as no state
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

/**
 * Converts a stored relative path or asset path to the full Supabase Storage URL
 * Example mapping: "./assets/shared/desktop/logo.svg" -> "https://ffjmbbpteojoephvtlsw.supabase.co/storage/v1/object/public/product-images/shared/desktop/logo.svg"
 */
const getImageUrl = (path) => {
  if (!path) return "";
  
  // If it's already a full URL, just return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Normalize the path by removing any local "assets" prefixes
  let cleanPath = path;
  if (cleanPath.startsWith('./assets/')) {
    cleanPath = cleanPath.substring(9);
  } else if (cleanPath.startsWith('/assets/')) {
    cleanPath = cleanPath.substring(8);
  } else if (cleanPath.startsWith('assets/')) {
    cleanPath = cleanPath.substring(7);
  }
  
  // Base Supabase storage URL (using your project reference ID)
  const BUCKET_URL = `${config.SUPABASE_URL}/storage/v1/object/public/product-images/`;
  
  return `${BUCKET_URL}${cleanPath}`;
};

export { loadFromLocalStorage, saveToLocalStorage, getImageUrl };
