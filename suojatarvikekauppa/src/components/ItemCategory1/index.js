import React from 'react'

    function Contacts() {
      render ()
      return (<div> 
        {this.state.contacts.map(contacts => 
            <div key={contacts.name}> {contacts.birth_date} </div>)}
        </div>)
    }

    export default Contacts
