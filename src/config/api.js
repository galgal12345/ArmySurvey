export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// בדיקת חיבור בסיסית
fetch(`${API_BASE_URL}`)
  .then(response => response.json())
  .then(data => console.log('Server connection test:', data))
  .catch(error => console.error('Server connection error:', error)); 