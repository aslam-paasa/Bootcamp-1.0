import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
    return (
        <div>
            <h1>DashboardPage</h1>
            <Link href={"/dashboard/reports"}>View Reports</Link>
            <Link href={"/dashboard/section"}>Go to Section</Link>
            <Link href={"/profile"}>Go to Profile</Link>
        </div>
    )
}

export default DashboardPage