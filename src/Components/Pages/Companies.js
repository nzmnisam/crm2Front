import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import isEqual from "lodash.isequal";
import { numberFormat } from "../NumberFormat";
import { Button } from "react-bootstrap";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";

import ManagerTable from "../ManagerTable";
import TextColumnFilter from "../TextColumnFilter";
import DateColumnFilter from "../DateColumnFilter";

const companyColumns = [
  {
    Header: "Name",
    accessor: "company",
    Filter: TextColumnFilter,
  },
  {
    Header: "Address",
    accessor: "address",
    Filter: TextColumnFilter,
  },
  {
    Header: "Address2",
    accessor: "address2",
    Filter: TextColumnFilter,
  },
  {
    Header: "Website",
    accessor: "website_url",
    Filter: TextColumnFilter,
  },
  {
    Header: "City",
    accessor: "company_city",
    Filter: TextColumnFilter,
  },
  {
    Header: "Company Deal Size",
    accessor: "company_deal_size",
    Cell: ({ value }) => {
      if (value !== undefined) return numberFormat(value);
      return "";
    },
    Filter: DateColumnFilter,
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => <Link to={`/EditCompany/${value}`}>Edit</Link>,
    disableSortBy: true,
    Filter: DateColumnFilter,
  },
];

const Companies = ({
  companies,
  setCompanies,
  staff,
  api,
  companiesDetailed,
  setCompaniesDetailed,
}) => {
  let table;
  const history = useHistory();

  const chartData = companiesDetailed.map((c, i) => {
    let object = {
      x: c.company,
      y: c.company_deal_size,
    };
    return object;
  });

  const addNew = (e) => {
    e.preventDefault();
    history.push(`/AddCompany`);
  };

  table = (
    <ManagerTable
      columns={companyColumns}
      data={companiesDetailed}
    ></ManagerTable>
  );

  return (
    <div className="container">
      <div>
        <XYPlot
          margin={{ left: 100, bottom: 150 }}
          xType="ordinal"
          width={1000}
          height={500}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={-45} />
          <YAxis />
          <VerticalBarSeries data={chartData} />
        </XYPlot>
      </div>
      {table}
      <Button type="submit" className="add-button" onClick={addNew}>
        Add New
      </Button>
    </div>
  );
};

export default Companies;
