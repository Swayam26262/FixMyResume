import React, { useState, useEffect } from 'react';
import ResumeAnalyzerFlow from './ResumeAnalyzerFlow';
import AnalysisHistory from './AnalysisHistory';
import authService from '../services/authService';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError('');
        const historyData = await authService.getAnalysisHistory();
        setHistory(historyData);
      } catch (err) {
        setError('Failed to load analysis history. Please try again later.');
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [refresh]);

  const handleAnalysisDone = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Analyze New Resume</h2>
            <ResumeAnalyzerFlow onDone={handleAnalysisDone} />
          </div>

          <div className="lg:col-span-1">
            {loading && (
              <div className="text-center p-10 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">Loading history...</p>
              </div>
            )}
            {error && <p className="text-red-500 text-center p-10 bg-white rounded-lg shadow-sm">{error}</p>}
            {!loading && !error && <AnalysisHistory history={history} />}
          </div>
        </div>
      </div>
    </div>
  );
}