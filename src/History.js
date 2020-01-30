import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Button from 'apsl-react-native-button';

class Historypage extends Component {
    constructor() {
        super();
        this.state = {
            currentPositon: -1,
            currentSize:3,
        }
    }
    skipWord = () => {
        this.props.skipCurrent();
    }
    resetGame = (e) => {
        this.props.resetGame();
    }
    setIndex = (e) => {
        this.props.setindexToShowHistory(e);
         if(e===this.props.completedWordsForHistory.length){
            this.setState({ 
                currentPosition:-1,
                currentSize:3
             });
        }else{
            this.setState({ 
                currentPosition:e,
                currentSize:1
             });
        }
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                        <Text style={{ fontSize: 25 }}>History</Text>
                    </View>
                    <Button style={styles.WordsButton} textStyle={{ fontSize: 18, color: '#FFFFFF' }}
                        onPress={() => this.skipWord()}>
                        Get New Word (-4 points)
                        </Button>
                    <Button style={{ height: 35, width: 'auto',borderWidth:this.state.currentSize }} textStyle={{ fontSize: 15 }}
                        onPress={() => this.setIndex(this.props.completedWordsForHistory.length)}>
                        playing..{this.props.currentWordScore}
                    </Button>
                    {this.props.completedWordsForHistory.map((item, index) => (
                        index === this.state.currentPosition ? (
                        <Button style={{ height: 40, width: 'auto',borderWidth:3,backgroundColor: this.props.color[index] }} textStyle={{ fontSize: 15, marginLeft: 0 }}
                            onPress={() => this.setIndex(index)}>
                            {item}{this.props.completedWordsScore[index]}
                        </Button>
                       ) :(
                        <Button style={{ height: 40, width: 'auto', backgroundColor: this.props.color[index] }} textStyle={{ fontSize: 15, marginLeft: 0 }}
                            onPress={() => this.setIndex(index)}>
                            {item}{this.props.completedWordsScore[index]}
                        </Button>
                       )
                    ))}
                    <Button style={styles.WordsButton} textStyle={{ fontSize: 18, color: '#FFFFFF' }}
                        onPress={() => this.resetGame()}>
                        Reset Game
                    </Button>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 7,
        marginTop: 1,
        marginLeft: 2,
        borderColor: '#808080',
        borderWidth: 2
    },
    WordsButton: {
        height: 48,
        width: 'auto',
        borderRadius: 8,
        borderColor: '#FFFFFF',
        backgroundColor: '#1e90ff',
    }
})
export default Historypage;
