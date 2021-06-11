import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import BooksService from "../../service/service";


class CharactersDetail extends Component {

    caractersService = new BooksService()

    state = {
        characters: {},
        loading: true
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.caractersService.getCharactersDetail(id).then((data) => {
            this.setState({
                characters: data,
                loading: false
            })
        })
    }

    render() {

        const {characters, loading} = this.state;
        console.log(characters)
        if (loading) {
            return <p>Loading...</p>
        }

        return (
            <ul className="list-group">
                <li className="list-group-item">aliases:  {characters['aliases'].join()}</li>
                <li className="list-group-item">allegiances:  {characters['allegiances'].join()}</li>
                <li className="list-group-item">playedBy:  {characters['playedBy'].join()}</li>
                <li className="list-group-item">povBooks:  {characters['povBooks'].join()}</li>
                <li className="list-group-item">titles:  {characters['titles'].join()}</li>
                <li className="list-group-item">tvSeries:  {characters['tvSeries'].join()}</li>
            </ul>
        )
    }

}

export default withRouter(CharactersDetail)