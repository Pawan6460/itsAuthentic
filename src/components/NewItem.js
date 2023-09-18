import { Component } from "react"
import thumbnail from "../images/banners.jpg"
export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card my-3">
                    <img src={!imageUrl ? thumbnail : imageUrl} className="card-img-top" alt="ItsAuthentic" />
                    <div className="card-body">
                        <h5 className="card-title">{title.slice(0, 40) + '...'}
                            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '80%', zIndex: '1'}}>
                                {source}
                            </span>
                        </h5>
                        <p className="card-text">{description.slice(0,30)+'...'}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} <br />on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}