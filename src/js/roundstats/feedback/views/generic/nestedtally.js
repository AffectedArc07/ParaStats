import React from 'react';
import { TallyViewer } from './basictally';

export const NestedTallyViewer = data => {
  // This is a bit more advanced than the regular tally, but its a similar premise, just a group of tables instead of 1.
  const {
    tallydata,
  } = data;

  let components = [];

  Object.entries(tallydata).forEach(([key, value]) => {
    components.push(<h2 key={key + "-header"}>{key}</h2>);
    let target_data = value;
    if (Number.isInteger(target_data)) {
      // Make it not aids
      let new_dict = {};
      new_dict[key] = value;
      target_data = new_dict;
    }
    components.push(<TallyViewer tallydata={target_data} key={key} />);
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
