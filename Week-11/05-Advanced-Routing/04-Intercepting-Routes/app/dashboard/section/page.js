import Link from 'next/link'
import React from 'react'

// Flow: Section > Dashboard > Profile
const SectionPage = () => {
  return (
    <div>
      <h1>Section</h1>
      <Link href={"/setting"}>Go to Settings</Link>
      <Link href={"/admin"}>Go to Admin</Link>
    </div>
  )
}

export default SectionPage
