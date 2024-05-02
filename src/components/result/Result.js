import Summarize from "./Summarize";
import Detail from "./Detail";

export default function Result({ result }) {
    
    return (
        <div id="result-wrapper">
        <div id="result-summarize-wrapper">
            <ul id="result-summarize-inner-wrapper">
                {result.map(pharmacy => (
                    <Summarize key={pharmacy.id}>{pharmacy}</Summarize>
                ))}
            </ul>
            <div className="page_wrap">
                <div className="page_nation">
                    <a className="arrow pprev" href="#"></a>
                    <a className="arrow prev" href="#"></a>
                    <a href="#" className="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">6</a>
                    <a href="#">7</a>
                    <a href="#">8</a>
                    <a href="#">9</a>
                    <a href="#">10</a>
                    <a className="arrow next" href="#"></a>
                    <a className="arrow nnext" href="#"></a>
                </div>
            </div>
        </div>
        <Detail />
    </div>
    )
}