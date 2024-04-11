
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to local storage:', error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving from local storage:', error);
    return null;
  }
};

export const updateLocalStorageValue = (key, newValue) => {
  // Get the current value from local storage
  const currentValue = JSON.parse(localStorage.getItem(key));

  // Merge the current value with the new value
  const updatedValue = { ...currentValue, ...newValue };

  // Save the updated value back to local storage
  saveToLocalStorage(key, updatedValue);
}

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
}
