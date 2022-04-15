import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Spin, Table, Button, PageHeader } from 'antd';
import { API } from './apimanager';
import { RDP } from './rounddataparser';

export const RoundList = () => {
  const [roundList, setRoundList] = useState([]);
  const [currentlyLoading, setCurrentlyLoading] = useState(false);


  const getRoundList = async offset => {
    await API.loadRounds(offset);
    setRoundList(API.getRounds());
  };

  // Get our round list
  useEffect(() => {
    if (roundList.length === 0) {
      getRoundList();
    }
  }, []);

  const pageheader = (
    <PageHeader
      title="Round Listing"
    />
  );

  if (roundList.length === 0) {
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

  // Convert round data to antd table data
  const table_cols = [
    {
      title: 'Round ID',
      dataIndex: 'rid',
      key: 'rid',
    },
    {
      title: 'Gamemode',
      dataIndex: 'gamemode',
      key: 'gamemode',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Start Time',
      dataIndex: 'stime',
      key: 'stime',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'End Time',
      dataIndex: 'etime',
      key: 'etime',
    },
  ];

  let table_data = [];

  const loadMore = async () => {
    setCurrentlyLoading(true);
    await getRoundList(API.nextOffset());
    setCurrentlyLoading(false);
  };

  roundList.forEach(r => {
    let clean_round = {};
    clean_round["key"] = r["round_id"];
    clean_round["rid"] = RDP.formatRoundButton(r["round_id"]);
    clean_round["gamemode"] = RDP.formatMode(r["game_mode"]);
    clean_round["result"] = RDP.parseEndString(r);
    clean_round["stime"] = r["start_datetime"];
    clean_round["etime"] = r["end_datetime"];
    clean_round["duration"] = RDP.parseDuration(r);
    table_data.push(clean_round);
  });

  return (
    <>
      {pageheader}
      <Table columns={table_cols} dataSource={table_data} pagination={false} />
      <Row>
        <Col span={24} style={{ "textAlign": "center" }}>
          <Button size="large" ghost type="primary" disabled={currentlyLoading} onClick={() => loadMore()} style={{ marginTop: "20px" }}>
            {currentlyLoading ? "Loading..." : "Load More"}
          </Button>
        </Col>
      </Row>
    </>
  );
};
