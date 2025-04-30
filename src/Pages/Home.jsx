import { Link } from 'react-router-dom'
import style from './Home.module.css'

function Home() {
    return (
      <div className={style.container} >
        <h1 className={style.title}>Simple crud to learn</h1>
        <h2 className={style.subTitle}>Create new user</h2>
        <Link to='CreateUser'>
          <button className={style.button}>Create User</button>
        </Link>
        <h2 className={style.subTitle}>See all users</h2>
        <Link to='UserList'>
          <button className={style.button}>See Users</button>
        </Link>
      </div>
      )

}

export default Home