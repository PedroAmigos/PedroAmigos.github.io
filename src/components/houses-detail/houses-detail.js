import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import BooksService from "../../service/service";


class HousesDetail extends Component {

    housesService = new BooksService()

    state = {
        houses: {},
        loading: true
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.housesService.getHousesDetail(id).then((data) => {
            this.setState({
                houses: data,
                loading: false
            })
        })
    }

    render() {

        const {houses, loading} = this.state;
        if (loading) {
            return <p>Loading...</p>
        }

        return (
            <ul className="list-group">
                <li className="list-group-item">Name:{houses['name']}</li>
                <li className="list-group-item">CoatOfArms:{houses['coatOfArms']}</li>
                <li className="list-group-item">Overlord:{houses['overlord']}</li>
                <li className="list-group-item">Region:{houses['region']}</li>

            </ul>
        )
    }

}

export default withRouter(HousesDetail)