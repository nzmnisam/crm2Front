import React, {useState} from 'react'
import { useHistory } from 'react-router'

function Login({api}) {
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        api.post(`/staff/login`, {email, password})
        .then(res => {
          console.log(res);
          console.log(res.data.token);
          window.localStorage.setItem('api_token', res.data.api_token)
          window.localStorage.setItem('role', res.data.role)
          history.push('/dashboard')
        })
    }
    
    return (
        <div>
            login
            <form>
                <input type="email" name="email" value={email} onChange={(e) => {
                                                                setEmail(e.target.value)
                                                                }}/>
                <input type="password" name="password" value={password} onChange={(e) => {
                                                    setPassword(e.target.value)
                                                                }}/>
                <button type="submit" onClick={onSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login
