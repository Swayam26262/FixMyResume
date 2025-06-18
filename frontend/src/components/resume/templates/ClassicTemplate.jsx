import React from 'react';

const ClassicTemplate = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, awards } = data;

  return (
    <div className="p-8 bg-white font-serif text-gray-800 min-h-[1123px]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-widest uppercase">{personal?.name}</h1>
        <p className="text-sm mt-2">
          {personal?.email} | {personal?.phone} | {personal?.linkedin} | {personal?.github}
        </p>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2 uppercase tracking-wider">Summary</h2>
        <p className="text-sm leading-relaxed">{summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2 uppercase tracking-wider">Experience</h2>
        {experience?.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="text-xs font-medium text-gray-600">{exp.dates}</p>
            </div>
            <h4 className="font-medium text-gray-700 mb-1">{exp.company}</h4>
            <ul className="list-disc list-inside text-sm space-y-1 pl-4">
              {exp.description.split('\n').map((item, i) => item && <li key={i}>{item.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2 uppercase tracking-wider">Education</h2>
        {education?.map((edu, index) => (
          <div key={index} className="mb-3">
            <h3 className="text-lg font-semibold">{edu.institution}</h3>
            <p className="font-medium text-gray-700">{edu.degree}</p>
            <p className="text-xs text-gray-600">{edu.dates}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2 uppercase tracking-wider">Skills</h2>
        <p className="text-sm">{skills?.join(', ')}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2 uppercase tracking-wider">Projects</h2>
        {projects?.map((proj, index) => (
          <div key={index} className="mb-3">
            <h3 className="text-lg font-semibold">{proj.name}</h3>
            <p className="text-sm">{proj.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClassicTemplate;
