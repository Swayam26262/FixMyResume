import React from 'react';

export default function AnalysisHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">You have no analysis history yet.</p>
        <p className="text-gray-400 text-sm">Analyze a resume to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow sm:rounded-lg mt-8">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Analysis History
        </h3>
        <div className="mt-5 border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {history.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      Job: {item.job_description.substring(0, 50)}...
                    </p>
                    <p className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="truncate">Analyzed on {new Date(item.created_at).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${item.score >= 75 ? 'bg-green-100 text-green-800' : item.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      Score: {item.score}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
