import React, { useState } from 'react';
import { Divider, Button, Tooltip } from 'antd';
import { TallyViewer } from './views/generic/basictally';
import { NestedTallyViewer } from './views/generic/nestedtally';
import { AssociativeViewer } from './views/generic/associative';

export const FeedbackHolder = data => {
  const [currentKeyData, setCurrentKeyData] = useState(
    <p><i>Select a feedback key above to visualise it</i></p>
  );

  const [currentKey, setCurrentKey] = useState(null);

  const {
    bbdata,
  } = data;

  const handleClick = keySelected => {
    setCurrentKey(keySelected);
    switch (bbdata[keySelected]["ktype"]) {
      case "associative": {
        setCurrentKeyData(
          <>
            <h1>{keySelected}</h1>
            <AssociativeViewer adata={bbdata[keySelected]["kdata"]} />
          </>
        );
        break;
      }

      case "tally": {
        setCurrentKeyData(
          <>
            <h1>{keySelected}</h1>
            <TallyViewer tallydata={bbdata[keySelected]["kdata"]} />
          </>
        );
        break;
      }

      case "nested tally": {
        setCurrentKeyData(
          <>
            <h1>{keySelected}</h1>
            <NestedTallyViewer tallydata={bbdata[keySelected]["kdata"]} />
          </>
        );
        break;
      }
    }
  };

  let feedback_keys = [];

  let tooltip_keys = [];

  Object.entries(bbdata).forEach(([key, value]) => {
    feedback_keys.push(key);
    if (value["ktype"] === "amount" || value["ktype"] === "text") {
      tooltip_keys.push(key);
    }
  });

  return (
    <>
      <h3>Round statistics</h3>
      {feedback_keys.map(k => (
        // If its a number or text, just tooltip it and disable the window
        tooltip_keys.includes(k)
          ? (
            <Tooltip title={bbdata[k]["kdata"]} key={k}>
              <Button ghost style={{ margin: "2px" }} type={"primary"} disabled>{k}</Button>
            </Tooltip>
          )
          : (
            <Button ghost style={{ margin: "2px" }} type={"primary"} danger={currentKey === k} key={k} onClick={() => handleClick(k)}>{k}</Button>
          )
      ))}
      <Divider plain />
      {currentKeyData}
    </>
  );
};
