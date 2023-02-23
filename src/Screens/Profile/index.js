import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import styles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggingOut } from '../../Redux/actions'
import { auth } from '../../../firebase'
import { Avatar, Button } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';


const Profile = () => {

    const dispatch = useDispatch()
    const displayName = useSelector(state => state?.currentUserName)
    const userId = useSelector(state => state?.currentUserUid)
    const email = useSelector(state => state?.currentUserEmail)


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
                <Button mode="outlined" onPress={() => { "" }} style={styles.signInButton}>
                    Sign in another account
                </Button>
            </View>
        </View>
    )
}



export default Profile
