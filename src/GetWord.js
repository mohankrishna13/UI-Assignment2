import React, { Component } from 'react';
import { Text, View } from 'react-native';
class GetWord extends Component {
    state = {
        currentWord: ''
    }
    async componentDidMount() {
        if(this.state.currentWord === ''){
            await fetch('https://fourtytwowords.herokuapp.com/words/randomWord?api_key=9e6759e60c71e91458f697bb4773fd5f70c151a3ac21a78745ef83c129217037abbf20f9d7c78a87ce47b962ef973ff938ba32676e4e6623d162cd2c35ce47c7e20ab9c12733be141662f80ce5fe3395')
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        currentWord: data.word
                    });
                }
            )
            this.props.setCurrentWord(this.state.currentWord);
        }
    }
    render() {
        return (
            <Text>
                Data is fetching.....
             </Text>
        );
    }
}
export default GetWord;