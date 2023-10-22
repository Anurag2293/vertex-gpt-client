'use client'

import React, { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2 } from "lucide-react"
import axios from 'axios'

type Props = {}

const ImagePrompt = (props: Props) => {
    const selectedFile = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleSubmit = async () => {
        setUploading(true);
        try {
            if (!selectedImage) return;
            const response = await fetch('/api/image', {
                method: 'POST',
                body: JSON.stringify({
                    image: selectedImage,
                })
            });
            const result = await response.json();
            console.log(result);
        } catch (error: any) {
            console.log(error.response?.data);
        }
        setUploading(false);
    }

    return (
        <div className="max-w-4xl mx-auto px-20">
            <h1 className='text-center text-3xl my-5'>Generate Captions for Images!</h1>
            <label htmlFor="">Browse Image</label>
            <div className='flex space-x-4'>
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
            </div>
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

            {uploading && (
                <Button className='max-content my-5' disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {"Please wait"}
                </Button>
            )}

            {(selectedImage.length > 0 && !uploading) && (
                <Button className='max-content my-5 block' onClick={handleSubmit}>
                    {"Generate Caption"}
                </Button>
            )}
        </div>
    )
}

export default ImagePrompt;

/*
<React.Fragment>
    <div className="grid w-full gap-1.5">
        <h1 className='text-center text-3xl my-5'>Generate Captions for your Images!</h1>
        <div className="grid w-4/5 mx-auto max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" />
        </div>
    </div>
</React.Fragment>
*/

/*
'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Props = {}

const ImagePrompt = (props: Props) => {
    const [image, setImage] = useState<File>()
    const [base64String, setBase64String] = useState<string>()

    const getImageBase64 = () => {
        if (!image) return;

        const fileReader = new FileReader()
        fileReader.readAsDataURL(image);
        fileReader.onload = () => {
            setBase64String(fileReader.result as string);
        }
    }

    const handleGenerateCaption = async () => {
        await getImageBase64();
        
        console.log(base64String);
    }

    return (
        <div className="max-w-4xl mx-auto p-20 space-y-6">
            <Input type="file" onChange={({ target }) => {
                if (!target.files) return;
                const file = target.files[0];
                setImage(file);
            }} />
            <Button onClick={handleGenerateCaption}>Get Image Base64</Button>
            {base64String && <img className='text-center' src={base64String} />}
        </div>
    )
}

export default ImagePrompt;
*/