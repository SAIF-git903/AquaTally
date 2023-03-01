import React from 'react';
import {
    SafeAreaView,
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
import styles from './style';


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

export default CustomSidebarMenu;
