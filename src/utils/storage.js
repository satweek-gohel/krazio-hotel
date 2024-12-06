export const STORAGE_KEY = 'auth_state';

export function saveToStorage(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
}

export function loadFromStorage() {
  try {
    const state = sessionStorage.getItem(STORAGE_KEY);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Error loading from sessionStorage:', error);
    return null;
  }
}

export function clearStorage() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
}