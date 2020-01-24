import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GetWord from './GetWord.js'
import UserInput from './UserInput.js'
import GetData from './FetchData.js';
import DisplayUserInputs from './UserInputDisplay.js';
import Historypage from './History.js';
class StartingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [[]], //Storing totalData of a word
            Score: 0, //Overall Score
            CurrentWord: '',
            UserAnswer: '',

            currrentWordAnswerList: [],//To store all inputs of a current word
            synonymsAsHints: [], // To store Synonyms which are displayed as hints
            synonymsListCurrent: [], //To store Synonyms list of current word
            completedCount: -1, //To store no of words completed
            currentWordScore: 0, //To store score of current word
            currentWordAnswerStatus: [], //To store all status of a current word

            completedWordsScore: [],
            completedWordsForHistory: [],
            indexToShowHistory: -1,
            typesofHints: [[]],   //To store Hints Types ex:defintion,Synonym and Antonym
            RevealedHintsForAll: [[]],
            completedWordAnswerList: [[]],
            currentWordHistory: false,

            colors: [],
            colorsForAnswerList: [[]],//To indicate answers
            statusForInput: '' //To show user Answer is correct or Wrong
        }
    }
    setindexToShowHistory = (e) => {
        console.log(this.state.allData.length)
        if (e === this.state.completedWordsForHistory.length) {
            this.setState({
                indexToShowHistory: e,
                currentWordHistory: true
            });
        } else {
            this.setState({
                indexToShowHistory: e,
                currentWordHistory: false
            });
        }
    }
    resetGame = () => {
        this.setState({
            allData: [[]],
            CurrentWord: '',
            UserAnswer: '',
            currrentWordAnswerList: [],
            synonymsAsHints: [],
            synonymsListCurrent: [],
            completedCount: -1,
            Score: 0,
            currentWordScore: 0,
            completedWordsScore: [],
            completedWordsForHistory: [],
            indexToShowHistory: -1,
            typesofHints: [[]],
            RevealedHintsForAll: [[]],
            completedWordAnswerList: [[]],
            currentWordHistory: false,
            colors: [],
            currentWordAnswerStatus: [],
            colorsForAnswerList: [[]],
            statusForInput: ''
        });
    }
    setCurrentWord = (word) => {
        if (word != '') {
            this.setState({
                CurrentWord: word,
                currentWordScore: 0,
                indexToShowHistory: -1,
                completedCount: this.state.completedCount + 1
            })
        }
    }
    settotalData = (response) => {
        if (response !== undefined) {
            this.state.allData[this.state.completedCount] = [...response]
        }
    }
    skipCurrent = () => {
        if (this.state.CurrentWord != '' && this.state.allData[this.state.completedCount] != '') {
            this.state.completedWordsForHistory.push(this.state.CurrentWord);
            this.state.completedWordsScore.push(this.state.currentWordScore - 4);
            this.state.colors[this.state.completedCount] = '#fa4646';
            this.state.currentWordAnswerStatus.push('#fa4646');
            this.state.colorsForAnswerList[this.state.completedCount] = this.state.currentWordAnswerStatus;
            this.state.completedWordAnswerList[this.state.completedCount] = this.state.currrentWordAnswerList
            this.setState({
                Score: this.state.Score - 4,
                CurrentWord: '',
                currrentWordAnswerList: [],
                userAnswer: '',
                currentWordAnswerStatus: [],
                statusForInput: ''
            })
        }
    }
    setSynonymsofCurrentWord = (response) => {
        this.setState({
            synonymsListCurrent: response
        });
    }
    setScore = (points) => {
        this.setState({
            Score: this.state.Score - points,
            currentWordScore: this.state.currentWordScore - points,
        })
    }
    setSynonymAsHints = (response) => {
        this.state.synonymsAsHints.push(response)
    }
    setTypesofData = (e) => {
        this.state.typesofHints[this.state.completedCount] = [...e]
    }
    setRevealHintsForAll = (e) => {
        this.state.RevealedHintsForAll[this.state.completedCount] = [...e]
    }
    setAnswer = (userInput) => {
        userInput = userInput.toLowerCase();
        this.state.currrentWordAnswerList.push(userInput);
        if (userInput === this.state.CurrentWord) {
            this.state.completedWordsForHistory.push(this.state.CurrentWord);
            this.state.completedWordsScore.push(this.state.currentWordScore + 10);
            this.state.completedWordAnswerList[this.state.completedCount] = this.state.currrentWordAnswerList
            this.state.colors[this.state.completedCount] = '#46fa64';
            this.state.currentWordAnswerStatus.push('#46fa64');
            this.state.colorsForAnswerList[this.state.completedCount] = this.state.currentWordAnswerStatus;
            this.setState({
                Score: this.state.Score + 10,
                currrentWordAnswerList: [],
                CurrentWord: '',
                currentWordAnswerStatus: [],
                statusForInput: ''
            });

        }
        else if (this.state.synonymsListCurrent.includes(userInput) && (!(this.state.synonymsAsHints.includes(userInput)))) {
            this.state.completedWordsForHistory.push(this.state.CurrentWord);
            this.state.completedWordsScore.push(this.state.currentWordScore + 10);
            this.state.completedWordAnswerList[this.state.completedCount] = this.state.currrentWordAnswerList
            this.state.colors[this.state.completedCount] = '#46fa64';
            this.state.currentWordAnswerStatus.push('#46fa64');
            this.state.colorsForAnswerList[this.state.completedCount] = this.state.currentWordAnswerStatus;
            this.setState({
                Score: this.state.Score + 10,
                currrentWordAnswerList: [],
                CurrentWord: '',
                currentWordAnswerStatus: [],
                statusForInput: ''
            });
        }
        else {
            this.state.currentWordAnswerStatus.push('#fa4646');
            this.setState({
                Score: this.state.Score - 2,
                currentWordScore: this.state.currentWordScore - 2,
                statusForInput: 'Wrong Answer'

            });
        }
    }
    render() {
        if (this.state.CurrentWord) {
            return (
                <View style={styles.container}>
                    <Text style={styles.textScore}>Score:{this.state.Score}</Text>
                    <Text style={styles.textTitle}>Guess The Word</Text>
                    <View style={styles.userInputPage}>
                        <UserInput setAnswer={this.setAnswer} />
                        <Text style={{ fontSize: 20 }}>{this.state.statusForInput}</Text>
                    </View>
                    <View style={styles.Guesses}>
                        <DisplayUserInputs
                            userAnswerList={this.state.currrentWordAnswerList}
                            indexToShowHistory={this.state.indexToShowHistory}
                            completedWordAnswerList={this.state.completedWordAnswerList}
                            currentWordHistory={this.state.currentWordHistory}
                            colorsForAnswerList={this.state.colorsForAnswerList}
                        />
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ width: '60%', marginTop: '5%' }}>
                            <GetData
                                settotalData={this.settotalData}
                                setSynonymsofCurrentWord={this.setSynonymsofCurrentWord}
                                setScore={this.setScore}
                                setSynonymAsHints={this.setSynonymAsHints}
                                setRevealHintsForAll={this.setRevealHintsForAll}
                                setTypesofData={this.setTypesofData}

                                dataForAllWords={this.state.allData}
                                currentWordHistory={this.state.currentWordHistory}
                                RevealedHints={this.state.RevealedHintsForAll}
                                typesofHints={this.state.typesofHints}
                                indexToShowHistory={this.state.indexToShowHistory}
                                currentWord={this.state.CurrentWord}
                            />
                        </View>
                        <View style={{ marginLeft: 2, marginTop: '5%', width: '40%', height: 'auto' }}>
                            <Historypage
                                skipCurrent={this.skipCurrent}
                                resetGame={this.resetGame}
                                completedWordsForHistory={this.state.completedWordsForHistory}

                                color={this.state.colors}
                                setindexToShowHistory={this.setindexToShowHistory}

                                currentWordScore={this.state.currentWordScore}
                                completedWordsScore={this.state.completedWordsScore}
                            />
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.textScore}>Score:{this.state.Score}</Text>
                    <Text style={styles.textTitle}>Guess The Word</Text>
                    <View style={styles.userInputPage}>
                        <UserInput />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <GetWord setCurrentWord={this.setCurrentWord} />
                        <View style={{ marginTop: '13%', height: '100%', width: '40%', marginLeft: '60%' }}>
                            <Historypage
                                color={this.state.colors}
                                setindexToShowHistory={this.setindexToShowHistory}
                                skipCurrent={this.skipCurrent}
                                resetGame={this.resetGame}
                                completedWordsForHistory={this.state.completedWordsForHistory}
                                currentWordScore={this.state.currentWordScore}
                                completedWordsScore={this.state.completedWordsScore}
                            />
                        </View>
                    </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4,
        flexDirection: 'column',
        backgroundColor: '#fffff',
        borderRadius: 5
    },
    userInputPage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 80,
        marginTop: '1%',
        backgroundColor: '#fff',
        borderColor: 'black',
    },
    textScore: {
        textAlign: 'right',
        marginRight: '5%',
        fontSize: 20,
    },
    textTitle: {
        textAlign: 'center',
        padding: 3,
        fontSize: 20,
        backgroundColor: '#ffff'
    },
    Guesses: {
        width: 'auto',
        marginTop: '1%',
        backgroundColor: '#fffff',
        borderRadius: 4,
        padding: 3
    }
});
export default StartingPage;
