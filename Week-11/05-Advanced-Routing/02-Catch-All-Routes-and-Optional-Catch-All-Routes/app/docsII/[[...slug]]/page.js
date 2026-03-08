import React from 'react'

const Page = ({params}) => {
    return (
        <h1>Welcome to Docs</h1>
        <div>{params.slug?.join('/')}</div>
    )
}

export default Page