'use client'

import React, { useState } from 'react'

import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Props = {}

const TextPrompt = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<string[]>([]);

    const handleSubmit = async () => {
        try {
            setResponse([]);
            setLoading(true);
            console.log(process.env.NEXT_PUBLIC_SERVER_URL);
            const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/text/submit-prompt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt
                })
            });
            const { success, response, message } = await result.json();
            console.log({success, response, message})
            if (!success) {
                throw new Error(message);
            }
            setResponse(response);
        } catch (error: any) {
            setResponse(['Something went wrong'])
        } finally {
            setPrompt('')
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <div className="grid w-full gap-1.5">
                <h1 className='text-center text-3xl my-5'>Ask AI anything!</h1>
                <div className='w-4/5 mx-auto'>
                    <Label htmlFor="message" className='mb-4'>Type in your prompt...</Label>
                    <Textarea
                        placeholder="Type your prompt here."
                        id="message"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />

                    {prompt.length === 0 && (
                        <Button disabled className='max-content my-5 block' onClick={handleSubmit}>
                            {"Submit Prompt"}
                        </Button>
                    )}

                    {loading && (
                        <Button className='max-content my-5' disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {"Please wait"}
                        </Button>
                    )}

                    {(prompt.length > 0 && !loading) && (
                        <Button className='max-content my-5 block' onClick={handleSubmit}>
                            {"Submit Prompt"}
                        </Button>
                    )}
                </div>

                {response.length > 0 && (
                    <div className='w-4/5 mx-auto'>
                        <h1 className='text-primary text-2xl uppercase'>Response</h1>
                        <div>{response.map((item, index) => {
                            return <p key={index}>{item}</p>
                        })}</div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default TextPrompt