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
import ActiveStaffFilter from "../ActiveStaffFilter";

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
    Filter: TextColumnFilter,
  },
  {
    Header: "Email",
    accessor: "email",
    Filter: TextColumnFilter,
  },
  {
    Header: "Role",
    accessor: "role",
    Filter: TextColumnFilter,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      if (value === 1) return "Active";
      return "Inactive";
    },
    Filter: ActiveStaffFilter,
  },
  {
    Header: "Total deal size",
    accessor: "deal_size",
    Cell: ({ value }) => {
      if (value !== undefined) return numberFormat(value);
      return "";
    },
    Filter: DateColumnFilter,
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => <Link to={`/ManageEmployee/${value}`}>Manage</Link>,
    disableSortBy: true,
    Filter: DateColumnFilter,
  },
];

const Dashboard = ({ stages, contacts, role, staff, setStaff }) => {
  const [staffContacts, setStaffContacts] = useState([]);

  let table;

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (role !== "" && role === "sales") {
      const staffId = window.localStorage.getItem("staff_id");
      let filter = contacts.filter(
        (item) => item.contact_staff_id === parseInt(staffId)
      );
      if (!isEqual(filter, staffContacts)) {
        const data = filter.reduce((acumulator, currentValue) => {
          const oldValue = acumulator[currentValue.stage] || 0;

          return {
            ...acumulator,
            [currentValue.stage]: oldValue + currentValue.deal_size,
          };
        }, {});

        const chartDataArray = Object.keys(data).map((key) => ({
          name: key,
          value: data[key],
        }));
        //  console.log(chartDataArray);
        setChartData(chartDataArray);
        setStaffContacts(filter);
      }
    } else if (role === "manager") {
      //nadji sve idjeve podredjenih trenutnom menadzeru
      const staffId = JSON.parse(localStorage.getItem("staff_id"));
      let managerStaffIds = [];
      let index = 0;
      staff.forEach((member) => {
        if (staffId === member.manager_id) {
          managerStaffIds[index] = member.id;
          index++;
        }
      });
      //nadji sve kontakte podredjenih
      let currentManagerContacts = [];
      index = 0;
      contacts.forEach((c) => {
        if (managerStaffIds.includes(c.staff_id)) {
          currentManagerContacts[index] = c;
          index++;
        }
      });
      //data za funel chart
      const data = currentManagerContacts.reduce((acumulator, currentValue) => {
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
    const staffId = JSON.parse(localStorage.getItem("staff_id"));
    let managerStaff = [];
    let index = 0;
    staff.forEach((member) => {
      if (staffId === member.manager_id) {
        managerStaff[index] = member;
        index++;
      }
    });
    table = (
      <ManagerTable columns={managerColumns} data={managerStaff}></ManagerTable>
    );
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
      </div>
      {table}
    </div>
  );
};

export default Dashboard;
