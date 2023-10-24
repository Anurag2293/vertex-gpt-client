'use client'

import React, { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"

type Props = {}

const ImagePrompt = (props: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const selectedFile = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [description, setDescription] = useState("");

    const handleGenerateCaption = async () => {
        try {
            setLoading(true);
            const imageData: any = selectedFile.current?.files?.[0];
            const formData = new FormData();
            formData.append('image', imageData);
            const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/image/image-caption`;
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            })
            const { success, message, data } = await response.json();
            if (!success) {
                throw new Error(message);
            }
            setDescription(data);
            scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } catch (error: any) {
            console.error(error);
            alert(error.message)
        } finally {
            setLoading(false);
        }
    }

    const onFileInputChange = async ({ target }: any) => {
        if (target.files) {
            const imageData = target.files[0];
            const fileReader = new FileReader()
            fileReader.readAsDataURL(imageData);
            fileReader.onload = () => {
                setSelectedImage(fileReader.result as string);
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-20" ref={scrollRef}>
            <h1 className='text-center text-3xl my-5'>Generate Description for Images!</h1>
            <label htmlFor="">Browse Image</label>
            <form className='flex space-x-4' encType='multipart/form-data'>
                <Input
                    ref={selectedFile}
                    id="image"
                    type='file'
                    disabled={loading}
                    onChange={onFileInputChange}
                />
                {selectedImage.length > 0 && (<Button
                    variant={"destructive"}
                    onClick={() => {
                        if (selectedFile.current) {
                            selectedFile.current.value = "";
                            setSelectedImage("");
                            setDescription("");
                        }
                    }}
                    disabled={loading}
                >{"X"}</Button>)}
            </form>
            {selectedImage.length > 0 &&
                <div className='min-content aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer mx-auto my-4'>
                    {selectedImage ? (
                        <img src={selectedImage} alt='' />
                    ) : (
                        <span>{"Image Preview"}</span>
                    )}
                </div>}

            <Button disabled={selectedImage.length === 0 || loading} className='max-content my-5' onClick={handleGenerateCaption}>
                {loading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
                {loading ? ("Please Wait") : ("Generate Caption")}
            </Button>

            {description.length > 0 && (
                <div className='mt-4 mb-8'>
                    <h1 className='text-2xl font-bold'>Generated Description:</h1>
                    <p className='capitalize'>{description}</p>
                </div>
            )}
        </div>
    )
}

export default ImagePrompt;