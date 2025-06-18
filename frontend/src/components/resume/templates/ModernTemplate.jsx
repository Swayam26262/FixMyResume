import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const ModernTemplate = ({ data }) => {
  const { personal, summary, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-gray-800 font-sans min-h-[1123px] flex">
      {/* Left Column (Sidebar) */}
      <div className="w-1/3 bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-gray-900">{personal?.name}</h1>
        <h2 className="text-xl font-light text-blue-600 mb-8">{personal?.title}</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider border-b-2 border-gray-300 pb-2">Contact</h3>
          <div className="flex items-center"><Mail size={16} className="mr-3" /><span>{personal?.email}</span></div>
          <div className="flex items-center"><Phone size={16} className="mr-3" /><span>{personal?.phone}</span></div>
          <div className="flex items-center"><Linkedin size={16} className="mr-3" /><span>{personal?.linkedin}</span></div>
          <div className="flex items-center"><Github size={16} className="mr-3" /><span>{personal?.github}</span></div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider border-b-2 border-gray-300 pb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider border-b-2 border-gray-300 pb-2">Education</h3>
          {education?.map((edu, index) => (
            <div key={index}>
              <h4 className="font-bold">{edu.institution}</h4>
              <p className="font-semibold text-sm">{edu.degree}</p>
              <p className="text-xs text-gray-600">{edu.dates}</p>
              <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column (Main Content) */}
      <div className="w-2/3 p-8">
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Work Experience</h3>
          <div className="space-y-6">
            {experience?.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xl font-semibold text-blue-700">{exp.role}</h4>
                  <p className="text-sm font-medium text-gray-600">{exp.dates}</p>
                </div>
                <h5 className="font-semibold text-gray-700 mb-2">{exp.company}</h5>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                  {exp.description.split('\n').map((item, i) => item && <li key={i}>{item.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Projects</h3>
          <div className="space-y-4">
            {projects?.map((proj, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg">{proj.name}</h4>
                <p className="text-gray-700">{proj.description}</p>
                {proj.link && 
                  <a 
                    href={!proj.link.startsWith('http') ? `https://${proj.link}` : proj.link}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline text-sm break-all"
                  >
                    {proj.link}
                  </a>
                }
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModernTemplate;
