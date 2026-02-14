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

export { loadFromLocalStorage, saveToLocalStorage };
