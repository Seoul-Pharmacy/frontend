export async function apiDetail( id ) {
    const url = `http://localhost:3000/pharmacies/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error('Network response error.');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch: ', error);
        return null;
    }
}