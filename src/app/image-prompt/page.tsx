'use client'

import React, { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"

type Props = {}

const ImagePrompt = (props: Props) => {
    const selectedFile = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            console.log(process.env.NEXT_PUBLIC_SERVER_URL)
            if (!selectedImage) return;

            const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/image/image-caption`;
            // console.log({selectedImage, url})
            console.log(selectedImage)

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: selectedImage, file: selectedFile.current?.files?.[0] })
            })
            const data = await response.json();
            console.log(data);
        } catch (error: any) {
            console.log(error.response?.data);
        }
        setLoading(false);
    }

    return (
        <div className="max-w-4xl mx-auto px-20">
            <h1 className='text-center text-3xl my-5'>Generate Captions for Images!</h1>
            <label htmlFor="">Browse Image</label>
            <form className='flex space-x-4' encType='multipart/form-data'>
                <Input
                    ref={selectedFile}
                    id="image"
                    type='file'
                    onChange={({ target }) => {
                        if (target.files) {
                            const file = target.files[0];

                            const fileReader = new FileReader()
                            fileReader.readAsDataURL(file);
                            fileReader.onload = () => {
                                setSelectedImage(fileReader.result as string);
                            }
                        }
                    }}
                />
                {selectedImage.length > 0 && (<Button
                    variant={"destructive"}
                    onClick={() => {
                        if (selectedFile.current) {
                            selectedFile.current.value = "";
                            setSelectedImage("");
                        }
                    }}
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

            {selectedImage.length === 0 && (
                <Button disabled className='max-content my-5 block' onClick={handleSubmit}>
                    {"Generate Caption"}
                </Button>
            )}

            {loading && (
                <Button className='max-content my-5 block' disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {"Please wait"}
                </Button>
            )}

            {(selectedImage.length > 0 && !loading) && (
                <Button className='max-content my-5 block' onClick={handleSubmit}>
                    {`Generate Caption`}
                </Button>
            )} 
        </div>
    )
}

export default ImagePrompt;