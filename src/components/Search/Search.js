import React, {Component} from 'react';
import { FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, FormHelperText} from '@material-ui/core';

class App extends Component {
    state = {
        tags: [
            'dinner',
            'shower',
            'laundry',
            'hot tub'
        ]
    }

    render() {
        return (
            <div className="App">
                <h2>Find Shelter by Tags</h2>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Search by Tags:</FormLabel>
                    <FormGroup>
                        {this.state.tags.map(tag => {
                            return <FormControlLabel
                                control={<Checkbox />}
                                label={tag}
                            />
                        })}
                    </FormGroup>
                    <FormHelperText></FormHelperText>
                </FormControl>
                
                
            </div>
        )
    }
}

export default App;