import React, { useState, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';
import { db } from '../../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import FlashMessage from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { useDispatch } from 'react-redux';
import { authCurrentUser } from '../../Redux/actions';


const SignUp = () => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false)
    const navigation = useNavigation()
    const ref = useRef("myLocalFlashMessage")
    const dispatch = useDispatch()


    const handleSignUp = () => {
        setIsloading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                async function handle() {
                    const usersColRef = collection(db, "users")
                    const parentDocRef = doc(usersColRef, cred.user.uid);
                    await setDoc(parentDocRef, {})
                    dispatch(authCurrentUser(auth.currentUser))
                }
                handle()
                    .then(() => {
                        updateProfile(auth?.currentUser, {
                            displayName: name,
                        })
                        setIsloading(false)
                        showMessage({
                            message: "Account Created Successfully!",
                            description: "Please login again to continue",
                            type: "success",
                            backgroundColor: "purple",
                            color: "white",
                            position: "top"
                        });
                        navigation.navigate("Login")
                    })
            }).catch((err) => {
                setIsloading(false)
                console.log(err.code, "ddddddddddddddddd")
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
                    case "auth/weak-password":
                        showMessage({
                            message: "Weak Password",
                            description: "Password should be at least 6 characters.",
                            backgroundColor: "red",
                            color: "white",
                            position: "center"
                        });
                }
            })
    };


    return (
        <>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{ marginLeft: 40, marginBottom: 50 }}>
                    <Text style={styles.title}>Create</Text>
                    <Text style={styles.title}>your account</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            label="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            backgroundColor='transparent'
                        />
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
                                    style={{ right: 30 }}
                                    color={"gray"}
                                    size={24}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <Button
                            style={styles.button}
                            mode="contained"
                            buttonColor='#0CAFFF'
                            onPress={handleSignUp}
                            loading={isLoading}
                            labelStyle={styles.buttonText}>
                            Create Account
                        </Button>
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.footerLink}>Log in</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <FlashMessage ref={ref} position="top" duration={2500} />
            </KeyboardAvoidingView>
        </>
    );
};

export default SignUp;

