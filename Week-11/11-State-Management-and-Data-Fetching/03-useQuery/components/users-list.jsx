/**
 * What is useQuery?
 * > useQuery is a React hook that: 
 *   Fetches server data and manages everything around it automatically.
 * > It handles:
 *   - Fetching
 *   - Loading State
 *   - Error State
 *   - Caching
 *   - Refetching
 *   - Data Synch
 * > You just ask for data - TanStack Query does the rest.
 * > Avoid useQuery for:
 *   - Form submission
 *   - Create/Update/Delete Actions
*/


/**
 * Step-6: UserList Component (VVI)
 * > We will make this "use client" component.
 * > In this component, we want to fetch the data from backend
*/ 

"use client";
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/* 6.a. Fetch Data using useQuery */ 
async function fetchUsers() {
  const response = await fetch("/api/users")
  return response.json()
}

/* 6.b. Get Simple Data */ 
const UsersList = () => {
    const {data:users , isLoading , error , isError} = useQuery({
        queryKey:["users"],
        queryFn:fetchUsers
    })

  if (isLoading) return <div className="p-4">Loading users...</div>
  if (isError) return <div className="p-4 text-red-500">Error: {error.message}</div>

  console.log(users)
  
  return (
     <Card>
      <CardHeader>
        <CardTitle>Users List (useQuery Example)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {users?.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default UsersList