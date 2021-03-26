import React, {Component} from 'react'
import axios from 'axios'
import Contact from './Contact'
import '../../styles/Component.css'


class Dashboard extends Component {
    state = {
        contacts: [],
        contact: {},
        url: 'http://127.0.0.1:8000/api/contacts'
    }

    getContacts = async() => {
        fetch(this.state.url)
        .then(res => res.json())
        .then(data => console.log(data))
        // .then( json => {
        //     this.setState({
        //         contacts: json.data,
        //     })
        // })
    }
    // componentDidMount(){
    //     this.getContacts();
    //   }

    render() {
        const contacts = this.contacts;
        return (
            <div className='container'>
                dashboard

            </div>
        )
    }
}



export default Dashboard
