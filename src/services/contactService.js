// src/services/contactService.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

export const sendContactMessage = async (contactData) => {
  const response = await fetch(`${API_URL}/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al enviar mensaje');
  }

  return await response.json();
};
