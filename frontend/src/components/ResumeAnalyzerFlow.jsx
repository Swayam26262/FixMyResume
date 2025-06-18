import React, { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Target, Home, Zap, FileText, Star, Wrench, ChevronLeft, ChevronRight } from 'lucide-react';
import authService from '../services/authService';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Setup pdf.js worker from an external URL
// This is important for Vite and other bundlers
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const ScoreCircle = ({ score }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center mb-4">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-purple-600"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-gray-800">{score}</span>
        <span className="text-xs text-gray-500">OVERALL</span>
      </div>
    </div>
  );
};

export default function ResumeAnalyzerFlow({ onDone, initialParsedContent = null, onViewHistory }) {
  const [activeTab, setActiveTab] = useState('score');
  const [pdfContainerWidth, setPdfContainerWidth] = useState(0);
  const pdfContainerRef = useRef(null);
  const [step, setStep] = useState(initialParsedContent ? 'jobDescription' : 'upload');
  const [resumeFile, setResumeFile] = useState(null);
  const [parsedResumeContent, setParsedResumeContent] = useState(initialParsedContent);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [dragover, setDragover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const container = pdfContainerRef.current;
    if (container) {
      const updateWidth = () => {
        setPdfContainerWidth(container.clientWidth);
      };
      updateWidth();
      const resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(container);
      window.addEventListener('resize', updateWidth);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', updateWidth);
      };
    }
  }, [analysis]);
  const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, numPages));

  const processResumeFile = async (file) => {
    setResumeFile(file);
    const formData = new FormData();
    formData.append('resume', file);
    setIsLoading(true);
    setError('');
    try {
      const response = await authService.parseResume(formData);
      setParsedResumeContent(response.content);
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
      const response = await authService.analyzeResume({
        job_description: jobDescription,
        resume_content: parsedResumeContent
      });
      setAnalysis(response.analysis);
      setStep('analysis');
      if (onDone) onDone(response.analysis);
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
    setNumPages(null);
    setCurrentPage(1);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragover(true);
    } else if (e.type === "dragleave") {
      setDragover(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragover(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processResumeFile(e.dataTransfer.files[0]);
    }
  };

  const renderUploadStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>
        <p className="text-gray-600">Upload your resume in PDF or Word format to get started</p>
      </div>
      <div className={`bg-white rounded-xl shadow-sm border-2 border-dashed ${dragover ? 'border-purple-400 bg-purple-50' : 'border-gray-300'} p-8 text-center transition-colors`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
        <input type="file" id="resume-upload-analyzer" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => processResumeFile(e.target.files[0])} />
        <label htmlFor="resume-upload-analyzer" className="cursor-pointer block">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2"><span className="font-semibold text-purple-600">Click to upload</span> or drag and drop</p>
          <p className="text-sm text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
        </label>
      </div>
      {isLoading && <div className="mt-4 text-center">Parsing your resume...</div>}
      {error && <div className="mt-4 text-center text-red-500">{error}</div>}
    </div>
  );

  const renderJobDescriptionStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Description</h2>
        <p className="text-gray-600">Paste the job description to tailor the analysis.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8">
        <textarea className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" placeholder="Paste job description here..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        <button onClick={handleAnalyze} disabled={isLoading} className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
        </button>
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </div>
  );

  const TabButton = ({ id, title, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-colors duration-200 ${activeTab === id ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 hover:text-gray-800'}`}>
      {icon}
      {title}
    </button>
  );

  const renderAnalysisStep = () => (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 min-h-screen font-sans">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-screen-2xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Analysis Result</h2>
          <div className="flex items-center gap-4">
            <button onClick={onViewHistory} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition">
              View History
            </button>
            <button onClick={handleRestart} className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-purple-700 transition">
              Analyze Another
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Analysis Tabs */}
          <div className="lg:col-span-5">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex gap-4" aria-label="Tabs">
                <TabButton id="score" title="Score & Skills" icon={<Star className="w-5 h-5" />} />
                <TabButton id="tips" title="Improvement Tips" icon={<Wrench className="w-5 h-5" />} />
              </nav>
            </div>
            <div className="py-6 overflow-y-auto h-[calc(100vh - 280px)] pr-4 custom-scrollbar">
              {activeTab === 'score' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <ScoreCircle score={analysis.score} />
                    <div className="bg-gray-50 rounded-lg p-6 my-6 text-left">
                      <h3 className="font-bold text-lg mb-2">Your resume scored {analysis.score} out of 100.</h3>
                      <p className="text-gray-600">This is a decent start, but there's clear room for improvement. Let's dive into what we checked for and how you can improve your score by {100 - analysis.score} points.</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-green-700 flex items-center mb-4"><CheckCircle className="mr-2"/> Matched Skills</h4>
                    <p className="text-gray-600 mb-4">These are skills from the job description that were found in your resume.</p>
                    <div className="flex flex-wrap gap-2">{analysis.matched_keywords.map((kw, i) => <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{kw}</span>)}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-yellow-700 flex items-center mb-4"><AlertCircle className="mr-2"/> Missing Skills</h4>
                    <p className="text-gray-600 mb-4">These are skills from the job description that were not found in your resume.</p>
                    <div className="flex flex-wrap gap-2">{analysis.missing_skills.map((kw, i) => <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">{kw}</span>)}</div>
                  </div>
                </div>
              )}
              {activeTab === 'tips' && (
                <div>
                  <h4 className="font-semibold text-lg text-blue-700 flex items-center mb-4"><Target className="mr-2"/> Improvement Tips</h4>
                  <ol className="space-y-4 list-decimal list-inside text-gray-600">{analysis.improvement_tips.map((tip, i) => <li key={i} className="pl-2">{tip}</li>)}</ol>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Resume Preview */}
          <div ref={pdfContainerRef} className="lg:col-span-7 bg-gray-100 rounded-xl flex flex-col h-[calc(100vh - 200px)] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-xl">
              <h3 className="font-bold text-gray-800">Resume Preview</h3>
              {numPages && (
                <div className="flex items-center gap-2">
                  <button onClick={goToPrevPage} disabled={currentPage <= 1} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 transition"><ChevronLeft className="w-5 h-5" /></button>
                  <span>Page {currentPage} of {numPages}</span>
                  <button onClick={goToNextPage} disabled={currentPage >= numPages} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 transition"><ChevronRight className="w-5 h-5" /></button>
                </div>
              )}
            </div>
            <div className="flex-1 p-2 flex justify-center items-center w-full h-full">
              {resumeFile && resumeFile.type === 'application/pdf' && pdfContainerWidth > 0 ? (
                <Document file={resumeFile} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error} className="flex justify-center w-full">
                  <Page pageNumber={currentPage} renderTextLayer={false} width={pdfContainerWidth - 20} />
                </Document>
              ) : (
                <div className="flex items-center justify-center h-full text-center p-8">
                  <p className="text-gray-500">Resume preview will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {step !== 'analysis' && <div className="py-12 px-4 sm:px-6 lg:px-8"> 
        {step === 'upload' && renderUploadStep()}
        {step === 'jobDescription' && renderJobDescriptionStep()}
      </div>}
      {step === 'analysis' && analysis && renderAnalysisStep()}
    </div>
  );
}