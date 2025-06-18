import React from 'react';

const MinimalistTemplate = ({ data }) => {
  return (
    <div className="p-8 bg-white font-serif min-h-[1123px]">
      <h1 className="text-3xl text-center font-light tracking-widest uppercase mb-4">{data?.name || 'Your Name'}</h1>
      <p className="text-center text-sm text-gray-500 mb-8">{data?.email || 'your.email@example.com'}</p>
      <section>
        <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-gray-300 pb-2 mb-4">Experience</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{data?.experience || 'Your work experience...'}</p>
      </section>
    </div>
  );
};

export default MinimalistTemplate;
