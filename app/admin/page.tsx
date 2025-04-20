// app/admin/page.tsx

'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSendNotification = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/send-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send notification');
      }

      setSuccess(true);
      setTitle('');
      setBody('');
      setToken('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Send Push Notification</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block mb-1">
            Body:
          </label>
          <textarea
            id="body"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="token" className="block mb-1">
            Token:
          </label>
          <input
            type="text"
            id="token"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">Notification sent successfully!</div>}
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleSendNotification}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Notification'}
        </button>
      </div>
    </div>
  );
}