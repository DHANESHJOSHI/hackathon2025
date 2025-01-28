'use client';

import { useEffect, useState } from 'react';

export default function RealTimeMonitor() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/threats/stream');
    
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setThreats(prev => [
        { ...data.analysis, id: data.packetId },
        ...prev.slice(0, 14)
      ]);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="threat-feed">
      <h3>Real-Time Analysis with {process.env.NEXT_PUBLIC_MODEL_NAME}</h3>
      <div className="analysis-grid">
        {threats.map((threat, i) => (
          <div key={i} className="analysis-card">
            <div className="severity-indicator" data-severity={threat.severity}>
              {threat.severity}
            </div>
            <div className="threat-details">
              <h4>{threat.type}</h4>
              <p>{threat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}