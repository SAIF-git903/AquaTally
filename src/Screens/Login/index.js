import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StatusBar, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
} from "firebase/auth"
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import { currentUserUid, userLoggingIn, currentUserName, currentUserEmail } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isBtnClicking, setIsBtnClicking] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const ref = useRef("myLocalFlashMessage")


    const handleLogin = async () => {
        setIsBtnClicking(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user, "In login Screen");
                dispatch(currentUserUid(user.uid));
                dispatch(currentUserName(user.displayName));
                dispatch(currentUserEmail(user.email));
                dispatch(userLoggingIn("@userLoggedIn"));
                setIsBtnClicking(false);
                console.log("User logged in successfull")
            })
            .catch((err) => {
                console.log(err.code, "...........")
                switch (err.code) {
                    case "auth/invalid-email":
                        showMessage({
                            message: "Invalid Email",
                            description: "Please try checking your email address.",
                            backgroundColor: "red",
                            type: "warning",
                            color: "white",
                            position: "center"
                        });
                        break;
                    case "auth/wrong-password":
                        showMessage({
                            message: "Wrong password",
                            type: "default",
                            backgroundColor: "red",
                            color: "white",
                        });
                        break
                    case "auth/user-not-found":
                        showMessage({
                            message: "User not found",
                            type: "default",
                            backgroundColor: "red",
                            color: "white",
                        });
                        break
                    case "auth/too-many-requests":
                        showMessage({
                            message: "Too many requests",
                            description: "Access to this account has been temporarily disabled due to many failed login attempts. You can try again later",
                            type: "default",
                            backgroundColor: "purple",
                            color: "white",
                        });
                        break
                    case "auth/network-request-failed":
                        showMessage({
                            message: "Network Request Failed",
                            description: "Network Error. Please try checking your internet connection",
                            type: "default",
                            backgroundColor: "purple",
                            color: "white",
                        });
                        break
                }
                setIsBtnClicking(false);
            });
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} barStyle="dark-content" />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Log into</Text>
                <Text style={styles.title}>your account</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    label="Email"
                    value={email}
                    autoCapitalize={'none'}
                    onChangeText={(text) => setEmail(text)}
                    backgroundColor='transparent'
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        label="Password"
                        value={password}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                        selectionColor="red"
                        backgroundColor='transparent'
                    />
                    <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                        <MaterialCommunityIcons
                            name={showPassword ? "eye" : "eye-off"}
                            color={"gray"}
                            style={{ right: 30 }}
                            size={24}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={{ color: "#0CAFFF", fontWeight: "bold" }}>Forgotten password?</Text>
                </TouchableOpacity>
                <Button
                    style={styles.button}
                    mode="contained"
                    buttonColor='#0CAFFF'
                    onPress={handleLogin}
                    loading={isBtnClicking ? true : false}
                    labelStyle={styles.buttonText}>
                    Login
                </Button>
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Don't have an account yet?</Text>
                <TouchableWithoutFeedback onPress={() => {
                    setEmail("")
                    setPassword("")
                    navigation.navigate("SignUp")
                }}>
                    <Text style={styles.footerLink}>Sign up</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};


export default Login;