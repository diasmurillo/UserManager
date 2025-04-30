import { useState } from 'react'
import { apiURL } from '../services/api'
import { Link } from 'react-router-dom'
import style from './CreateUser.module.css'

function CreateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const createuser = async (newuser) => {
        try {
            const response = await fetch(`${apiURL}users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newuser)
            })
            if (!response.ok) {
                throw new Error(`Error creating user: ${response.statusText}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error("Error creating user:", error)
            return null
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newUser = {
            name, 
            email,
            phone
        }

        const createdUser = await createuser(newUser)

        if (createdUser) {
            setSuccess(true)
            setError(null)
            

            setTimeout(() => {
                setSuccess(false)
            }, 1000)
        } else {
            setError("Error creating user, try again")
            setSuccess(false)
        }
    }

    return (
        <div className={style.container}>
            <nav className={style.navContainer}>
                <ul className={style.ulNavContainer}>
                    <li>
                        <Link to='/'>
                            <button className={style.link}>Home</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/UserList'>
                            <button className={style.link}>See Users</button>
                        </Link>
                    </li>
                </ul>              
            </nav>
            <h1 className={style.title}>Create new user</h1>
            <form onSubmit={handleSubmit} className={style.formContainer}>

                <fieldset className={style.fieldset}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/>
                
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone" required/>
                </fieldset>
                {success && <p className={style.success}>User created successfully</p>}
                {error && <p className={style.error}>{error}</p>}    
                <button className={style.button} type="submit">Send</button>
            </form>
            
        </div>
    )
}

export default CreateUser