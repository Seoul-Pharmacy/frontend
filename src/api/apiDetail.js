export async function apiDetail( id = 1 ) {
    const url = `http://www.pharmaseoul.com:8000/api/pharmacies/${id}`;

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