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
                throw new Error(`Erro ao criar o usuario: ${response.statusText}`)
            }

            const data = await response.json()
            console.log("success")
            return data
        } catch (error) {
            console.error("Erro ao criar usuario:", error)
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
        } else {
            setError("Erro ao criar o usuario, tente novamente")
            setSuccess(false)
        }
    }

    return (
        <div className={style.container}>
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
            <Link to='/UserList' >Ver usuarios</Link>
        </div>
    )
}

export default CreateUser