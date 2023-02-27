import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggingOut } from '../../Redux/actions'
import { auth } from '../../../firebase'
import { Avatar, Button } from 'react-native-paper';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { authCurrentUser } from '../../Redux/actions'



const Profile = () => {

    const dispatch = useDispatch()
    const displayName = useSelector(state => state?.currentUserName)
    const userId = useSelector(state => state?.currentUserUid)
    const email = useSelector(state => state?.currentUserEmail)
    const authCurrentUser = useSelector(state => state?.currentUserAuth)
    const [name, setName] = useState("")

    function handleLogOut() {
        console.log("Clicking")
        dispatch(userLoggingOut())
    }

    function nameSplitter(name) {
        let splittedName = name.split(" ")
        let splittings = []
        splittedName.forEach((item) => {
            let itemN = item.split("")
            splittings.push(itemN[0])
        })
        return splittings.join("")
    }

    console.log(authCurrentUser, "authCurrentUser")

    function handleUpdateProfile() {
        updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    // const auth = getAuth();
    // const user = auth.currentUser;
    // console.log(user, "User")
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/firebase.User
    //         const uid = user.uid;
    //         // ...
    //         console.log(user)
    //     } else {
    //         // User is signed out
    //         // ...
    //     }
    // });
    // console.log(auth?.currentUser, "Current User")

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.profilePic}>
                    <Avatar.Text size={80} label={nameSplitter(displayName)}
                        style={{ backgroundColor: "#007791", }} />
                </TouchableOpacity>
                <Text style={styles.nameTxt}>{displayName}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handleLogOut} style={styles.logoutButton}>
                    Logout
                </Button>
                <TextInput
                    onChangeText={(text) => setName(text)}
                />
                <Button mode="outlined" onPress={() => handleUpdateProfile()} style={styles.signInButton}>
                    Update Profile
                </Button>
            </View>
        </View>
    )
}



export default Profile
