import React from 'react';
import { Table } from 'antd';

export const TallyViewer = data => {
  // Aight, this one is just a basic table

  const {
    tallydata,
  } = data;

  const table_cols = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => a.value - b.value,
    },
  ];

  let table_data = [];

  Object.entries(tallydata).forEach(([key, value]) => {
    let this_entry = {};
    this_entry["key"] = key;
    this_entry["name"] = key;
    this_entry["value"] = value;
    table_data.push(this_entry);
  });

  return (
    <Table columns={table_cols} dataSource={table_data} pagination={false} />
  );
};
