'use client'
import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field.tsx"
import axios, { isAxiosError } from "axios"
import { Input } from "./ui/input.tsx"
import { Button } from "./ui/button.tsx"
import { useMutation } from "@tanstack/react-query"
import { link } from "@/services/link.ts"
import { toast } from "sonner"
import { APIResponse } from "@/types/APIResponse.ts"
import { CircleCheck, Copy, CopyIcon, ExternalLink, Loader2 } from "lucide-react"
import { Spinner } from "./ui/spinner.tsx"
import { CircleCheckIcon } from "@animateicons/react/lucide"


function Form() {

    const [returnedUrl, setReturnedUrl] = useState("")
    const [exampleUrl, setExampleUrl] = useState(["https://github.com", "https://www.youtube.com", "https://arxiv.org/"])

    const urlRef = useRef(null)

    const verifyUploadedURL = z.object({
        uploadedURL: z.string().min(5, { message: "Not a Valid Link" })
    })

    const { handleSubmit, control, setValue } = useForm<z.infer<typeof verifyUploadedURL>>({
        resolver: zodResolver(verifyUploadedURL),
        defaultValues: {
            uploadedURL: ""
        }
    })

    const uploadUrl = useMutation({
        mutationFn: (data: z.infer<typeof verifyUploadedURL>) => link.uploadUrl<APIResponse>(data),

        onSuccess: (response) => {
            setReturnedUrl(response.data.data)
            toast.success("Success", {
                description: response.data.message
            })
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.message)
            }
        }
    })

    const submitHandler = (data: z.infer<typeof verifyUploadedURL>) => uploadUrl.mutate(data)  // use tanstack query

    const copyOnClipboard = () => {
        window.navigator.clipboard.writeText(returnedUrl)
        toast.success("Success", {
            description: "Url Copied!",
            classNames: {
                description: "!text-black"
            },
        })
    }


    return (
        <>
            <div className="mt-10 px-25">
                <section className="border border-white/20 px-12 py-10 bg-gray-800/18 rounded-xl">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <FieldGroup className="flex-row items-center gap-3">
                            <Controller
                                name="uploadedURL"
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
                            <Button type="submit" className='w-40 font-outfit h-20 text-xl' disabled={uploadUrl.isPending}>
                                {uploadUrl.isPending ? (
                                    <>
                                        <Spinner className="mr-1 size-5" />
                                        Please wait
                                    </>
                                ) : (
                                    "Shorten Link"
                                )}
                            </Button>
                        </FieldGroup>
                    </form>
                    <div className=" mt-6">
                        <p className="text-muted-foreground text-[14px] font-outfit">Try an example below:</p>
                        <div className="mt-4 flex gap-6">
                            {
                                exampleUrl.map((url, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => setValue("uploadedURL", url)}
                                        className="bg-black border border-white/20 hover:bg-muted-foreground/20 px-8 py-6 text-base font-normal font-outfit"
                                    >
                                        <ExternalLink />
                                        {url}
                                    </Button>
                                ))
                            }
                        </div>
                    </div>
                </section >
                {
                    returnedUrl ?
                        <div className="border border-white mt-6 px-12 py-6 flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <CircleCheckIcon color="#c96442" size={70} duration={1} className="animate-in" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-outfit text-primary">Your link is ready!</p>
                                    <Input ref={urlRef} value={returnedUrl} readOnly className="font-outfit !text-3xl border-0 px-0" />

                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <Button
                                    onClick={copyOnClipboard}
                                    className="bg-black border border-white/20 hover:bg-muted-foreground/20 px-6 py-10 text-lg font-normal font-outfit"
                                >
                                    <CopyIcon size={10} />
                                    Copy
                                </Button>
                                <Button
                                    className="bg-black border border-white/20 hover:bg-muted-foreground/20 px-6 h-20 text-lg font-normal font-outfit text-primary"
                                >
                                    <ExternalLink color="#c96442" />
                                    Open
                                </Button>
                            </div>
                        </div>
                        :
                        null
                }
            </div >
        </>
    )
}

export default Form