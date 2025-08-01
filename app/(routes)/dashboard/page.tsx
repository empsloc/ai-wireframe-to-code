import React from 'react'
import ImageUpload from './_components/ImageUpload'

function Dashboard() {
    return (
        <div className='md:px-20 lg:px-20 xl:px-40'>
            <h2 className='font-bold text-3xl'>
                Convert Wireframe to Code
            </h2>
            <ImageUpload/>
        </div>
    )
}

export default Dashboard