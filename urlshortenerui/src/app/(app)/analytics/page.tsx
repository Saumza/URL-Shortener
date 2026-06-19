import AnalyticsForm from '@/components/AnalyticsForm'
import Navbar from '@/components/Navbar'
import React from 'react'



function page() {


    return (
        <div className="items-center justify-center bg-black text-white min-h-screen">
            <Navbar />
            <div className='px-30 py-4'>
                <div>
                    <h2>Link Analytics</h2>
                    <p>Track Performance for your link</p>
                </div>
                <div className='border border-white/20 px-12 py-10 bg-gray-800/18 rounded-xl mt-10'>
                    <AnalyticsForm />
                </div>
            </div>
        </div>
    )
}

export default page