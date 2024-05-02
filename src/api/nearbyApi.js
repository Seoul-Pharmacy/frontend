export async function nearbyApi( language, location, isOpen=true ) {
    const { latitude, longitude } = location;
    if (latitude === null || longitude === null ){
        console.error("Location data is not available.");
        return;
    }

    const url = `http://localhost:3000/pharmacies?language=${language}&latitude=${latitude}&longitude=${longitude}&isOpen=${isOpen}`;

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