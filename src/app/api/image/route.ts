

export const POST = async (request: Request) => {
    const body = await request.json();
    const { image } = body;

    return new Response(JSON.stringify({ message: 'Image received' }), {
        headers: { 'content-type': 'application/json' },
    });
}