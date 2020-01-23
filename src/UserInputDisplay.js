import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
class DisplayUserInputs extends Component {
    render() {
        if (this.props.indexToShowHistory != -1 && !(this.props.currentWordHistory)) {
            return (
                <View style={styles.MainContainer}>
                    <View>
                        <Text style={styles.text}>Guesses:</Text>
                    </View>
                    <View style={styles.Container}>
                        {this.props.completedWordAnswerList[this.props.indexToShowHistory].map((item, key) => (
                            <Text style={{
                                height: 25,
                                backgroundColor: this.props.colorsForAnswerList[this.props.indexToShowHistory][key],
                                marginEnd: 3,
                                marginBottom: 2,
                                alignContent: 'center',
                                fontSize: 15,
                                borderRadius: 6,
                                width: 'auto',
                                paddingLeft: 3,
                                paddingRight: 3
                            }}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View >
            )
        } else {
            return (
                <View style={styles.MainContainer}>
                    <View>
                        <Text style={styles.text}>Guesses:</Text>
                    </View>
                    <View style={styles.Container}>
                        {this.props.userAnswerList.map((item, key) => (
                            <Text key={key} style={styles.List}> {item} </Text>)
                        )}
                    </View>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    Container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: 'auto'
    },
    text: {
        marginEnd: 2,
        marginBottom: 2,
        textAlign: 'center',
        fontSize: 15,
    },
    List: {
        height: 25,
        backgroundColor: 'red',
        marginEnd: 2,
        marginBottom: 2,
        fontSize: 15,
        borderRadius: 8,
        alignContent: 'center',
        paddingLeft: 3,
        paddingRight: 3
    },
});
export default DisplayUserInputs;
