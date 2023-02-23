import { Text, View, StyleSheet } from 'react-native'
import React, {  useState } from 'react'
import { TextInput } from 'react-native-paper';
import InputButton from '../../Components/InputButton';
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore';
import { db} from '../../../firebase';
import { useSelector } from 'react-redux';
import moment from 'moment';


const NewEntry = () => {

    const currentUserId = useSelector(state => state?.currentUserUid)
    const [glass, setGlasses] = useState(null)

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const weekday = weekdays[today.getDay()];


    async function handleConfirm() {
      const usersColRef = collection(db, "users");
      const parentDocRef = doc(usersColRef, currentUserId);
      const subColRef = collection(parentDocRef, weekday);
      const subDocRef = doc(subColRef, "Data");
    
      const docSnapshot = await getDoc(subDocRef);
      const currentGraphArr = docSnapshot.data()?.graphArr || [];
    
      const newObject = { value: glass };
      const updatedGraphArr = [...currentGraphArr, newObject];
    
      await updateDoc(subDocRef, { 
        graphArr: updatedGraphArr,
        lastConsumptionOfWater: moment(new Date().getTime()).format("h:mm:ss a")
       }, { merge: true });
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.headingTxt}>Add New Entry</Text>
            <View style={{ marginHorizontal: 20 }}>
                <TextInput
                    style={styles.input}
                    label="Glasses of water"
                    value={String(glass)}
                    autoCapitalize={'none'}
                    onChangeText={(text) => setGlasses(text)}
                    keyboardType="numeric"
                    backgroundColor='transparent'
                />
                <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                    <InputButton title={"1"} onPress={() => setGlasses(1)} />
                    <InputButton title={"2"} onPress={() => setGlasses(2)} />
                    <InputButton title={"3"} onPress={() => setGlasses(3)} />
                    <InputButton title={"4"} onPress={() => setGlasses(4)} />
                    <InputButton title={"5"} onPress={() => setGlasses(5)} />
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
