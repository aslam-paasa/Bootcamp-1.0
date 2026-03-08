import React from 'react'

const Page = ({params}) => {
    return (
        <div>{params.slug?.join('/')}</div>
    )
}

export default Page