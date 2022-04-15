import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Row, Col, Layout, PageHeader } from 'antd';
import { RoundList } from './roundlist';
import { RoundStats } from './roundstats/roundstats';
const { Content } = Layout;

export const App = () => {
  return (
    <HashRouter>
      <Layout
        style={{ height: '100%' }}>
        <PageHeader
          className="site-page-header"
          title={
            <>
              {"Paradise Stats - "}
              <a href="https://github.com/AffectedArc07/ParaStats">
                Source
              </a>
            </>
          }
        />
        <Layout>
          <Content style={{ padding: '16px' }}>
            <Row>
              <Col span={3} />
              <Col span={18}>
                <Routes>
                  <Route path="/" element={<RoundList />} />
                  <Route path="/round/:round_id" element={<RoundStats />} />
                </Routes>
              </Col>
              <Col span={3} />
            </Row>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
};
