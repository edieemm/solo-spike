import React, {Component} from 'react';
import Map from '../Map/Map'
import { FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import axios from 'axios'

class App extends Component {
    state = {
        shelters: [{
            name: 'Simpson Housing Shelter',
            location: '2100 Pillsbury Avenue South, Minneapolis, MN 55404'
        }],
        selected: {},
        googlePlace: {}
    }
    handleChange = (event) => {
        this.setState({
            ...this.state,
            selected: event.target.value
        })
        console.log('you chose', event.target.value.location)
        this.getSelection(event.target.value.location);
    }
    getSelection = (location) => {
        let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.API_KEY}&fields=photos,formatted_address,name,rating,opening_hours,geometry&inputtype=textquery&input=${location}`
        let proxy = "https://cors-anywhere.herokuapp.com/"
        axios({
            method: 'GET',
            url: proxy + url,
            proxyurl: proxy
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                ...this.state,
                googlePlace: response.data.candidates[0]
            })
        }).catch(error => {
            console.log('error finding place: ', error)
        })
    }
    componentDidMount() {
        // 
    }
    render() {
        return (
        <div className="App">
            <h2>Find Shelter Location</h2> 
            <FormControl >
                <Select
                    onChange={this.handleChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                            Select shelter
                    </MenuItem>
                    {this.state.shelters.map(shelter => {
                        return <MenuItem
                            value={shelter}
                        >
                            {shelter.name}
                        </MenuItem>
                    })}
                </Select>
                <FormHelperText>Select Shelter</FormHelperText>
            </FormControl>
            <Map 
                coords={this.state.googlePlace.geometry}
                name={this.state.selected.name}
            />
        </div>
    )};
}

export default App;


