/* 1. Importing Separate Server Action: (Recommended) */
import { createUser } from '@/actions'
import React from 'react'

const UserForm = () => {

  /* 1. Creating Inline Server Action: (Not Recommended) */
  // async function createUser(fromData) {
  //   "use server"
  //   const name = fromData.get("name")  // Grab the name: John Doe
  //   console.log("Creating user", name) 
  // }

  return (
    /* 2. Passing createUser to the UI */
    <form action={createUser}>
      <input name="name" placeholder="John Doe" />
      <button type="submit">Create</button>
    </form>
  )
}

export default UserForm