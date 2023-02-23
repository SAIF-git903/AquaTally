import React, { useLayoutEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen'
import NewEntry from '../Screens/NewEntryScreen'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import Profile from '../Screens/Profile'
import Splash from '../Screens/SplashScreen'
import { useSelector } from 'react-redux'


const NavContainer = () => {

    const token = useSelector(state => state.token)
    const Stack = createNativeStackNavigator()

    useLayoutEffect(() => {
        console.log(token, "TOKEN")
    }, [])

    const AuthStack = () => {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerBackVisible: false,
                    headerShown: false,
                }}>
                {/* <Stack.Screen name="Splash" component={Splash} /> */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        );
    };


    const MyStack = () => {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerBackVisible: false,
                    headerShown: false,
                }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="NewEntry" component={NewEntry} />
                <Stack.Screen name="Profile" component={Profile}
                    options={{
                        headerShown: true,
                        headerBackVisible: true,
                        headerTitle: "",
                    }}
                />
            </Stack.Navigator>
        );
    };

    const RootNavigation = () => {
        return (
            <NavigationContainer>
                {token === null ? <AuthStack /> : <MyStack />}
            </NavigationContainer>
        )
    }

    return (
        <RootNavigation />
    )
}

export default NavContainer
