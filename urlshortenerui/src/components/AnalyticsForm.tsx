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


function AnalyticsForm() {

    const [urlFound, setUrlFound] = useState("")

    const verifyShortenedURL = z.object({
        shortenedId: z.string().max(40, { message: "Not a valid URL" })
    })

    const { handleSubmit, control, } = useForm<z.infer<typeof verifyShortenedURL>>({
        resolver: zodResolver(verifyShortenedURL),
        defaultValues: {
            shortenedId: ""
        }
    })

    const returnShortenedId = ({ shortenedId }: { shortenedId: string }) => {
        const userUrl = shortenedId
        let url

        if (!(userUrl.startsWith("https://") || userUrl.startsWith("http://"))) {
            url = new URL(`https://${userUrl}`)
        }
        else {
            url = new URL(userUrl)
        }

        const pathname: string = String(url.pathname).split("/")[1]
        return pathname
    }

    const submitHandler = async (data: z.infer<typeof verifyShortenedURL>) => {

        const shortenedId = returnShortenedId(data)

        try {
            const response = await link.urlAnalytics<APIResponse>({ shortenedId })
            setUrlFound(response.data.data)
            toast.success("Success",
                {
                    description: response.data.message,
                    classNames: {
                        description: "!text-black"
                    },
                }
            )
            return response.data.data
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.message)
            }
        }
    }



    return (
        <div>
            {
                urlFound ? (
                    <>
                    {urlFound}
                    </>
                    
                )
                :
                (
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <FieldGroup className="flex-row items-center gap-3">
                            <Controller
                                name="shortenedId"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Paste your long URL Here...."
                                            type="text"
                                            className="p-10 font-outfit focus-visible:border-2 !text-xl bg-black border-white/20"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError className="font-outfit" errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Button type="submit" className='w-40 font-outfit h-20 text-xl' >
                                Shorten Link
                            </Button>
                        </FieldGroup>
                    </form>
                )
            }
        </div>
    )
}

export default AnalyticsForm
