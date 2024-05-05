export default async function regionApi(page, gu, japanese = false, chinese = false, english = false, date, time, isOpen = true) {
    let year, month, day;
    let enterHour, enterMin, exitHour, exitMin;
    const enterTime = enterHour + enterMin;
    const exitTime = exitHour + exitMin;
    let url;

    if(isOpen) {
        url = `http://www.pharmaseoul.com:8000/api/pharmacies?page=${page}&gu=${gu}&speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}`;
    } else {
        year = date.getFullYear();
        month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작
        day = ('0' + date.getDate()).slice(-2);
        let [start, end] = time.split('~');
        [enterHour, enterMin] = start.split(':');
        [exitHour, exitMin] = end.split(':');
            url = `http://www.pharmaseoul.com:8000/api/pharmacies?page=${page}&gu=${gu}&speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&enterTime=${enterTime}&exitTime=${exitTime}&year=${year}&month=${month}&day=${day}`;
    }
    
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
        throw error;
    }
}