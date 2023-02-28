import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggingOut } from '../../Redux/actions'
import { auth } from '../../../firebase'
import { Avatar, Button, TextInput } from 'react-native-paper';
import { getAuth, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth'
import { authCurrentUser } from '../../Redux/actions'


const Profile = () => {

    const dispatch = useDispatch()
    const displayName = useSelector(state => state?.currentUserName)
    const userId = useSelector(state => state?.currentUserUid)
    const email = useSelector(state => state?.currentUserEmail)
    const currentUserAuth = useSelector(state => state?.currentUserAuth)

    const [name, setName] = useState("")

    // function handleLogOut() {
    //     console.log("Clicking")
    //     signOut(auth).then(() => {
    //         console.log("Sign Out successfully")
    //         dispatch(userLoggingOut())
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    function nameSplitter(name) {
        let splittedName = name.split(" ")
        let splittings = []
        splittedName.forEach((item) => {
            let itemN = item.split("")
            splittings.push(itemN[0])
        })
        return splittings.join("")
    }


    function handleUpdateProfile() {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log("Display Name Updated Successfully")
                console.log(auth?.currentUser?.displayName)
            }).catch((err) => {
                console.log(err)
            })
    }


    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user, "Logged In")
        } else {
            console.log(user, "User Signed Out")
        }
    });


    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.profilePic}>
                    <Avatar.Text size={80} label={nameSplitter(displayName)}
                        style={{ backgroundColor: "#007791", top: 35 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
                <View style={styles.userNameView}>
                    <TextInput
                        style={styles.input}
                        label="Name"
                        autoCapitalize={'none'}
                        value={displayName}
                        backgroundColor='transparent'
                    />
                </View>
                <View style={styles.userNameView}>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        autoCapitalize={'none'}
                        value={email}
                        backgroundColor='transparent'
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={() => handleUpdateProfile()} style={styles.signInButton}>
                    Update Profile
                </Button>
            </View>
        </View>
    )
}


export default Profile
