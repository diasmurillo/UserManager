import { useNavigate, useParams, Link } from "react-router-dom"
import { apiURL } from "../services/api"
import { useState, useEffect } from "react"
import style from './EditUser.module.css'

function EditUser() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState({name: "", email: "", phone: ""})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUser = async() => {
        try {
            const response = await fetch(`${apiURL}users/${id}`)

            if (!response.ok) {
                throw new Error ("Error loading user")
            }

            const data = await response.json()
            setUser(data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleUpdate = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${apiURL}users/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if (!response.ok) {
                throw new Error ("Error updating user")
            }

            navigate("/UserList")
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [id])

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
                        <Link to='/CreateUser'>
                            <button className={style.link}>Create User</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/UserList'>
                            <button className={style.link}>See Users</button>
                        </Link>
                    </li>
                </ul>          
            </nav>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <h1 className={style.title}>Edit user {user.name}</h1>
            <form onSubmit={handleUpdate} className={style.formContainer}>

                <fieldset className={style.fieldset}>
                    <label>Nome:</label>
                    <input name="name" value={user.name} onChange={handleChange} required />
                
                    <label>Email:</label>
                    <input name="email" value={user.email} onChange={handleChange} required />
                
                    <label>Telefone:</label>
                    <input name="phone" value={user.phone} onChange={handleChange} required />
                </fieldset>
                <button className={style.button} type="submit">Edit</button>
            </form>
        </div>
      ); 
}

export default EditUser