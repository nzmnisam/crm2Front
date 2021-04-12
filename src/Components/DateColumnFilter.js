import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { DateTime } from 'luxon'

const DateColumnFilter = ({column}) => {
    // const {filterValue, setFilter, preFilteredRows} = column
    // const [dateFrom, setDateFrom] = useState('')
    // const [dateTo, setDateTo] = useState('')

    // useEffect(() => {
    //     // console.log(dateTo)
    //     // console.log(dateFrom)
    //     console.log(filterValue)
    //     console.log(preFilteredRows)

    //     const newDateTo = DateTime.fromFormat(dateTo, 'yyyy-MM-dd').toMillis()
    //     console.log(newDateTo)
    //     const newDateFrom = DateTime.fromFormat(dateFrom, 'yyyy-MM-dd').toMillis()
    //     console.log(newDateFrom)

    //     if(newDateFrom && newDateTo) {
    //         setFilter([newDateFrom, newDateTo])
    //     } else if (newDateFrom){
    //         setFilter([newDateFrom, Date.now()])
    //     } else if (newDateTo) {
    //         setFilter([0,newDateTo])
    //     }
    // }, [dateFrom, dateTo])

    return (
        <div>
            {/* <Form.Control 
                type="date" 
                name="date-from" 
                value={ dateFrom } onChange={
                    (e) => {
                  //      setDateFrom(DateTime.fromFormat(e.target.value, 'yyyy-MM-dd').toMillis())
                        setDateFrom(e.target.value)
                    }}
            />
            <Form.Control 
                type="date" 
                name="date-to" 
                value={ dateTo } onChange={
                    (e) => {
                    //    setDateTo(DateTime.fromFormat(e.target.value, 'yyyy-MM-dd').toMillis())
                        setDateTo(e.target.value)
                    }}
            />             */}
        </div>
    )
}

export default DateColumnFilter
