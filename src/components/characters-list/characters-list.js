import React, {Component} from "react";
import CharacterItem from "../characters-item";
import BooksService from "../../service/service";
import {Link, withRouter} from "react-router-dom";


class CharactersList extends Component {

    bookService = new BooksService();

    state = {
        loading: true,
        data: [],
        props: {}
    }

    componentDidMount() {
        const page = (new URLSearchParams(this.props.location.search)).get('page')
        this.bookService.getCharacters(page).then((data) => {
            this.setState({
                data: data.json,
                loading: false,
                props: data.props
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search) {
            const page = (new URLSearchParams(this.props.location.search)).get('page')
            this.bookService.getCharacters(page).then((data) => {
                this.setState({
                    data: data.json,
                    loading: false,
                    props: data.props
                })
            })
        }
    }

    render() {
        const {loading, data} = this.state
        if (loading) {
            return <p>Loading...</p>
        }
        const {prev, next, last, first} = this.state.props;
        return (
            <div className=" book-list">
                <h1>Character list</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Culture</th>
                        <th scope="col">Born</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                        return <CharacterItem key={index} item={item} index={index}/>
                    })}

                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {first &&
                        <li className="page-item"><Link className="page-link"
                                                        to={{pathname: '/characters', search: '?page=' + first}}>First</Link>
                        </li>}
                        {prev &&
                        <li className="page-item"><Link className="page-link"
                                                        to={{pathname: '/characters', search: '?page=' + prev}}>Prev</Link></li>}
                        {next &&
                        <li className="page-item"><Link className="page-link"
                                                        to={{pathname: '/characters', search: '?page=' + next}}>Next</Link></li>}
                        {last &&
                        <li className="page-item"><Link className="page-link"
                                                        to={{pathname: '/characters', search: '?page=' + last}}>Last</Link></li>}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default withRouter(CharactersList);
