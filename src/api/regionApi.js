export default async function regionApi(page, gu, japanese = false, chinese = false, english = false, date, time) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작
    const day = ('0' + date.getDate()).slice(-2);
    let [start, end] = time.split('~');
    let [enterHour, enterMin] = start.split(':');
    let [exitHour, exitMin] = end.split(':');
    const enterTime = enterHour + enterMin;
    const exitTime = exitHour + exitMin;
    const url = `http://www.pharmaseoul.com:8000/api/pharmacies?page=${page}&gu=${gu}&speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&enterTime=${enterTime}&exitTime=${exitTime}&year=${year}&month=${month}&day=${day}`;
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