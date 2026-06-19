import Faq from "@/components/Faq";
import Form from "@/components/Form";
import { ChartCandlestick, ChartNetwork, Hand, LinkIcon, ShieldCheck, TabletSmartphone, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="items-center justify-center bg-black text-white">
      <Navbar />
      <div className='flex flex-col border-black border-2 px-25 py-4 mt-6 items-center'>
        <div className='border border-primary w-fit rounded-3xl p-2 px-8 font-outfit text-[14px] text-primary'>
          FAST • SECURE • RELIABLE
        </div>
        <section className='flex flex-col items-center mt-8 gap-1.5'>
          <h2 className='text-6xl font-outfit font-semibold tracking-wide text-secondary '>Shorten Links,</h2>
          <h2 className='text-6xl font-outfit font-semibold tracking-wide text-primary'>Elevate Sharings</h2>
          <p className='font-outfit font-light mt-3 w-115 p-2 text-center text-gray-300 '>Transform long, cluttered URLs into clean and memorable links in just a click</p>
        </section>
      </div>
      <div>
        <Form />
      </div>
      <section id="feature_section" className="px-30 py-4 mt-10 flex flex-col gap-12">
        <div className="flex justify-between">
          <div className="flex flex-col items-center w-80 gap-2">
            <ThumbsUp size={50} strokeWidth={1.5} color="#c96442" />
            <h1 className="font-outfit font-semibold text-3xl">Easy</h1>
            <p className="text-center font-outfit">Shortly is easy and fast, enter the long link to get your shortened link</p>
          </div>
          <div className="flex flex-col items-center w-80 gap-2">
            <LinkIcon size={50} strokeWidth={1.5} color="#c96442" />
            <h1 className="font-outfit font-semibold text-3xl">Shortened</h1>
            <p className="text-center font-outfit">Use any link, no matter what size, ShortURL always shortens</p>
          </div>
          <div className="flex flex-col items-center w-80 gap-2">
            <ShieldCheck size={50} strokeWidth={1.5} color="#c96442" />
            <h1 className="font-outfit font-semibold text-3xl">Secure</h1>
            <p className="text-center font-outfit">It is fast and secure, our service has HTTPS protocol and data encryptio</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-center w-80 gap-2">
            <ChartCandlestick size={50} strokeWidth={1.5} color="#c96442" />
            <h1 className="font-outfit font-semibold text-3xl">Statistics</h1>
            <p className="text-center font-outfit">Check the number of clicks that your shortened URL received</p>
          </div>
          <div className="flex flex-col items-center w-80 gap-2">
            <Hand size={50} strokeWidth={1.5} color="#c96442" />
            <h1 className="font-outfit font-semibold text-3xl">Reliable</h1>
            <p className="text-center font-outfit">All links that try to disseminate spam, viruses and malware are deleted</p>
          </div>
          <div className="flex flex-col items-center w-80 gap-2">
            <TabletSmartphone size={50} strokeWidth={1.5} color="#c96442" />
            <h1 className="font-outfit font-semibold text-3xl">Devices</h1>
            <p className="text-center font-outfit">Compatible with smartphones, tablets and desktop</p>
          </div>
        </div>
      </section>
      <Faq />
      <Separator className="my-5" />
      <footer className="pb-5 text-center text-lg font-outfit">
        © 2026 Shortly - Tool to shorten a long link
      </footer>
    </div>
  );
}
