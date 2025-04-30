import { useEffect, useState } from "react"
import { apiURL } from "../services/api"
import { Link } from "react-router-dom"
import style from './UserList.module.css'

function UserList() {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleListUser = async () => {
        try {
            setIsLoading(true)
           const response = await fetch(`${apiURL}users`, {
            method: 'GET'
           })

           if (!response.ok) {
            throw new Error (`Error listing users: ${response.statusText}`)
           }

           const data = await response.json()
           setUsers(data)
           setIsLoading(false)
        } catch (error) {
            setError("Failed to load users: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteUser = async(userID) => {
        const confirm = window.confirm("Tem certeza?")

        if (confirm) {
            try {
                const response = await fetch(`${apiURL}users/${userID}`, {
                    method: 'DELETE'
                })

                if (!response.ok) {
                    throw new Error (`Error deleting user: ${response.statusText}`)
                }

                setUsers(users.filter(user => user.id !== userID))
            }   catch (error) {
                setError("Error deleting user: ", error)
            }
        }
            
    }

    useEffect(() => {
        handleListUser()
    }, [])
    
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
                </ul>
            </nav>
            {users.length > 0 && <h1 className={style.title}>See all users</h1>}
            {isLoading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {users.length === 0 && !error && !isLoading && <p>No users found</p>}
            <div className={style.mapContainer}>
                {users.map((user) => (
                    <ul key={user.id} className={style.ulContainer}>
                        <li className={style.liContainer}>
                            <strong>Name:</strong> {user.name} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Phone:</strong> {user.phone} 
                        </li>
                        <div className={style.buttonContainer}>
                            <Link to={`/EditUser/${user.id}`}>
                                <button className={style.button}>Edit</button>
                            </Link>
                            <button className={style.button} onClick={() => handleDeleteUser(user.id)} >Delete</button>
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default UserList