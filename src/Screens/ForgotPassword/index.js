import { Text, View } from 'react-native'
import React, { useState, useRef } from 'react'
import styles from './style'
import { confirmPasswordReset, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebase'
import { TextInput, Button } from "react-native-paper"


const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [isBtnClicking, setIsBtnClicking] = useState(false)
    const [isMailSend, setIsMailSend] = useState(false)
    const [isMailValid, setIsMailValid] = useState(false)

    function handleForgotPassword() {
        setIsBtnClicking(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Email send successfully")
                setIsBtnClicking(false)
                setIsMailSend(true)
                setIsMailValid(false)
                setEmail("")
            })
            .catch((err) => {
                console.log(err.code)
                if (err.code === "auth/invalid-email") {
                    console.log("similar")
                    setIsMailValid(true)
                    setIsBtnClicking(false)
                }
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.enterEmailTxt}>Enter Your email Address</Text>
            <TextInput
                style={styles.input}
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                selectionColor="red"
                autoCapitalize='none'
                backgroundColor='transparent'
            />
            {isMailValid && <Text style={{ alignSelf: "flex-start", marginLeft: 50, color: "red", fontWeight: "bold" }}>Invalid Email !</Text>}
            <Button
                style={styles.button}
                mode="contained"
                buttonColor='#0CAFFF'
                onPress={handleForgotPassword}
                loading={isBtnClicking ? true : false}
                labelStyle={styles.buttonText}>
                {isMailSend ? "Check your Email" : "Reset"}
            </Button>
        </View>
    )
}

export default ForgotPassword
