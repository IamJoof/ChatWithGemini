const API_URL = 'http://localhost:5000/api/messages';

export const fetchMessages = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createMessage = async (text, sender) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, sender }),
  });
  return res.json();
};

export const deleteMessage = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const clearMessages = async () => {
  await fetch(API_URL, { method: 'DELETE' });
};