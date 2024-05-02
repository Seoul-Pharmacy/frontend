export default function({ name, distance }) {
    return(
        <div>
            <h6>{name}</h6>
            <p>내 위치에서 {distance}</p>
        </div>
    );
}