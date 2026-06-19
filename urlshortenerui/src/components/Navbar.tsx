import Link from 'next/link'

function Navbar() {
    return (
        <div className=' bg-black text-white'> 
            <nav className='p-6 px-30 bg-black text-white'>
                <div className='flex items-center justify-between'>
                    <Link href='/' className='font-outfit text-4xl font-bold'>
                        Shortly
                    </Link>
                    <div className='flex gap-10'>
                        <Link href='#feature_section' className='font-outfit text-lg font-medium'>
                            Features
                        </Link>
                        <Link href="#faq_section" className='font-outfit text-lg font-medium'>
                            FAQ
                        </Link>
                        <Link href="/analytics" className='font-outfit text-lg font-medium'>
                            Analytics
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar