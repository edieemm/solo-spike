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
        form: {},
        results: []
    }
    componentDidMount() {
        this.getTags();
    }
    getTags = () => {
        axios.get('/tags').then(response => {
            console.log(response.data)
            this.setState({
                ...this.state,
                tags: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
    handleChange = (event, tagId)=> {
        //grabs the tag ID from the dom and generates a keyname for it
        //to store the checked/unchecked status in this.state.form
        console.log(this.state.tags)
        let keyName = 'tag'+tagId
        this.setState({ 
            ...this.state, 
            form:{
                ...this.state.form,
                [keyName]: event.target.checked 
            }
        });
    };
    handleSubmit = () => {
        console.log(this.state.form)
        
        //passes the array of 'checked' tags to the getShelters function
        this.getShelters();
    } // end handle submit

    getShelters = () => {
        axios.get('/shelters').then(response => {
            //filters search results by selected tags and sends them to
            //local this.state.results
            this.filterSearchResults(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }// end get shelters

    filterSearchResults = (results) => {
        //takes all 'checked' tags and stores them in a temporary array
        let selectedTags = [];
        this.state.tags.forEach(tagObj => {
            if (this.state.form['tag' + tagObj.id] === true) {
                selectedTags.push(tagObj.tag)
            }
        })
        console.log(selectedTags)
        //checks all shelters for the 'checked' tags
        results.forEach(shelter => {
            let matchingTags = [];
            selectedTags.forEach(selectedTag => {
                shelter.tags.forEach(listingTag => {
                    if (selectedTag === listingTag) {
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
            if (matchingTags.length === selectedTags.length) {
                this.setState({
                    ...this.state,
                    results: [...this.state.results, shelter]
                })
                console.log(shelter,
                    'matching tags are',
                    matchingTags,
                    this.state.form)
            }
        })
    }

    render() {
        return (
            <div className="App">
                <h2>Find Shelter by Tags</h2>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Search by Tags:</FormLabel>
                    <FormGroup>
                        {this.state.tags.map(tagObj => {
                            return <FormControlLabel
                                control={<Checkbox 
                                            color="primary"
                                    onChange={(e) => this.handleChange(e, tagObj.id)}
                                        />}
                                label={tagObj.tag}
                                key={tagObj.id}
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