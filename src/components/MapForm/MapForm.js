import React, {Component} from 'react';
import Map from '../Map/Map'
import { FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';

class App extends Component {
    state = {
        shelters: [{
            name: 'Simpson Housing Shelter',
            location: '2100 Pillsbury Avenue South, Minneapolis, MN 55404'
        }],
        selected: {}
    }
    handleChange = (event) => {
        this.setState({
            ...this.state,
            selected: event.target.value
        })
        console.log('you chose', event.target.value)
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

            <Map selectedShelter={this.state.selected}/>
        </div>
    )};
}

export default App;


