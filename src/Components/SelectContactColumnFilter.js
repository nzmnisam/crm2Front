import React from 'react'
import { Form } from 'react-bootstrap'

const SelectContactColumnFilter = ({column}) => {
    const {filterValue, setFilter} = column

    return (
        <div className='input-container'>
            <Form.Control 
                as="select" 
                name="contact"
                value={filterValue} onChange={(e) => {setFilter(e.target.value || undefined)}}
                
            >   
                <option value=''>Select contact method</option>
                    <option key='1' value='phone'>phone</option>
                    <option key='2' value='email'>email</option>
            </Form.Control>            
        </div>
    )
}

export default SelectContactColumnFilter
