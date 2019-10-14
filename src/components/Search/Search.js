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
import axios from 'axios';


 //--------------COMPONENT------------------//

class App extends Component {
    state = {
        tags: [
            'dinner',
            'shower',
            'laundry',
            'hotTub',
            // 'Male identifying',
            // 'Female identifying'
        ],
        form: {
            dinner: false,
            shower: false,
            laundry: false,
            hotTub: false,
            maleIdentifying: false,
            femaleIdentifying: false
        },
        results: []
    }
    handleChange = (event, name)=> {
        this.setState({ 
            ...this.state, 
            form:{
                ...this.state.form,
                [name]: event.target.checked 
            }
        });
        // console.log(event.target.checked)
    };
    handleSubmit = () => {
        console.log(this.state.form)
        let selectedTags = [];
        this.state.tags.forEach(tag => {
            if (this.state.form[tag] === true){
                selectedTags.push(tag)
            }
        })
        // console.log('/shelters/' + selectedTags)
        // axios.get('/shelters/'+selectedTags).then(response => {
        //     console.log(response.data)
        // }).catch(error => {
        //     console.log(error)
        // })

        console.log('/shelters') 
        axios.get('/shelters').then(response => {
            // console.log(response.data)
            response.data.forEach(shelter => { 
                let matchingTags = [];
                selectedTags.forEach(selectedTag => {
                    shelter.tags.forEach(listingTag => {
                        if (selectedTag === listingTag){
                            console.log(listingTag)
                            matchingTags.push(listingTag)
                        }
                    })
                    shelter.types.forEach(listingType => {
                        if (selectedTag === listingType) {
                            console.log(listingType)
                            matchingTags.push(listingType)
                        }
                    }) 
                })
                if (matchingTags.length === selectedTags.length){
                    this.setState({
                        ...this.state,
                        results: [...this.state.results, shelter]
                    })
                    console.log(shelter)
                }
            })
        }).catch(error => {
            console.log(error)
        })
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