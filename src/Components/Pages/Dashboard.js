import React, { useState, useEffect } from "react";
import "../../styles/Page.css";
import "../../styles/Dashboard.css";
import isEqual from "lodash.isequal";
import Tabela from "../Tabela";
import ManagerTable from "../ManagerTable";
import { Link } from "react-router-dom";
import TextColumnFilter from "../TextColumnFilter";
import DateColumnFilter from "../DateColumnFilter";
import SelectStageColumnFilter from "../SelectStageColumnFilter";
import SelectContactColumnFilter from "../SelectContactColumnFilter";
import { FunnelChart } from "react-funnel-pipeline";
import "react-funnel-pipeline/dist/index.css";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { numberFormat } from "../NumberFormat";

const employeeColumns = [
  {
    Header: <div className="header-placeholder"></div>,
    accessor: "stage",
    disableSortBy: true,
    Cell: ({ value }) => "",
    Filter: SelectStageColumnFilter,
  },
  {
    Header: "First name",
    accessor: "first_name",
    Filter: TextColumnFilter,
  },
  {
    Header: "Last name",
    accessor: "last_name",
    Filter: TextColumnFilter,
  },
  {
    Header: "Title",
    accessor: "title",
    Filter: TextColumnFilter,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Filter: TextColumnFilter,
  },
  {
    Header: "Email",
    accessor: "email",
    Filter: TextColumnFilter,
  },
  {
    Header: "Contact method",
    accessor: "contact_method",
    Filter: SelectContactColumnFilter,
  },
  {
    Header: "Company",
    accessor: "company",
    Filter: TextColumnFilter,
  },
  {
    Header: "Deal size",
    accessor: "deal_size",
    Cell: ({ value }) => numberFormat(value),
    Filter: DateColumnFilter,
  },
  {
    Header: "Follow Up Date",
    accessor: "follow_up_date",
    Cell: ({ value }) => {
      const date = DateTime.fromFormat(value, "yyyy-MM-dd").toFormat(
        "MM/dd/yyyy"
      );
      if (date === "Invalid DateTime") {
        return "/";
      }
      return date;
    },

    Filter: DateColumnFilter,
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => <Link to={`/EditContact/${value}`}>Details</Link>,
    disableSortBy: true,
    Filter: DateColumnFilter,
  },
];

const managerColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      if (value === 1) return "Active";
      return "Inactive";
    },
  },
  {
    Header: "Total deal size",
    accessor: "deal_size",
    Cell: ({ value }) => {
      if (value !== undefined) return numberFormat(value);
      return "";
    },
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => <Link to={`/ManageEmployee/${value}`}>Manage</Link>,
    disableSortBy: true,
  },
];

const Dashboard = ({ stages, contacts, role, staff, setStaff }) => {
  const [staffContacts, setStaffContacts] = useState([]);

  let table;

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (role !== "" && role !== "manager") {
      const staffId = window.localStorage.getItem("staff_id");
      let filter = contacts.filter((e) => e.staff_id == staffId);

      if (!isEqual(filter, staffContacts)) {
        const data = filter.reduce((acumulator, currentValue) => {
          const oldValue = acumulator[currentValue.stage] || 0;
          return {
            ...acumulator,
            [currentValue.stage]: oldValue + currentValue.deal_size,
          };
        }, {});
        //  console.log(data);
        const chartDataArray = Object.keys(data).map((key) => ({
          name: key,
          value: data[key],
        }));
        //  console.log(chartDataArray);
        setChartData(chartDataArray);
        setStaffContacts(filter);
      }
    } else if (role === "manager") {
      const data = contacts.reduce((acumulator, currentValue) => {
        const oldValue = acumulator[currentValue.stage] || 0;
        return {
          ...acumulator,
          [currentValue.stage]: oldValue + currentValue.deal_size,
        };
      }, {});
      //console.log(data);
      const chartDataArray = Object.keys(data).map((key) => ({
        name: key,
        value: data[key],
      }));
      // console.log(contacts);
      if (!isEqual(chartData, chartDataArray)) setChartData(chartDataArray);
    }
  }, [chartData, contacts, role, staff, staffContacts, stages]);

  if (role !== "" && role === "manager") {
    table = <ManagerTable columns={managerColumns} data={staff}></ManagerTable>;
  }
  if (role !== "" && role !== "manager") {
    table = <Tabela columns={employeeColumns} data={staffContacts} />;
  }

  return (
    <div className="container">
      <h5>My Pipeline</h5>
      <div className="funnel-chart-container">
        <h5>Pipeline By Stage</h5>
        <FunnelChart
          data={chartData}
          className="funnel-chart"
          showRunningTotal={false}
          chartWidth={400}
          chartHeight={300}
          heightRelativeToValue={true}
          pallette={["#95db93", "#93dbd5", "#967ceb", "#93aadb"]}
          showNames={false}
          showValues={false}
          getToolTip={(row) => row.name + "\n" + numberFormat(row.value)}
        />
        <div className="chart-legend">
          <h5>Stage</h5>

          <p>
            <FontAwesomeIcon
              icon={faCircle}
              className="circle-1"
            ></FontAwesomeIcon>
            1. Prospect (10%)
          </p>

          <p>
            <FontAwesomeIcon
              icon={faCircle}
              className="circle-2"
            ></FontAwesomeIcon>
            2. Forecast (50%)
          </p>
          <p>
            <FontAwesomeIcon
              icon={faCircle}
              className="circle-3"
            ></FontAwesomeIcon>
            3. Forecast (80%)
          </p>
          <p>
            <FontAwesomeIcon
              icon={faCircle}
              className="circle-4"
            ></FontAwesomeIcon>
            4. Won/Closed (100%)
          </p>
        </div>
      </div>
      {table}
    </div>
  );
};

export default Dashboard;
