import AnalyticsForm from '@/components/AnalyticsForm'
import Navbar from '@/components/Navbar'
import React from 'react'



function page() {


    return (
        <div className="items-center justify-center bg-black text-white min-h-screen">
            <Navbar />
            <div className='px-30 py-4 font-outfit'>
                <div>
                    <h2 className='text-4xl font-medium'>Link Analytics</h2>
                    <p className='text-lg mt-2 font-light text-muted-foreground'>Track Performance for your link</p>
                </div>
                    <AnalyticsForm />
            </div>
        </div>
    )
}

export default page