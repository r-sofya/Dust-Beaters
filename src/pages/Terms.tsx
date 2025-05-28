import { useEffect, useState } from 'react';

// NOTE: Requires 'markdown-it' package. Install with: npm install markdown-it

const Terms = () => {
  const [content, setContent] = useState('');
  const [md, setMd] = useState<any>(null);

  useEffect(() => {
    import('markdown-it').then((markdownIt) => {
      setMd(new markdownIt.default());
    });
    fetch('/src/assets/terms.md')
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow">Terms and Conditions</h1>
          <p className="text-xl text-gray-600">Last updated: May 28, 2025</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-100">
          <div className="prose prose-blue prose-lg max-w-none"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 400,
            }}
          >
            {md ? (
              <div
                className="[&>hr]:my-12 [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h3]:mt-8 [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:font-semibold [&>ul]:mb-6 [&>ol]:mb-6 [&>p]:mb-6 [&>strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: md.render(content) }}
              />
            ) : (
              <div className="text-center text-blue-600">Loading terms...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
