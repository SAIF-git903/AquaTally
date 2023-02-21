import { Text, View, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TextInput } from 'react-native-paper';
import InputButton from '../../Components/InputButton';
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { useSelector } from 'react-redux';


const NewEntry = () => {

    const currentUserId = useSelector(state => state?.currentUserUid)
    const [glass, setGlasses] = useState("")


    async function handleConfirm() {
        const usersColRef = doc(db, 'users', currentUserId);

        try {
            const docSnap = await getDoc(usersColRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const dayOfWeek = new Date().getDay();
                const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
                const dayArr = data[dayName] || [];

                const updatedDayArr = [...dayArr, ...glass];

                const updateData = {
                    [dayName]: updatedDayArr,
                };

                await setDoc(usersColRef, updateData, { merge: true });
                console.log(usersColRef);
            } else {
                const updateData = {
                    Sunday: [],
                    Monday: [],
                    Tuesday: [],
                    Wednesday: [],
                    Thursday: [],
                    Friday: [],
                    Saturday: [],
                };
                
                await setDoc(usersColRef, updateData, { merge: true });
                console.log(usersColRef);
            }
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.headingTxt}>Add New Entry</Text>
            <View style={{ marginHorizontal: 20 }}>
                <TextInput
                    style={styles.input}
                    label="Glasses of water"
                    value={glass}
                    autoCapitalize={'none'}
                    onChangeText={(text) => setGlasses(text)}
                    backgroundColor='transparent'
                />
                <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                    <InputButton title={"1"} onPress={() => setGlasses("1")} />
                    <InputButton title={"2"} onPress={() => setGlasses("2")} />
                    <InputButton title={"3"} onPress={() => setGlasses("3")} />
                    <InputButton title={"4"} onPress={() => setGlasses("4")} />
                    <InputButton title={"5"} onPress={() => setGlasses("5")} />
                </View>
            </View>
            <WaterInTakeBtn title={"Confirm"} onPress={() => handleConfirm()} />
        </View>
    )
}

export default NewEntry


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headingTxt: {
        fontWeight: "800",
        fontSize: 20,
        padding: 20
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        width: "100%",
    },
})



 // useLayoutEffect(() => {

    // const usersColRef = collection(db, 'users');
    // const currentUserDocRef = doc(usersColRef, currentUserId);

    // onSnapshot(currentUserDocRef, (doc) => {
    //   if (doc.exists()) {
    //     const data = doc.data();
    //     const dayOfWeek = new Date().getDay();
    //     const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    //     const dayArr = data[dayName] || [];

    //     console.log(dayArr);
    //     setGraphArr(dayArr)
    //   }
    // });

  // }, [])