export default async function nearbyApi(japanese = false, chinese = false, english = false, location, isOpen=true) {
    if (!location || location.lat === null || location.lng === null) {
        console.error("Location data is not available.");
        return;
    }
    let url;
    const { lat, lng } = location;
    url = `/api/nearby-pharmacies?speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&latitude=${lat}&longitude=${lng}&isOpen=${isOpen}`;
    

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
            }
        });
        if (response.status === 404) {
            throw new Error('404');
        } else if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch:', error);
        return null;
    }
}