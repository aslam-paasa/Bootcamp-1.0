import Link from "next/link"

const Dashboard = () => {
  return (
    <div>
        <h1>Welcome to the Dashboard</h1>
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/dashboard/profile">Profile</Link>
                </li>
                <li>
                    <Link href="/dashboard/settings">Settings</Link>
                </li> 
            </ul>
        </nav>
    </div>
  )
}

export default Dashboard