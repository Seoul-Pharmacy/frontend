export default function({ children }) {
    const formattedDistance = children.distance ? parseFloat(children.distance).toFixed(2) : '정보 없음';
    return(
        <li className="pharmacy-list-item">
            <h6>{children.name}</h6>
            <p>내 위치에서 {formattedDistance} km</p>
        </li>
    );
}