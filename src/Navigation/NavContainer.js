import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import HomeScreen from '../Screens/HomeScreen'
import NewEntry from '../Screens/NewEntryScreen'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import ForgotPassword from '../Screens/ForgotPassword'
import Profile from '../Screens/Profile'
import Splash from '../Screens/SplashScreen'


const NavContainer = () => {

    const token = useSelector(state => state.token)
    const [splash, setSplash] = useState(true)
    const Stack = createNativeStackNavigator()
    const Drawer = createDrawerNavigator()

    const AuthStack = () => {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerBackVisible: false,
                    headerShown: false,
                }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}
                    options={{
                        headerBackVisible: true,
                        headerShown: true,
                        headerTitle: ""
                    }}
                />
            </Stack.Navigator>
        );
    };


    const DrawerStack = () => {
        return (
            <Drawer.Navigator screenOptions={{ headerShown: false, drawerPosition: "right" }}>
                <Drawer.Screen name='Home' component={HomeScreen} />
                <Drawer.Screen name='Profile' component={Profile}
                    options={{
                        headerShown: true,
                    }}
                />
            </Drawer.Navigator>
        )
    }

    const MyStack = () => {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerBackVisible: false,
                    headerShown: false,

                }}>
                <Stack.Screen name="Drawer" component={DrawerStack} />
                <Stack.Screen name="NewEntry" component={NewEntry}
                    options={{
                        headerShown: true,
                        headerBackVisible: true,
                        headerTitle: "New Entry",
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: "#0CAFFF",
                        }
                    }} />
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

    setTimeout(() => {
        setSplash(false)
    }, 2500)
    

    return (
        <>
            {
                splash ? <Splash /> : <RootNavigation />
            }
        </>
    )
}

export default NavContainer
