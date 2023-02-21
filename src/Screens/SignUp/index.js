import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';
import styles from './style';
import { db } from '../../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { currentUserUid } from '../../Redux/actions';
import { useDispatch } from 'react-redux';


const SignUp = () => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation()
    const dispatch = useDispatch()


    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                const usersColRef = collection(db, "users")
                setDoc(doc(usersColRef, cred.user.uid), {})
                    .then(() => {
                        updateProfile(auth?.currentUser, {
                            displayName: name
                        })
                        navigation.navigate("Login")
                    })
            })
    };


    return (
        <View style={styles.container}>
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
        </View>
    );
};

export default SignUp;


// useLayoutEffect(() => {
//     function getDayString(num) {
//         var day;
//         switch (num) {
//             case 0:
//                 day = "Sunday";
//                 break;
//             case 1:
//                 day = "Monday";
//                 break;
//             case 2:
//                 day = "Tuesday";
//                 break;
//             case 3:
//                 day = "Wednesday";
//                 break;
//             case 4:
//                 day = "Thursday";
//                 break;
//             case 5:
//                 day = "Friday";
//                 break;
//             case 6:
//                 day = "Saturday";
//                 break;
//             default:
//                 day = "Invalid day";
//         }
//         setToday(day)
//     }

//     theDate = new Date();
//     getDayString(theDate.getDay())
// }, [])
