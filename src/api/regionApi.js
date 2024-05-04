export default async function regionApi(gu, japanese = false, chinese = false, english = false, page) {
    const url = `http://www.pharmaseoul.com:8000/api/pharmacies?page=${page}&gu=${gu}&speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&enterTime=1030&exitTime=1100&year=2024&month=3&day=10`;
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