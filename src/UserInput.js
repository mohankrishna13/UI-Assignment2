import React, { Component } from 'react';
import { View, TextInput, Text, TouchableHighlight, StyleSheet } from 'react-native';

class UserAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    handlesubmit = () => {
        if (this.state.text) {
            this.props.setAnswer(this.state.text);
            this.setState({
                text: ''
            });
        }
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.container}>
                    <View>
                        <TextInput
                            style={styles.label}
                            placeholder="Enter Your Word!"
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                    <View  >
                        <TouchableHighlight style={styles.button}
                            onPress={() => this.handlesubmit()} >
                            <Text style={{ fontSize: 18, color: 'white' }}>Submit</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: 10,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a8cf7',
        borderRadius: 8,
    },
    label: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5
    }
})
export default UserAnswer;