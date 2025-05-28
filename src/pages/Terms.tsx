import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Terms() {
  // URL of the Terms document (Markdown or plain text)
  const TERMS_URL = '/src/assets/terms.md'; // Local Markdown file

  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(TERMS_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Terms document.');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Terms &amp; Conditions</h1>
        <div className="prose prose-blue max-w-none">
          {loading && <p>Loading Terms...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && <ReactMarkdown>{content}</ReactMarkdown>}
        </div>
        <div className="mt-6 text-sm text-gray-400 text-center">
          <p>To update these Terms, edit <code>src/assets/terms.md</code> in your project.</p>
        </div>
      </div>
    </div>
  );
}
