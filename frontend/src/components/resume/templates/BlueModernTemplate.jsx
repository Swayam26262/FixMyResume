import React from 'react';

const BlueModernTemplate = ({ data }) => {
  const { personal, summary, experience, education, skills, projects } = data;

  return (
    <div className="bg-white font-sans text-gray-800 min-h-[1123px] flex">
      <div className="w-1/3 bg-blue-700 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{personal?.name}</h1>
        <h2 className="text-lg font-light mb-8">{personal?.title}</h2>

        <section className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 border-b-2 border-blue-400 pb-1">Contact</h3>
          <p className="text-xs mb-1">{personal?.email}</p>
          <p className="text-xs mb-1">{personal?.phone}</p>
          <p className="text-xs">{personal?.linkedin}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 border-b-2 border-blue-400 pb-1">Education</h3>
          {education?.map((edu, index) => (
            <div key={index} className="mb-3">
              <h4 className="text-sm font-bold">{edu.degree}</h4>
              <p className="text-xs italic">{edu.institution}</p>
              <p className="text-xs text-blue-200">{edu.dates}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 border-b-2 border-blue-400 pb-1">Skills</h3>
          <ul className="text-xs list-disc list-inside">
            {skills?.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>
        </section>
      </div>

      <div className="w-2/3 p-8">
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 border-b-4 border-blue-200 pb-1 mb-4 uppercase tracking-wider">Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 border-b-4 border-blue-200 pb-1 mb-4 uppercase tracking-wider">Experience</h2>
          {experience?.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="text-sm font-medium text-gray-600 mb-1">{exp.company} | {exp.dates}</p>
              <ul className="list-disc list-inside text-sm space-y-1 pl-4">
                {exp.description.split('\n').map((item, i) => item && <li key={i}>{item.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold text-blue-800 border-b-4 border-blue-200 pb-1 mb-4 uppercase tracking-wider">Projects</h2>
          {projects?.map((proj, index) => (
            <div key={index} className="mb-3">
              <h3 className="text-lg font-semibold">{proj.name}</h3>
              <p className="text-sm">{proj.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BlueModernTemplate;
