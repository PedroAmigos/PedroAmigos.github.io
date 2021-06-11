import React, {Component} from "react";
import './book-list.css'
import BookItem from "../book-item";
import BooksService from "../../service/service";
import {Link, withRouter} from "react-router-dom";


class BookList extends Component {

    bookService = new BooksService();

    state = {
        loading: true,
        data: [],
        props: {},
        hasError:false
    }

    setError = () => {
        this.setState({
            hasError:true
        })
    }
    setData = () => {
        const page = (new URLSearchParams(this.props.location.search)).get('page')
        this.bookService.getBooks(page).then((data) => {
            this.setState({
                data: data.json,
                loading: false,
                props: data.props
            })
        })

    }

    componentDidMount() {
        this.setData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search) {
            this.setData()
        }
    }

    render() {
        if (this.state.hasError){
            this.to.do = 0
        }


        const {loading, data} = this.state
        if (loading) {
            return <p>Loading...</p>
        }
        const {prev, next, last, first} = this.state.props;
        return (

            <div className=" book-list">
                <button onClick={this.setError} className="btn btn-error">Error</button>
                <h1>Book list</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Authors</th>
                        <th scope="col">Number Of Pages</th>
                        <th scope="col">Country</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                        return <BookItem key={index} item={item} index={index}/>
                    })}

                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {first &&
                        <li className="page-item"><Link className="page-link"
                                                        to={{pathname: '/', search: '?page=' + first}}>First</Link>
                        </li>}
                        {prev &&
                        <li className="page-item"><Link className="page-link"
                                                        to={{pathname: '/', search: '?page=' + prev}}>Prev</Link></li>}
                        {next &&
                        <li className="page-item"><Link className="page-link"
                                                        to={{pathname: '/', search: '?page=' + next}}>Next</Link></li>}
                        {last &&
                        <li className="page-item"><Link className="page-link"
                                                        to={{pathname: '/', search: '?page=' + last}}>Last</Link></li>}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default withRouter(BookList);
