import React from 'react'
import ContactSection from '../ContactHomeComponents/ContactSection'

function HomeContact({contact}: {contact: string}) {
  return (
    <div>
      
      <ContactSection contact={contact} />
    </div>
  )
}

export default HomeContact