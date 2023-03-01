import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { Avatar, TextInput } from 'react-native-paper';
import styles from './style'


const Profile = () => {

    const currentUser = useSelector(state => state?.currentUserAuth?.currentUser)

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
                    <Avatar.Text size={80} label={nameSplitter(currentUser.displayName)}
                        style={{ backgroundColor: "#007791", top: 35 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
                <View style={styles.userNameView}>
                    <TextInput
                        style={styles.input}
                        label="Name"
                        autoCapitalize={'none'}
                        value={currentUser.displayName}
                        onChangeText={(text) => setName(text)}
                        editable={false}
                        backgroundColor='transparent'
                    />
                </View>
                <View style={styles.userNameView}>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        autoCapitalize={'none'}
                        editable={false}
                        value={currentUser.email}
                        backgroundColor='transparent'
                    />
                </View>
            </View>
        </View>
    )
}


export default Profile
