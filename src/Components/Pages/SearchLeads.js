import React, {useState} from 'react'
import '../../styles/Page.css'
import {Form, Button} from 'react-bootstrap'


function SearchLeads({contacts, stages}) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [stage, setStage] = useState('')
    const [company, setCompany] = useState('')
    const [followUpFrom, setFollowUpFrom] = useState('')
    const [followUpTo, setFollowUpTo] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        console.log(firstName);
        if(firstName !== '') {
            console.log(contacts.filter((e) => e.first_name === firstName))
        }
        if(firstName !== '' && lastName !== '') {
            console.log(contacts.filter((e) => (e.last_name === lastName && e.first_name === firstName)))
        }
        if(firstName !== '' && lastName !== '' && phone !== '') {
            console.log(contacts.filter((e) => (e.last_name === lastName && e.first_name === firstName && e.phone === phone)))
        }
        if(firstName !== '' && lastName !== '' && phone !== '' && email !== '') {
            console.log(contacts.filter((e) => (e.last_name === lastName && e.first_name === firstName && e.phone === phone && e.email === email)))
        }
        if(firstName !== '' && lastName !== '' && phone !== '' && email !== '' && stage !== '') {
            console.log(contacts.filter((e) => (e.last_name === lastName && e.first_name === firstName && e.phone === phone && e.email === email && e.stage_id === stage)))
        }
        if(firstName !== '' && lastName !== '' && phone !== '' && email !== '' && stage !== '' && company !== '') {
            console.log(contacts.filter((e) => (e.last_name === lastName && e.first_name === firstName && e.phone === phone && e.email === email && e.stage_id === stage && e.company === company)))
        }
        if(firstName !== '' && lastName !== '' && phone !== '' && email !== '' && stage !== '' && company !== '' && followUpFrom !== '') {
            console.log(contacts.filter((e) => (e.last_name === lastName && e.first_name === firstName && e.phone === phone && e.email === email && e.stage_id === stage && e.company === company && e.follow_up_date >= followUpFrom)))
        }
        if(firstName !== '' && lastName !== '' && phone !== ''  && email !== '' && stage !== '' && company !== '' && followUpFrom !== '' && followUpTo != '') {
            console.log(contacts.filter((e) => (e.last_name === lastName && e.first_name === firstName && e.phone === phone && e.email === email && e.stage_id === stage && e.company === company && e.follow_up_date >= followUpFrom && e.follow_up_date <= followUpTo)))
        }
        

    }


    return (
        <div className='container'>
            <h5>Search Contacts</h5>
            <div className='form-container'>
                <Form>
                    <div className='input-container'>
                        <p>
                            First name:
                        </p>
                        <Form.Control 
                            type="text" 
                            name="first-name"
                            value={firstName} onChange={(e) => {setFirstName(e.target.value)}}

                        />
                    </div>
                    <div className='input-container'> 
                        <p>
                            Last name:
                        </p>
                        <Form.Control 
                            type="text" 
                            name="last-name" 
                            value={lastName} onChange={(e) => {setLastName(e.target.value)}}
                        />
                    </div>
                    <div className='input-container'> 
                        <p>
                            Phone:
                        </p>
                        <Form.Control 
                            type="text" 
                            name="phone" 
                            value={phone} onChange={(e) => {setPhone(e.target.value)}}
                        />
                    </div>
                    <div className='input-container'> 
                        <p>
                            Email:
                        </p>
                        <Form.Control 
                            type="text" 
                            name="email" 
                            value={email} onChange={(e) => {setEmail(e.target.value)}}
                         />
                    </div>
                    <div className='input-container'> 
                        <p>
                            Stage:
                        </p>
                        <Form.Control 
                            as="select" 
                            name="stage"
                            value={stage} onChange={(e) => {setStage(e.target.value)}} 
                        >   
                            <option value=''>Select a stage</option>
                            {stages.map((stage) => (
                                <option key={stage.id} value={stage.id}>{stage.stage}</option>
                            ))}
                        </Form.Control>
                    </div>
                    <div className='input-container'> 
                        <p>
                            Company:
                        </p>
                        <Form.Control 
                            type="text" 
                            name="company" 
                            value={company} onChange={(e) => {setCompany(e.target.value)}}
                        />
                    </div>
                    <div className='input-container'> 
                        <p>
                            Follow Up (from):
                        </p>
                        <Form.Control 
                            type="date" 
                            name="follow-up-from" 
                            value={followUpFrom} onChange={(e) => {setFollowUpFrom(e.target.value)}}
                        />
                    </div>
                    <div className='input-container'> 
                        <p>
                            Follow Up (to):
                        </p>
                        <Form.Control 
                            type="date" 
                            name="follow-up-to" 
                            value={followUpTo} onChange={(e) => {setFollowUpTo(e.target.value)}}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        onClick={onSubmit}
                    >
                        Search
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SearchLeads
