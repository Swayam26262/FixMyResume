import React from 'react';
import AnalysisHistory from './AnalysisHistory';
import { X } from 'lucide-react';

export default function HistoryModal({ isOpen, onClose, history, loading, error }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Analysis History</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {loading && (
            <div className="text-center p-10">
              <p className="text-gray-500">Loading history...</p>
            </div>
          )}
          {error && <p className="text-red-500 text-center p-10">{error}</p>}
          {!loading && !error && <AnalysisHistory history={history} />}
        </div>
      </div>
    </div>
  );
}
