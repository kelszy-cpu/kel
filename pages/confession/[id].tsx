import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Confession } from '@/types';

const ConfessionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [confession, setConfession] = useState<Confession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('gradient-purple');
  const [textColor, setTextColor] = useState('text-dark');
  const [fontSize, setFontSize] = useState('text-base');
  const [fontStyle, setFontStyle] = useState('font-normal');

  useEffect(() => {
    if (!id) return;

    // Fetch confession from localStorage or API
    const stored = localStorage.getItem(`confession-${id}`);\n    if (stored) {
      const data = JSON.parse(stored);
      setConfession(data);
      setEditContent(data.content);
    } else {
      // In a real app, fetch from API
      setConfession({\n        id: id as string,
        content: 'Sample confession text',
        createdAt: new Date(),
        likes: 0,
        liked: false,
      });\n      setEditContent('Sample confession text');
    }
    setIsLoading(false);
  }, [id]);

  const handleSavePresentation = () => {
    if (confession) {
      const updated = { ...confession, content: editContent };
      setConfession(updated);
      localStorage.setItem(`confession-${id}`, JSON.stringify(updated));
      setIsEditing(false);
    }
  };

  const backgroundStyles: { [key: string]: string } = {
    'gradient-purple': 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
    'gradient-blue': 'bg-gradient-to-br from-blue-400 to-blue-600',
    'gradient-green': 'bg-gradient-to-br from-green-400 to-teal-500',
    'gradient-sunset': 'bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500',
    'gradient-ocean': 'bg-gradient-to-br from-cyan-500 to-blue-500',
    'solid-white': 'bg-white',
    'solid-dark': 'bg-gray-900',
  };

  const textColorStyles: { [key: string]: string } = {
    'text-dark': 'text-gray-900',
    'text-white': 'text-white',
    'text-pink': 'text-pink-600',
    'text-blue': 'text-blue-600',
    'text-green': 'text-green-600',
  };

  const fontSizeStyles: { [key: string]: string } = {
    'text-sm': 'text-sm',
    'text-base': 'text-base',
    'text-lg': 'text-lg',
    'text-xl': 'text-xl',
    'text-2xl': 'text-2xl',
    'text-3xl': 'text-3xl',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading confession...</p>
      </div>
    );
  }

  if (!confession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Confession not found</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Confession - Interactive View</title>
        <meta name="description" content="View and customize confession presentation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <a className="text-purple-600 hover:text-purple-800 font-semibold">← Back</a>
            </Link>
            <h1 className="text-2xl font-bold">Confession Editor</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Preview Section */}
            <div className="lg:col-span-2">
              <div className="rounded-xl shadow-lg overflow-hidden">
                <div
                  className={`${backgroundStyles[backgroundColor]} p-12 min-h-96 flex flex-col justify-center items-center text-center`}
                >
                  <p className={`${textColorStyles[textColor]} ${fontSizeStyles[fontSize]} ${fontStyle} leading-relaxed whitespace-pre-wrap max-w-2xl`}>
                    {editContent || 'Your confession will appear here...'}
                  </p>
                  <div className="mt-8 text-xs opacity-75">
                    {isEditing ? '✏️ In Edit Mode' : '👁️ Preview Mode'}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-600">❤️</div>
                  <div className="text-gray-600">{confession.likes} likes</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">📅</div>
                  <div className="text-gray-600">{new Date(confession.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">🔒</div>
                  <div className="text-gray-600">Anonymous</div>
                </div>
              </div>
            </div>

            {/* Controls Section */}
            {isEditing && (
              <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-8">
                <h2 className="text-xl font-bold mb-6">Customize Presentation</h2>

                {/* Text Editor */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Confession Text</label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    maxLength={500}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                    rows={5}
                  />
                  <div className="text-xs text-gray-500 mt-1">{editContent.length}/500</div>
                </div>

                {/* Background Color */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">🎨 Background</label>
                  <div className="space-y-2">
                    {Object.keys(backgroundStyles).map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBackgroundColor(bg)}
                        className={`w-full p-2 rounded-lg text-xs font-semibold ${
                          backgroundColor === bg
                            ? 'ring-2 ring-purple-600'
                            : ''
                        } ${backgroundStyles[bg]} ${
                          bg.startsWith('solid-dark')
                            ? 'text-white'
                            : bg.startsWith('solid-white')
                            ? 'text-gray-900'
                            : 'text-white'
                        }`}
                      >
                        {bg.replace('gradient-', '').replace('solid-', '').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Color */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">🖍️ Text Color</label>
                  <div className="space-y-2">
                    {Object.keys(textColorStyles).map((color) => (
                      <button
                        key={color}
                        onClick={() => setTextColor(color)}
                        className={`w-full p-2 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 ${
                          textColor === color
                            ? 'ring-2 ring-purple-600'
                            : ''
                        } ${textColorStyles[color]}`}
                      >
                        {color.replace('text-', '').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">📏 Font Size</label>
                  <div className="space-y-2">
                    {Object.keys(fontSizeStyles).map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`w-full p-2 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 ${
                          fontSize === size
                            ? 'ring-2 ring-purple-600'
                            : ''
                        }`}
                      >
                        {size.replace('text-', '').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Style */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">✨ Font Style</label>
                  <div className="space-y-2">
                    {['font-normal', 'font-bold', 'italic'].map((style) => (
                      <button
                        key={style}
                        onClick={() => setFontStyle(style)}
                        className={`w-full p-2 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 ${
                          fontStyle === style
                            ? 'ring-2 ring-purple-600'
                            : ''
                        } ${style === 'font-bold' ? 'font-bold' : style === 'italic' ? 'italic' : ''}`}
                      >
                        {style.replace('font-', '').toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSavePresentation}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  💾 Save & Exit
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ConfessionDetail;
