import React, { Component } from 'react';
import { 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    FormGroup, 
    Checkbox, 
    FormHelperText,
    Button 
    } from '@material-ui/core';


 //--------------COMPONENT------------------//

class App extends Component {
    state = {
        tags: [
            'dinner',
            'shower',
            'laundry',
            'hotTub'
        ],
        form: {
            dinner: false,
            shower: false,
            laundry: false,
            hotTub: false,
        } 
    }
    handleChange = (event, name)=> {
        this.setState({ 
            ...this.state, 
            form:{
                ...this.state.form,
                [name]: event.target.checked 
            }
        });
        console.log(event.target.checked)
    };
    handleSubmit = () => {
        console.log(this.state.form)
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
                                control={<Checkbox 
                                            color="primary"
                                            onChange={(e)=>this.handleChange(e, tag)}
                                        />}
                                label={tag}
                                key={tag}
                            />
                        })}
                    </FormGroup>
                    <FormHelperText></FormHelperText>
                    <Button 
                        variant="outlined" 
                        color="inherit" 
                        type='submit'
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                </FormControl>


            </div>
        )
    }
}

export default App;