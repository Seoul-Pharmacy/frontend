export default async function regionApi(page, gu, japanese = false, chinese = false, english = false, date, time, isOpen = true) {
    let url;

    if(isOpen) {
        url = `/api/pharmacies?page=${page}&gu=${gu}&speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}`;
    } else {
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작
        let day = ('0' + date.getDate()).slice(-2);
        let [start, end] = time.split('~');
        let [enterHour, enterMin] = start.split(':');
        let [exitHour, exitMin] = end.split(':');
        const enterTime = enterHour + enterMin;
        const exitTime = exitHour + exitMin;
            url = `/api/pharmacies?page=${page}&gu=${gu}&speakingEnglish=${english}&speakingJapanese=${japanese}&speakingChinese=${chinese}&enterTime=${enterTime}&exitTime=${exitTime}&year=${year}&month=${month}&day=${day}`;
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