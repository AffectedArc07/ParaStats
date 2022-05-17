import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Spin, PageHeader, Typography, Divider } from 'antd';
import { API } from '../apimanager';
import { RDP } from '../rounddataparser';
import { FeedbackHolder } from './feedback/feedbackholder';

export const RoundStats = () => {
  const { round_id } = useParams();
  const navigate = useNavigate();

  const [roundData, setRoundData] = useState({});
  const [round404, setRound404] = useState(false);

  const getRoundData = async () => {
    let round_data = await API.getRound(round_id);
    if (round_data) {
      setRoundData(round_data);
      setRound404(false);
    } else {
      setRound404(true);
    }
  };

  // Get our round data
  useEffect(() => {
    getRoundData();
  }, [window.location.href]);

  const pageheader = (
    <PageHeader
      title={"Round #" + round_id}
      onBack={() => navigate("/")}
    />
  );

  if (round404) {
    return (
      <>
        {pageheader}
        <Typography.Title>Error 404</Typography.Title>
        The round you requested either doesnt exist, or is still ongoing.
      </>
    );
  }

  if (Object.keys(roundData).length === 0) {
    return (
      <>
        {pageheader}
        <Row>
          <Col span={3} />
          <Col span={16} style={{ "textAlign": "center" }}>
            <Spin size="large" tip={"Loading..."} />
          </Col>
          <Col span={3} />
        </Row>
      </>
    );
  }

  return (
    <>
      {pageheader}
      <div style={{ "text-align": "center", "margin-bottom": "10px" }}>
        {RDP.modeImage(roundData["metadata"]["game_mode"], roundData["metadata"]["game_mode_result"])}
      </div>
      <Row>
        <Col span={12}>
          {RDP.getMetadataTable(roundData["metadata"])}
        </Col>
        <Col span={12}>
          {RDP.getPlayerGraph(roundData["popcounts"])}
        </Col>
      </Row>
      <Divider plain />
      <FeedbackHolder bbdata={roundData["blackbox"]} />
    </>
  );
};
