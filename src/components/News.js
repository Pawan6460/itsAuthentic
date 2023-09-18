import React, { Component } from "react"
import NewsItem from "./NewItem"
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        api: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }


    async updatePages() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let topHeadlinesUrl = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await topHeadlinesUrl.json();
        this.setState({
            page: this.state.page,
            articles: parsedData.articles,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let topHeadlinesUrl = await fetch(url);
        let parsedData = await topHeadlinesUrl.json();
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false })
    }

    handlePrevClick = async () => {
        this.setState({page: this.state.page - 1});
        this.updatePages();
    };

    handleNextClick = async () => {
        this.setState({page: this.state.page + 1});
        this.updatePages();
    }

    render() {
        return (
            <div className="container my-3">
                {this.state.loading && <Spinner/>}
                <div className="row">
                    <h3>ItsAuthentic - {this.props.category} news:</h3>
                    {
                        !this.state.loading  && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0.40) : ""} description={element.description ? element.description.slice(0, 80) : ""}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        }
                        )}
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>Prev</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                </div>
            </div>
        )
    }
}