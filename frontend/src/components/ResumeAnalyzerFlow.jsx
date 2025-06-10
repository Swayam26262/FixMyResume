import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Target } from 'lucide-react';
import axios from 'axios';

export default function ResumeAnalyzerFlow({ onDone, initialParsedContent = null }) {
  const [step, setStep] = useState(initialParsedContent ? 'jobDescription' : 'upload');
  const [resumeFile, setResumeFile] = useState(null);
  const [parsedResumeContent, setParsedResumeContent] = useState(initialParsedContent);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      await processResumeFile(files[0]);
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      await processResumeFile(files[0]);
    }
  };

  const processResumeFile = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/parse-resume/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setParsedResumeContent(response.data.content);
      setStep('jobDescription');
    } catch (error) {
      console.error("Error parsing resume:", error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.error || 'Failed to parse resume. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/analyze-resume/`, {
        job_description: jobDescription,
        resume_content: parsedResumeContent
      });
      setAnalysis(response.data.analysis);
      setStep('analysis');
      if (onDone) onDone(response.data.analysis);
    } catch (err) {
      console.error("Error analyzing resume:", err.response ? err.response.data : err.message);
      const errorMessage = err.response?.data?.error || 'Failed to analyze resume. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setStep('upload');
    setResumeFile(null);
    setParsedResumeContent(null);
    setJobDescription('');
    setAnalysis(null);
    setError('');
  };

  // --- UI Steps ---
  const renderUploadStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>
        <p className="text-gray-600">Upload your resume in PDF or Word format to get started</p>
      </div>
      <div className={`bg-white rounded-xl shadow-sm border-2 border-dashed ${dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'} p-8 text-center transition-colors`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
        <input
          type="file"
          id="resume-upload-analyzer"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
        />
        <label htmlFor="resume-upload-analyzer" className="cursor-pointer block">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-gray-500">PDF or Word document (max 10MB)</p>
        </label>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>
      )}
      <button
        onClick={() => processResumeFile(resumeFile)}
        disabled={isLoading || !resumeFile}
        className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (<><span className="animate-spin mr-2">⏳</span>Uploading...</>) : (<>Continue</>)}
      </button>
    </div>
  );

  const renderJobDescriptionStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Paste Job Description</h2>
        <p className="text-gray-600">Paste the job description of the position you want to analyze your resume for.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>
      )}
      <button
        onClick={handleAnalyze}
        disabled={isLoading || !jobDescription.trim()}
        className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (<><span className="animate-spin mr-2">⏳</span>Analyzing...</>) : (<>Analyze Resume</>)}
      </button>
    </div>
  );

  const renderAnalysisStep = () => analysis && (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 my-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Your Resume Analysis</h2>
        <p className="text-lg text-gray-600">Here's a detailed breakdown of how your resume aligns with the job description.</p>
      </div>
      {/* Score & Summary */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-10">
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            {/* Circular progress bar using SVG */}
            <svg width="120" height="120">
              <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="12" fill="none"/>
              <circle
                cx="60" cy="60" r="54"
                stroke="#a78bfa"
                strokeWidth="12"
                fill="none"
                strokeDasharray={339.292}
                strokeDashoffset={339.292 * (1 - analysis.score / 100)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s' }}
              />
              <text x="60" y="70" textAnchor="middle" fontSize="2.5rem" fill="#7c3aed" fontWeight="bold">
                {analysis.score}%
              </text>
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-700">Overall Match</span>
          <span className={`mt-1 px-3 py-1 rounded-full text-sm font-bold ${analysis.score >= 80 ? 'bg-green-100 text-green-700' : analysis.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
            {analysis.score >= 80 ? 'Excellent' : analysis.score >= 60 ? 'Good' : 'Needs Work'}
          </span>
        </div>
        {/* Summary Info Cards */}
        <div className="flex flex-col gap-3">
          <div className="bg-green-50 px-5 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="text-green-500" /> <span className="font-semibold">{analysis.matched_keywords.length}</span> <span className="text-gray-600">Matched</span>
          </div>
          <div className="bg-yellow-50 px-5 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="text-yellow-500" /> <span className="font-semibold">{analysis.missing_skills.length}</span> <span className="text-gray-600">Missing</span>
          </div>
          <div className="bg-blue-50 px-5 py-3 rounded-lg flex items-center gap-2">
            <Target className="text-blue-500" /> <span className="font-semibold">{analysis.improvement_tips.length}</span> <span className="text-gray-600">Tips</span>
          </div>
        </div>
      </div>
      {/* Matched Skills */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center"><CheckCircle className="mr-2" />Matched Skills</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.matched_keywords.map((kw, i) =>
            <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" /> {kw}
            </span>
          )}
        </div>
      </div>
      {/* Missing Skills */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-yellow-700 mb-2 flex items-center"><AlertCircle className="mr-2" />Missing Skills</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.missing_skills.map((kw, i) =>
            <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" /> {kw}
            </span>
          )}
        </div>
      </div>
      {/* Improvement Tips */}
      <div className="mb-2">
        <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center"><Target className="mr-2" />Improvement Tips</h3>
        <ol className="space-y-4">
          {analysis.improvement_tips.map((tip, i) =>
            <li key={i} className="bg-blue-50 border-l-4 border-blue-400 px-5 py-3 rounded-lg flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mt-1">{i+1}</span>
              <span>
                <span className="font-semibold">{tip.split(':')[0]}:</span>
                <span className="block text-gray-700">{tip.split(':').slice(1).join(':').trim()}</span>
              </span>
            </li>
          )}
        </ol>
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={handleRestart}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {step === 'upload' && renderUploadStep()}
      {step === 'jobDescription' && renderJobDescriptionStep()}
      {step === 'analysis' && renderAnalysisStep()}
    </div>
  );
}
