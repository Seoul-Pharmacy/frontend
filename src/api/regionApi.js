export default async function regionApi(page, gu, japanese = false, chinese = false, english = false, selectedDate) {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2); // 월은 0부터 시작
    const day = ('0' + selectedDate.getDate()).slice(-2);
    const url = `http://www.pharmaseoul.com:8000/api/pharmacies?page=${page}&gu=${gu}&speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&enterTime=1030&exitTime=1100&year=${year}&month=${month}&day=${day}`;
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