export default function({ id, name, distance = 0, si, gu, road_name_address }) {

    if (id === 'nearby-summarize') {
        return(
            <div>
                <h6>{name}</h6>
                <p>내 위치에서 {distance}</p>
                <p>{si} {gu} {road_name_address}</p>
            </div>
        );
    } else {
        return(
            <div>
                <h6>{name}</h6>
                <p>{si} {gu} {road_name_address}</p>
            </div>
        );
    }
}