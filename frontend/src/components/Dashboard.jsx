import React, { useState, useEffect } from 'react';
import ResumeAnalyzerFlow from './ResumeAnalyzerFlow';
import HistoryModal from './HistoryModal';
import authService from '../services/authService';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

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

  const openHistoryModal = () => setIsHistoryModalOpen(true);
  const closeHistoryModal = () => setIsHistoryModalOpen(false);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <ResumeAnalyzerFlow 
              onDone={handleAnalysisDone} 
              onViewHistory={openHistoryModal} 
            />
          </div>
        </div>
      </div>
      <HistoryModal 
        isOpen={isHistoryModalOpen}
        onClose={closeHistoryModal}
        history={history}
        loading={loading}
        error={error}
      />
    </>
  );
}