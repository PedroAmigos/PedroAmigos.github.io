import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import BooksService from "../../service/service";



class BookDetail extends Component{

    booksService = new BooksService()

    state = {
        book:{},
        loading:true
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.booksService.getBookDetail(id).then((data) => {
            this.setState({
                book:data,
                loading:false
            })
        })
    }

    render() {

            const {book,loading} = this.state;
            if (loading) {
                return <p>Loading...</p>
            }

        return (
            <ul className="list-group">
                <li className="list-group-item">Name:{book['name']}</li>
                <li className="list-group-item">Authors:{book['authors'].join()}</li>
                <li className="list-group-item">Country:{book['country']}</li>
                <li className="list-group-item">isbn:{book['isbn']}</li>
                <li className="list-group-item">mediaType:{book['mediaType']}</li>
                <li className="list-group-item">numberOfPages:{book['numberOfPages']}</li>
                <li className="list-group-item">publisher:{book['publisher']}</li>
                <li className="list-group-item">released:{book['released']}</li>
                <li className="list-group-item">url:{book['url']}</li>

            </ul>
        )
    }

}

export default withRouter(BookDetail)