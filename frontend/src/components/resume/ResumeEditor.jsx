import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  Plus, Trash2, FileText, User, Briefcase, GraduationCap, Lightbulb, FolderKanban, Award, ChevronLeft, ChevronRight, Download, FileJson, Search 
} from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import BlueModernTemplate from './templates/BlueModernTemplate';
import MinimalistGrayTemplate from './templates/MinimalistGrayTemplate';

// --- DATA --- //
const initialData = {
  personal: { name: 'Jane Doe', title: 'Full Stack Developer', email: 'jane.doe@example.com', phone: '123-456-7890', linkedin: 'linkedin.com/in/janedoe', github: 'github.com/janedoe' },
  summary: 'A passionate Full Stack Developer with 5+ years of experience...',
  experience: [{ role: 'Senior Software Engineer', company: 'Tech Solutions Inc.', dates: 'Jan 2020 - Present', description: '- Led a team of 5 developers...\n- Improved application performance by 30%...' }],
  education: [{ institution: 'University of Technology', degree: 'B.S. in Computer Science', dates: '2013 - 2017', description: 'Graduated with honors.' }],
  skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Django', 'PostgreSQL', 'Docker'],
  projects: [{ name: 'Portfolio Website', description: 'A personal portfolio website built with React and Next.js.', link: 'janedoe.com' }],
  awards: [{ name: 'Best Project Award', date: 'May 2022', summary: 'Awarded for excellence in the final year project.', institution: 'University of Technology' }]
};

const sections = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'experience', name: 'Work', icon: Briefcase },
  { id: 'skills', name: 'Skills', icon: Lightbulb },
  { id: 'projects', name: 'Projects', icon: FolderKanban },
  { id: 'awards', name: 'Awards', icon: Award },
];

// --- FORM SECTIONS --- //
const SectionRenderer = ({ activeSection, data, setData }) => {
  // Handlers would be passed down or defined here
  // For brevity, direct manipulation is shown
  const handlePersonalChange = (e) => setData({ ...data, personal: { ...data.personal, [e.target.name]: e.target.value } });
  const handleSummaryChange = (e) => setData({ ...data, summary: e.target.value });
  const handleSkillsChange = (e) => setData({ ...data, skills: e.target.value.split(',').map(s => s.trim()) });

  const createGenericHandler = (section, index, field) => (e) => {
    const newSectionData = [...data[section]];
    newSectionData[index][field] = e.target.value;
    setData({ ...data, [section]: newSectionData });
  };

  const addGenericItem = (section, item) => () => setData({ ...data, [section]: [...data[section], item] });
  const removeGenericItem = (section, index) => () => setData({ ...data, [section]: data[section].filter((_, i) => i !== index) });

  switch (activeSection) {
    case 'profile':
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-teal-400">Profile</h2>
          <input name="name" value={data.personal.name} onChange={handlePersonalChange} placeholder="Full Name" className="input-dark" />
          <input name="title" value={data.personal.title} onChange={handlePersonalChange} placeholder="Title" className="input-dark" />
          <input name="email" value={data.personal.email} onChange={handlePersonalChange} placeholder="Email" className="input-dark" />
          <input name="phone" value={data.personal.phone} onChange={handlePersonalChange} placeholder="Phone" className="input-dark" />
          <input name="linkedin" value={data.personal.linkedin} onChange={handlePersonalChange} placeholder="LinkedIn" className="input-dark" />
          <input name="github" value={data.personal.github} onChange={handlePersonalChange} placeholder="GitHub" className="input-dark" />
          <h3 className="text-xl font-semibold text-teal-400 pt-4">Summary</h3>
          <textarea value={data.summary} onChange={handleSummaryChange} placeholder="Professional Summary" rows={5} className="input-dark" />
        </div>
      );
    case 'experience':
    case 'education':
    case 'projects':
    case 'awards':
      const itemTemplates = {
        experience: { role: '', company: '', dates: '', description: '' },
        education: { institution: '', degree: '', dates: '', description: '' },
        projects: { name: '', description: '', link: '' },
        awards: { name: '', date: '', summary: '' }
      };
      return (
        <div>
          <h2 className="text-2xl font-bold text-teal-400 capitalize mb-6">{activeSection}</h2>
          {data[activeSection].map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 space-y-3">
              {Object.keys(item).map(field => (
                <input key={field} value={item[field]} onChange={createGenericHandler(activeSection, index, field)} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="input-dark" />
              ))}
              <button onClick={removeGenericItem(activeSection, index)} className="text-red-500 hover:text-red-400 text-sm">Remove</button>
            </div>
          ))}
          <button onClick={addGenericItem(activeSection, itemTemplates[activeSection])} className="btn-secondary-dark mt-4">+ Add {activeSection}</button>
        </div>
      );
    case 'skills':
      return (
        <div>
          <h2 className="text-2xl font-bold text-teal-400">Skills</h2>
          <p className="text-sm text-gray-400 mb-2">Enter skills separated by commas.</p>
          <textarea value={data.skills.join(', ')} onChange={handleSkillsChange} placeholder="React, Node.js, Python..." rows={5} className="input-dark" />
        </div>
      );
    default: return null;
  }
};

// --- MAIN EDITOR COMPONENT --- //
const ResumeEditor = ({ template, onBack }) => {
  const [data, setData] = useState(initialData);
  const [activeSection, setActiveSection] = useState('profile');
  const componentRef = useRef();
  const previewContainerRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  const handlePrint = useReactToPrint({ content: () => componentRef.current, pageStyle: `@media print { @page { size: 8.5in 11in; margin: 0; } }` });

  useEffect(() => {
    const calculateScale = () => {
      if (!previewContainerRef.current) return;
      const container = previewContainerRef.current;
      const style = window.getComputedStyle(container);
      const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const availableWidth = container.offsetWidth - paddingX;
      const resumeWidth = 816; // 8.5in @ 96dpi
      setScale(Math.min(1, availableWidth / resumeWidth));
    };
    const timeoutId = setTimeout(calculateScale, 150);
    window.addEventListener('resize', calculateScale);
    return () => {
      window.removeEventListener('resize', calculateScale);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleNav = (direction) => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const nextIndex = (currentIndex + direction + sections.length) % sections.length;
    setActiveSection(sections[nextIndex].id);
  };

  const templates = { 
    'Modern Professional': <ModernTemplate data={data} />,
    'Minimalist Pro': <MinimalistTemplate data={data} />,
    'Classic CV': <ClassicTemplate data={data} />,
    'Blue Modern': <BlueModernTemplate data={data} />,
    'Minimalist Gray': <MinimalistGrayTemplate data={data} />
  };
  const SelectedTemplate = templates[template?.name];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">FixMyResume</h1>
          <button onClick={onBack} className="text-sm text-teal-400 hover:underline mb-8">← Back to Templates</button>
          <nav className="space-y-2">
            {sections.map(({ id, name, icon: Icon }) => (
              <button key={id} onClick={() => setActiveSection(id)} className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition-colors ${activeSection === id ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'}`}>
                <Icon size={18} className="mr-3" />
                <span>{name}</span>
              </button>
            ))}
          </nav>
        </div>
        <button className="btn-primary-dark w-full">MAKE</button>
      </aside>

      {/* Center Form Panel */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto">
          <SectionRenderer activeSection={activeSection} data={data} setData={setData} />
        </div>
        <footer className="bg-gray-800 p-4 flex justify-between items-center border-t border-gray-700">
          <button onClick={() => handleNav(-1)} className="btn-secondary-dark flex items-center"><ChevronLeft size={16} className="mr-1"/> Prev</button>
          <div className="w-1/3 h-2 bg-gray-700 rounded-full"><div className="h-2 bg-teal-500 rounded-full" style={{ width: `${(sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100}%` }}></div></div>
          <button onClick={() => handleNav(1)} className="btn-secondary-dark flex items-center">Next <ChevronRight size={16} className="ml-1"/></button>
        </footer>
      </main>

      {/* Right Preview Panel */}
      <aside className="w-1/2 bg-gray-900 border-l border-gray-700 flex flex-col">
        <header className="p-4 bg-gray-800 flex justify-between items-center border-b border-gray-700">
          <div className="flex gap-2">
            <button onClick={handlePrint} className="btn-icon-dark"><Download size={16} /> PDF</button>
            <button className="btn-icon-dark"><FileText size={16} /> LaTeX</button>
            <button className="btn-icon-dark"><FileJson size={16} /> JSON</button>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-icon-dark"><ChevronLeft size={16} /></button>
            <span>Page 1</span>
            <button className="btn-icon-dark"><ChevronRight size={16} /></button>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-icon-dark"><Search size={16} /></button>
          </div>
        </header>
        <div ref={previewContainerRef} className="flex-1 overflow-auto p-4 flex justify-center items-start">
          <div className="origin-top transform transition-transform" style={{ transform: `scale(${scale})` }}>
            <div className="w-[8.5in] h-[11in] bg-white shadow-2xl" ref={componentRef}>
              {SelectedTemplate}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ResumeEditor;
