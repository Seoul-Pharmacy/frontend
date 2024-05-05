export default async function nearbyApi(japanese = false, chinese = false, english = false, location, isOpen=true) {
    if (!location || location.lat === null || location.lng === null) {
        console.error("Location data is not available.");
        return;
    }
    let url;
    const { lat, lng } = location;
    if(isOpen) {
        url = `http://www.pharmaseoul.com:8000/api/nearby-pharmacies?speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&latitude=${lat}&longitude=${lng}`;
    } else {
        url = `http://www.pharmaseoul.com:8000/api/nearby-pharmacies?speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&latitude=${lat}&longitude=${lng}&isOpen=${isOpen}`;
    }
    

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