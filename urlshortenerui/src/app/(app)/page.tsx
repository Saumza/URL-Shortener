import Form from "@/components/Form";
import Link from "next/link";

export default function Home() {
  return (
    <div className="items-center justify-center bg-black text-white">
      <nav className='p-6 px-25'>
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
            <Link href="/" className='font-outfit text-lg font-medium'>
              Analytics
            </Link>
          </div>
        </div>
      </nav>
      <div className='flex flex-col border-black border-2 px-25 py-4 mt-6 items-center'>
        <div className='border w-fit rounded-3xl p-2 px-8 font-outfit text-[14px]'>
          FAST • SECURE • RELIABLE
        </div>
        <section className='flex flex-col items-center mt-8 gap-1.5'>
          <h2 className='text-6xl font-outfit font-semibold tracking-wide text-secondary'>Shorten Links,</h2>
          <h2 className='text-6xl font-outfit font-semibold tracking-wide text-secondary'>Elevate Sharings</h2>
          <p className='font-outfit font-light mt-3 w-115 p-2 text-center text-gray-300 '>Transform long, cluttered URLs into clean and memorable links in just a click</p>
        </section>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}
