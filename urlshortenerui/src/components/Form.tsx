'use client'
import { useEffect, useState } from "react"
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



function Form() {

    const [returnedUrl, setReturnedUrl] = useState("")
    const [exampleUrl, setExampleUrl] = useState("")

    const verifyUploadedURL = z.object({
        uploadedURL: z.string().min(5, { message: "Not a Valid Link" })
    })

    const { handleSubmit, control } = useForm<z.infer<typeof verifyUploadedURL>>({
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


    return (
        <div className="mt-10 px-25 ">
            <div className="border border-white px-4 py-6">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <FieldGroup>
                        <Controller
                            name="uploadedURL"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title" className="font-outfit">
                                        
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your Email Id"
                                        type="text"
                                        className="font-outfit"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError className="font-outfit" errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}

export default Form