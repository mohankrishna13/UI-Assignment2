import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'

class Display extends Component {
    state = {
        singleArray: [], // to store mixed data into single array
        Hints: [],  //To store which are revealed as hints
        currentWord: '',
        types: [], //types of hints
        scores: [], //Scores of each hint
    }
    handlesubmit = (e) => {
        this.state.Hints.push(e);
        this.props.setRevealHintsForAll(this.state.Hints)
        this.setState({
            Hints: [...this.state.Hints]
        });
        this.props.setScore(this.state.scores[e]);
        if (this.state.types[e] === 'Synonym:') {
            this.props.setSynonymAsHints(this.state.singleArray[e])
        }
    }
    createList() {
        this.state.singleArray = [];
        this.state.scores = [];
        for (let i = 0; i < this.props.totalData.length; i++) {
            if (i === 1 || i === 2) {
                for (let j = 0; j < this.props.totalData[i].length; j++) {
                    this.state.singleArray.push(this.props.totalData[i][j]);
                    if (i === 1) {
                        this.state.types.push('Synonym:');
                    } else {
                        this.state.types.push('Antonym:');
                    }
                    this.state.scores.push(2);
                }
            } else {
                for (let j = 0; j < this.props.totalData[i].length; j++) {
                    if (j === 1) {
                        this.state.types.push('FirstLetter:');
                        this.state.singleArray.push(this.props.currentWord[0]);
                        this.state.scores.push(3);
                    }
                    if (j === 2) {
                        this.state.types.push('JumbleWord');
                        let word = this.props.currentWord.split('');
                        word = word.sort();
                        word = word.join('-')
                        this.state.singleArray.push(word);
                        this.state.scores.push(7);
                    }
                    if (j == 4) {
                        this.state.types.push('LastLetter:');
                        this.state.singleArray.push(this.props.currentWord[this.props.currentWord.length - 1]);
                        this.state.scores.push(3);
                    }
                    this.state.types.push('Definition:');
                    this.state.singleArray.push(this.props.totalData[i][j].text);
                    this.state.scores.push(2);
                }
            }
        }
        //Setting total data of a current word
        this.props.setDataForAllWords(this.state.singleArray);
        //setting types of hints of a current word
        this.props.setTypesofData(this.state.types);
    }
    hintsNotPresent(data, index) {
        return (
            <View style={styles.style1}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: '70%' }}>
                        <Text key={index}>{data[index]}</Text>
                    </View>
                    <View>
                        <Text key={index + 1}>Points:-{this.state.scores[index]} </Text>
                    </View>
                </View>
                <TouchableHighlight style={styles.WordsButton}
                    onPress={() => { this.handlesubmit(index) }}
                ><Text style={{ color: '#FFFFFF' }}>Hint</Text></TouchableHighlight>
            </View>
        )
    }
    hintsNotPresentForHistory(data, index, item) {
        return (
            <View style={styles.styles2}>
                <Text key={index}>{data[index]}</Text>
                <Text key={index + 1} style={{ padding: 3 }}> {item} </Text>
            </View>
        )
    }
    FirstHintToDisplay(data, index, item) {
        return (
            <View style={styles.styles3}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: '70%' }}>
                        <Text key={index}>{data[index]}</Text>
                    </View>
                    <View>
                        <Text key={index + 1}>Free </Text>
                    </View>
                </View>
                <View >
                    <Text>{item}</Text>
                </View>
            </View>
        )
    }
    hintsPresent(data, index, item) {
        return (
            <View style={styles.styles3}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: '70%' }}>
                        <Text key={index}>{data[index]}</Text>
                    </View>
                    <View>
                        <Text key={index + 1} >Points:-{this.state.scores[index]} </Text>
                    </View>
                </View>
                <View>
                    <Text>{item}</Text>
                </View>
            </View>
        )
    }
    render() {
        if (this.props.indexToShow !== -1) {
            //If user Wants History for current Word
            if (this.props.currentWordHistory === true) {
                return (
                    <ScrollView>
                        {this.props.totalData.map((item, index) => (
                            index === 0 ? (
                                this.FirstHintToDisplay(this.props.typesofHints, index, item)
                            ) : (this.props.RevealedHints) ? (
                                this.props.RevealedHints.includes(index) ? (
                                    this.hintsPresent(this.props.typesofHints, index, item)
                                ) : (
                                        this.hintsNotPresent(this.props.typesofHints, index)
                                    )
                            ) : (
                                    this.hintsNotPresent(this.props.typesofHints, index)
                                )
                        )
                        )}
                    </ScrollView >
                )
            }
            //If user Wants History for completed Word
            else {
                return (
                    <ScrollView>
                        {this.props.totalData.map((item, index) => (
                            (this.props.RevealedHints) ? (
                                this.props.RevealedHints.includes(index) ? (
                                    this.hintsPresent(this.props.typesofHints, index, item)
                                ) : (
                                        this.hintsNotPresentForHistory(this.props.typesofHints, index, item)
                                    )
                            ) : (
                                    this.hintsNotPresentForHistory(this.props.typesofHints, index, item)
                                )
                        )
                        )}
                    </ScrollView >
                )
            }
        }
        else {
            //If hints are preesent for present game
            if (this.state.Hints.length > 0) {
                return (
                    <ScrollView>
                        {this.state.singleArray.map((item, index) => (
                            index === 0 ? (
                                this.FirstHintToDisplay(this.state.types, index, item)
                            ) : (this.state.Hints.includes(index)) ? (
                                this.hintsPresent(this.state.types, index, item)
                            ) : (
                                        this.hintsNotPresent(this.state.types, index)
                                    )
                        )
                        )}
                    </ScrollView>
                )
            }
            //Creating hints for initial state
            else {
                this.createList()
                return (
                    <ScrollView>
                        {this.state.singleArray.map((item, index) => (
                            index === 0 ? (
                                this.FirstHintToDisplay(this.state.types, index, item)
                            ) : (
                                    this.hintsNotPresent(this.state.types, index)
                                )
                        )
                        )}
                    </ScrollView>
                );
            }
        }
    }
}
export default Display;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    WordsButton: {
        width: 50,
        height: 25,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#0a8cf7'
    },
    style1: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        margin: 1,
        borderRadius: 7,
        borderColor: '#808080',
        borderWidth: 2
    },
    styles2: {
        padding: 10,
        margin: 1,
        borderRadius: 7,
        backgroundColor: '#FFFFFF',
        borderColor: '#808080',
        borderWidth: 2
    },
    styles3: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        margin: 1,
        borderRadius: 7,
        backgroundColor: '#fcf803',
        borderColor: '#808080',
        borderWidth: 2
    },
})
