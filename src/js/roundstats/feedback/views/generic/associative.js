import React from 'react';
import { Table } from 'antd';
import { TallyViewer } from './basictally';

export const AssociativeViewer = data => {
  const {
    adata,
  } = data;

  let components = [];

  Object.entries(adata).forEach(([key, value]) => {
    components.push(<TallyViewer tallydata={value} />);
  });

  const render_content = (
    <>
      {components.map(c => (
        c
      ))}
    </>
  );

  return (
    render_content
  );
};
