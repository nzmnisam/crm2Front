import React from 'react'
import { Form } from 'react-bootstrap'
import '../styles/Page.css'

const TextColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column

    return (
        <span className='input-container'>
            <Form.Control value={filterValue || ''} onChange={(e => setFilter(e.target.value))} placeholder={column.render('Header')} type="text"/>
        </span>
    )
}

export default TextColumnFilter
