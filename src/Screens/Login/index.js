import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { currentUserUid, userLoggingIn, currentUserName, currentUserEmail } from '../../Redux/actions';
import { useDispatch } from 'react-redux';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation()
    const dispatch = useDispatch()
    

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid, "In login Screen");
                dispatch(currentUserUid(user.uid))
                dispatch(currentUserName(user.displayName))
                dispatch(currentUserEmail(user.email))
                dispatch(userLoggingIn("@userLoggedIn"))
            })
            .catch((err) => {
                console.log(err)
            })
    };


    return (
        <View style={styles.container}>
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
                <Button
                    style={styles.button}
                    mode="contained"
                    buttonColor='#0CAFFF'
                    onPress={handleLogin}
                    labelStyle={styles.buttonText}>
                    Login
                </Button>
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Don't have an account yet?</Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.footerLink}>Sign up</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};


export default Login;
