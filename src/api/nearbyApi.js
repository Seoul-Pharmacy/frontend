export default async function nearbyApi(japanese = false, chinese = false, english = false, location, isOpen=true) {
    if (!location || location.lat === null || location.lng === null) {
        console.error("Location data is not available.");
        return;
    }

    const { lat, lng } = location;
    const url = `http://www.pharmaseoul.com:8000/api/nearby-pharmacies?speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&latitude=${lat}&longitude=${lng}`;

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
        console.error('Failed to fetch:', error);
        return null;
    }
}