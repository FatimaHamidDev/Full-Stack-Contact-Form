import React from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')  

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/api/contact', {
        name,
        email,
        message
      })

      alert(response.data.message)

      // Clear form
      setName('')
      setEmail('')
      setMessage('')

    } catch (error) {
      console.error(error)
      alert('Error sending message')
    }
  }
  // React.useEffect(() => {
  //     console.log("Updated values:", { name, email, message })
  // }, [name, email, message])
  
  
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        /><br />

        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        /><br />

        <textarea 
          placeholder="Enter your message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App