import React, { useMemo, useState } from "react";

import { useFilters, useSortBy, useTable, useGlobalFilter } from "react-table";

import { Table, Form } from "react-bootstrap";
import "../styles/Tabela.css";

import { numberFormat } from "./NumberFormat";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

export default function Tabela({ columns, data }) {
  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter("first_name", value);
    setFilterInput(value);
  };

  let totalDealSize = 0;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );
  return (
    <div className="tabela">
      <Table {...getTableProps} hover bordered size="sm">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span className="sort-icon">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faSortDown} />
                      ) : (
                        <FontAwesomeIcon icon={faSortUp} />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          <tr className="stage-header">
            <td colSpan="11">1. Prospect (10%)</td>
          </tr>
          {rows.map((row, i) => {
            prepareRow(row);
            totalDealSize += row.allCells[8].value;

            if (row.allCells[0].value === "1. Prospect (10%)") {
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            }
          })}
          <tr className="stage-header">
            <td colSpan="11">2. Forecast (50%)</td>
          </tr>
          {rows.map((row, i) => {
            prepareRow(row);

            if (row.allCells[0].value === "2. Forecast (50%)") {
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            }
          })}
          <tr className="stage-header">
            <td colSpan="11">3. Forecast (80%)</td>
          </tr>
          {rows.map((row, i) => {
            prepareRow(row);

            if (row.allCells[0].value === "3. Forecast (80%)") {
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            }
          })}
          <tr className="stage-header">
            <td colSpan="11">4. Won/Closed (100%)</td>
          </tr>
          {rows.map((row, i) => {
            prepareRow(row);

            if (row.allCells[0].value === "4. Won/Closed (100%)") {
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr className="total-row">
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, i) => {
                if (i === 0) {
                  return <td colSpan="8">Total:</td>;
                }
                if (i === 8) {
                  return <td colSpan="3">{numberFormat(totalDealSize)}</td>;
                }
              })
            )}
            {/* <td></td>
            <td></td>
            <td>Sum</td>
            <td>Suma</td>
            <td></td> */}
          </tr>
        </tfoot>
      </Table>

      <h5>Search Contacts</h5>
      <div className="form-container">
        <Form>
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              column.canFilter ? column.render("Filter") : null
            )
          )}
        </Form>
      </div>
    </div>
  );
}
