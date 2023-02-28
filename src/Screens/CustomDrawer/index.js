import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { userLoggingOut } from '../../Redux/actions';
import logo from "../../assets/images/logo.png"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"


const CustomSidebarMenu = (props) => {

    const dispatch = useDispatch()

    function handleLogOut() {
        console.log("Clicking")
        signOut(auth).then(() => {
            console.log("Sign Out successfully")
            dispatch(userLoggingOut())
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image
                source={logo}
                style={styles.sideMenuProfileIcon}
            />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity style={styles.touchLogOut} onPress={handleLogOut}>
                <MaterialIcons name="logout" size={25} color="black" />
                <Text style={styles.logoutTxt}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 60,
        height: 60,
        margin: 15,
        alignSelf: 'center',
    },
    logoutTxt: {
        marginTop: 3,
        marginLeft: 10,
        fontWeight: "bold",
        color: "black"
    },
    touchLogOut: {
        marginLeft: 40,
        marginBottom: 10,
        flexDirection: "row"
    }
});

export default CustomSidebarMenu;
