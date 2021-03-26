import React, { useState } from 'react'

import {useFilters, useTable} from 'react-table'

import { Table, Form } from 'react-bootstrap'
import '../styles/Tabela.css'


export default function Tabela({ columns, data }) {
    const [filterInput, setFilterInput] = useState('');

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter('show.name', value);
        setFilterInput(value);
    }


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter
    } = useTable({
        columns,
        data
    },
    useFilters
    )
    return(
        <div class="tabela">
            <Form.Control type="text" value={filterInput} onChange={handleFilterChange} placeholder={'Search name'} />
            <Table {...getTableProps} striped hover bordered size="sm">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>

       
    )

}
