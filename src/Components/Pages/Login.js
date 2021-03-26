import React, {useState} from 'react'
import { useHistory } from 'react-router'
import {Form, Button} from 'react-bootstrap'
import '../../styles/Login.css'

function Login({api, setRole}) {
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        api.post(`/staff/login`, {email, password})
        .then(res => {
          window.localStorage.setItem('api_token', res.data.api_token)
          window.localStorage.setItem('role', res.data.role)
          setRole(res.data.role)
          history.push('/dashboard')
        })
        .catch((error) => {
            alert(error.response.data.message);
        })
    }
    
    return (
        <div className='container'>
            <h5>Staff Login</h5>
            <div className='form-container'>
                <Form>
                    <div className='input-container'>
                        <p>
                            Email:
                        </p>
                        <Form.Control 
                        type="email" 
                        name="email"
                        value={email} onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>
                    <div className='input-container'> 
                        <p>
                            Password:
                        </p>
                        <Form.Control 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <Button 
                    type="submit" 
                    onClick={onSubmit}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login
