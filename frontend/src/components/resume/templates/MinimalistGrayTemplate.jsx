import React from 'react';

const MinimalistGrayTemplate = ({ data }) => {
  const { personal, summary, experience, education, skills, projects } = data;

  return (
    <div className="bg-gray-50 font-light text-gray-700 min-h-[1123px] p-10">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-thin tracking-widest uppercase">{personal?.name}</h1>
        <p className="text-sm tracking-wider mt-2">
          {personal?.email} &bull; {personal?.phone} &bull; {personal?.linkedin}
        </p>
      </header>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest border-b pb-2 mb-4">Summary</h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest border-b pb-2 mb-4">Experience</h2>
            {experience?.map((exp, index) => (
              <div key={index} className="mb-5">
                <h3 className="text-lg font-medium">{exp.role}</h3>
                <p className="text-xs text-gray-500 mb-1">{exp.company} / {exp.dates}</p>
                <ul className="list-disc list-inside text-sm space-y-1 pl-4 font-light">
                  {exp.description.split('\n').map((item, i) => item && <li key={i}>{item.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest border-b pb-2 mb-4">Projects</h2>
            {projects?.map((proj, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium">{proj.name}</h3>
                <p className="text-sm font-light">{proj.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-1">
          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest border-b pb-2 mb-4">Education</h2>
            {education?.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-base font-medium">{edu.institution}</h3>
                <p className="text-sm">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.dates}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest border-b pb-2 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills?.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MinimalistGrayTemplate;
