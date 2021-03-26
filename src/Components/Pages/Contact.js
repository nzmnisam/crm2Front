import React, {Component} from 'react'



class Contact extends Component {
    render() {
        const {id, first_name, title } = this.props.contact
        return (
            <div>
                {id} {first_name} {title}
            </div>
        )
    }
}
export default Contact