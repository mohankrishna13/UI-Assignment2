import React, { Component } from 'react';
import Display from './DisplayHints.js';
class GetData extends Component {
    state = {
        allData: '',
        words: '',
        definiton: '',
        synonyms: '',
        antonyms: '',
    }
    async componentDidMount() {
        if (this.props.currentWord) {
            await fetch('https://fourtytwowords.herokuapp.com/word/' + this.props.currentWord + '/definitions?api_key=9e6759e60c71e91458f697bb4773fd5f70c151a3ac21a78745ef83c129217037abbf20f9d7c78a87ce47b962ef973ff938ba32676e4e6623d162cd2c35ce47c7e20ab9c12733be141662f80ce5fe3395')
                .then(response => response.json())
                .then(def => {
                    this.setState({
                        definiton: [...def],
                    })
                })
            await fetch('https://fourtytwowords.herokuapp.com/word/' + this.props.currentWord + '/relatedWords?api_key=9e6759e60c71e91458f697bb4773fd5f70c151a3ac21a78745ef83c129217037abbf20f9d7c78a87ce47b962ef973ff938ba32676e4e6623d162cd2c35ce47c7e20ab9c12733be141662f80ce5fe3395')
                .then(response => response.json())
                .then(def => {
                    if (def.length === 1) {
                        this.setState({
                            synonyms: def[0].words,
                        })
                    } else {
                        this.setState({
                            antonyms: def[0].words,
                            synonyms: def[1].words,
                        })
                    }
                })
            this.setState({
                allData: [[...this.state.definiton], this.state.synonyms, this.state.antonyms],
            })
            this.props.setSynonymsofCurrentWord(this.state.synonyms)
        }
    }
    setScore = (e) => {
        this.props.setScore(e)
    }
    setSynonymAsHints = (e) => {
        this.props.setSynonymAsHints(e)
    }
    setDataForAllWords = (e) => {
        this.props.settotalData(e);
    }
    setTypesofData = (e) => {
        this.props.setTypesofData(e);
    }
    setRevealHintsForAll = (e) => {
        this.props.setRevealHintsForAll(e)
    }
    render() {
        if (this.props.indexToShowHistory != -1) {
            return (
                <Display
                    setSynonymAsHints={this.setSynonymAsHints}
                    setRevealHintsForAll={this.setRevealHintsForAll}
                    currentWordHistory={this.props.currentWordHistory}
                    RevealedHints={this.props.RevealedHints[this.props.indexToShowHistory]}
                    totalData={this.props.dataForAllWords[this.props.indexToShowHistory]}
                    setScore={this.setScore}
                    indexToShow={this.props.indexToShowHistory}
                    currentWord={this.props.currentWord}
                    typesofHints={this.props.typesofHints[this.props.indexToShowHistory]}
                />
            )
        } else {
            return (
                <Display
                    setRevealHintsForAll={this.setRevealHintsForAll}
                    setTypesofData={this.setTypesofData}
                    indexToShow={this.props.indexToShowHistory}
                    setDataForAllWords={this.setDataForAllWords}
                    totalData={this.state.allData}
                    currentWord={this.props.currentWord}
                    setScore={this.setScore}
                    setSynonymAsHints={this.setSynonymAsHints}
                />
            );
        }
    }
}
export default GetData;
