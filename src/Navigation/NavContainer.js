import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen'
import NewEntry from '../Screens/NewEntryScreen'


const NavContainer = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='NewEntryScreen' component={NewEntry} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavContainer
