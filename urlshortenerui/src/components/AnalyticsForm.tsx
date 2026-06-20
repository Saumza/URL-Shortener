'use client'
import React, { useState } from 'react'
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field.tsx"
import axios, { isAxiosError } from "axios"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useQuery } from "@tanstack/react-query"
import * as z from "zod"
import { APIResponse } from "@/types/APIResponse.ts"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { link } from "@/services/link.ts"
import { Spinner } from './ui/spinner'
import { toast } from "sonner"
import { Calendar, CalendarDaysIcon, Link } from 'lucide-react'
import { UrlData } from '@/types/UrlData'


function AnalyticsForm() {

    const [urlFound, setUrlFound] = useState<UrlData>()
    const [isFetching, setIsFetching] = useState(false)

    const verifyShortenedURL = z.object({
        shortenedUrl: z.string().max(40, { message: "Not a valid URL" })
    })

    const { handleSubmit, control, } = useForm<z.infer<typeof verifyShortenedURL>>({
        resolver: zodResolver(verifyShortenedURL),
        defaultValues: {
            shortenedUrl: ""
        }
    })



    const submitHandler = async (data: z.infer<typeof verifyShortenedURL>) => {
        setIsFetching(true)
        try {
            const response = await link.urlAnalytics<APIResponse>(data)
            setUrlFound(response.data.data)
            toast.success("Success",
                {
                    description: response.data.message,
                    classNames: {
                        description: "!text-black"
                    },
                }
            )
            setIsFetching(false)
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.response)
                toast.error(error.response?.data.message)
            }
            setIsFetching(false)
        }
    }



    return (
        <div>
            {
                urlFound ? (
                    <>
                        <div className='border border-white/20 px-12 py-10 bg-gray-800/18 rounded-xl mt-10'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-5'>
                                    <div className='border-2 border-primary rounded-full p-4 fill-primary'>
                                        <Link color='#c96442' size={30} />
                                    </div>
                                    <div className='font-outfit flex flex-col gap-2'>
                                        <p className='font-medium text-2xl'>{`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${urlFound.shortenedId}`}</p>
                                        <p className='font-light text-muted-foreground text-[14px] w-[40vw] overflow-hidden'>{urlFound.uploadedURL}</p>
                                    </div>
                                </div>
                                {/* <div className='flex gap-4 font-outfit items-center'>
                                <Calendar color='#b7b5a9' strokeWidth={1.5} size={30} />
                                <div>
                                <p className='text-muted-foreground text-[14px]'>Created On</p>
                                <p>{urlFound.createdAt}</p>
                                </div>
                                </div> */}
                            </div>
                        </div>
                        <div className='font-outfit border border-white/20 px-12 py-10 bg-gray-800/18 rounded-xl mt-10 flex flex-col gap-10 items-center'>
                            <p className='text-2xl'>Total Clicks</p>
                            <p className='text-9xl text-primary'>{urlFound.urlClicks}</p>
                            <p className='flex gap-2'> <Calendar strokeWidth={1} />All Time</p>
                        </div>
                    </>

                )
                    :
                    (
                        <>
                            <div className='border border-white/20 px-12 py-10 bg-gray-800/18 rounded-xl mt-10'>
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <FieldGroup className="flex-row items-center gap-3">
                                        <Controller
                                            name="shortenedUrl"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <Input
                                                        {...field}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="Paste your long URL Here...."
                                                        type="text"
                                                        className="p-10 font-outfit focus-visible:border-2 text-xl! bg-black border-white/20"
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError className="font-outfit" errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                        <Button type="submit" className='w-40 font-outfit h-20 text-xl' disabled={isFetching} >
                                            Fetch Analytics
                                        </Button>
                                    </FieldGroup>
                                </form>
                            </div>
                            <div className='font-outfit border border-white/20 px-12 py-10 bg-gray-800/18 rounded-xl mt-10 flex flex-col gap-10 items-center'>
                                <p className='text-2xl'>Total Clicks</p>
                                <p className='text-9xl text-primary'>0</p>
                                <p className='flex gap-2'> <Calendar strokeWidth={1} />All Time</p>
                            </div>
                        </>
                    )
            }

        </div>
    )
}

export default AnalyticsForm
