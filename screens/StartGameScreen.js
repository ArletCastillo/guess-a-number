import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        // Regular expression: whatever that is not a number, replace it to empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = <Text>Chosen Number: {selectedNumber}</Text>
    }

    return(
        // dismiss the keyboard when pressing anywhere on screen that is not the keyboard
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input style={styles.input} 
                       blurOnSubmit 
                       autoCapitalize='none' 
                       autoCorrect={false}
                       keyboardType="number-pad"
                       maxLength={2}
                       onChangeText={numberInputHandler}
                       value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={ styles.button }>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                        </View>
                        <View style={ styles.button }>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    }
});

export default StartGameScreen;