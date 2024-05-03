// export default async function regionApi(gu, {en=false, jp=false, cn=false}, isOpen=true, enterTime, exitTime, year, month, day) {
//     const url = `http://www.pharmaseoul.com:8000/api/pharmacies?page=1&gu=${gu}&speakingEnglish=${en}&speakingJapanese=${jp}&speakingChinese=${cn}&enterTime=${enterTime}&exitTime=${exitTime}&year=${year}&month=${month}&day=${day}`;

export default async function regionApi(page) {
    const url = `http://www.pharmaseoul.com:8000//api/pharmacies?page=${page}&gu=서대문구&speakingEnglish=true&enterTime=1030&exitTime=1100&year=2024&month=3&day=10`;
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