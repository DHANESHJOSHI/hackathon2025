import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState('');
  const [result, setResult] = useState('');
  const [thinking, setThinking] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setThinking(true);
    setThinkingMessage('Analyzing data...'); // Initial thinking message

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const { result } = await response.json();

      const thinkMessage = extractThinkMessage(result);
      const restOfResult = result.split('</think>')[1]?.trim() || '';

      setThinkingMessage(cleanText(thinkMessage));

      setTimeout(() => {
        setResult(cleanText(restOfResult));
        setThinking(false);
      }, 5000);

    } catch (error) {
      setThinkingMessage('An error occurred. Please try again.');
    }
  };

  const extractThinkMessage = (text) => {
    const match = text.match(/<think>(.*?)<\/think>/);
    return match ? match[1] : 'Thinking...';
  };

  const cleanText = (text) => {
    let cleanedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong className="text-red-600">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/##(.*?)##/g, '<h2>$1</h2>')
      .replace(/\[(.*?)\]/g, '<span>$1</span>')
      .replace(/#{1,6}\s?(.*?)$/gm, '<h3>$1</h3>')
      .replace(/\n{3,}/g, '<br/><br/>')
      .replace(/---/g, '<hr/>')
      .replace(/- (.*)/g, '<li>$1</li>')
      .trim();

    return cleanedText;
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-95 bg-matrix-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none"></div>
      <div className="relative max-w-5xl mx-auto p-8">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 mb-12 text-center tracking-tight">
          AI CyberSentry Scanner
        </h1>
        <div className="relative backdrop-blur-xl bg-black/40 rounded-[2rem] shadow-2xl shadow-green-500/20 p-10 border border-green-500/30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-[2rem]"></div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <textarea
                className="w-full h-56 p-6 bg-black/80 text-green-400 rounded-xl border-2 border-green-500/30 focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition-all duration-300 resize-none font-mono text-sm placeholder-green-700"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="// Input data for security analysis..."
              />
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-green-900/40 border border-green-500/40 backdrop-blur-sm">
                <span className="text-xs text-green-400 font-mono tracking-wider">SECURE_INPUT</span>
              </div>
            </div>
            <button
              className="w-full py-5 px-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-green-500/30 group relative overflow-hidden"
              type="submit"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Initialize Scan
              </span>
            </button>
          </form>
          {thinking ? (
            <div className="mt-10 p-8 bg-black/90 rounded-xl border border-green-500/40 backdrop-blur-lg">
              <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                System Analysis in Progress
              </h2>
              <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                <pre className="text-green-300 font-mono text-sm leading-relaxed">
                  {thinkingMessage}
                </pre>
              </div>
            </div>
          ) : (
            result && (
              <div className="mt-10 p-8 bg-black/90 rounded-xl border border-green-500/40 backdrop-blur-lg">
                <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Threat Analysis Report
                </h2>
                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                  <div className="text-green-300 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words bg-black/50 p-6 rounded-xl border border-green-500/30" dangerouslySetInnerHTML={{ __html: result }} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}