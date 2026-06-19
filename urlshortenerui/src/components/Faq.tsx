import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator'


function Faq() {
    const items = [
        {
            value: "item-1",
            trigger: "What Is a URL Shortener?",
            content:
                "A URL shortener, also known as a link shortener, is a useful tool that trims long and intricate URLs into shorter and more understandable links.",
        },
        {
            value: "item-2",
            trigger: "How Does a URL Shortener Work?",
            content:
                "URL shorteners work like simple signposts: they create new links (redirects) that serve the single purpose of bouncing users to an eventual destination. Since all URLs are essentially just instructions for where your web browser should send you online, you can think of shortening a URL as turning geographic coordinates into handy, easy-to-understand street addresses.",
        },
        {
            value: "item-3",
            trigger: "What Are the Benefits of Using a Short URL?",
            content:
                "Brands, organizations, and individuals use link shorteners to make sharing links more convenient. They make it possible to fit links into emails, social media posts, print materials, billboards, or even make it so links can be read aloud on audio-dependent media like podcasts"
        },
        {
            value: "item-4",
            trigger: "How Do I Shorten a URL for Free?",
            content:
                "You can shorten a URL for free using Shortly's link shortening platform. The process is incredibly straightforward: Just visit our URL shortener tool on your browser of choice, key in your long URL into the indicated field, and generate a shortened URL by clicking the 'Shorten URL' button.",
        },
        {
            value: "item-5",
            trigger: "How Do I Know Your Service Is Reliable and Scalable?",
            content:
                "Shortly is a cutting-edge link-shortening platform that caters to a broad user base looking for a robust method to shorten and brand links.",
        }
    ]
    return (
        <div className="px-30">
            <Separator className="mt-8"/>
            <div className="flex justify-between items-center my-10">
                <p className="font-outfit font-semibold text-4xl text-primary">Frequently Asked Questions</p>
                <Accordion type="multiple" defaultValue={["item-1"]} className="max-w-lg">
                    {items.map((item) => (
                        <AccordionItem key={item.value} value={item.value}>
                            <AccordionTrigger className="font-outfit text-lg">{item.trigger}</AccordionTrigger>
                            <AccordionContent className="font-outfit text-base">{item.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

export default Faq