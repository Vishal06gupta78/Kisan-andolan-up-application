const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  async get(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`);
    return res.json();
  },

  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async upload(endpoint: string, formData: FormData) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  }
};
