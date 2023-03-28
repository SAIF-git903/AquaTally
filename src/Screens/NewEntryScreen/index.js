import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { doc, getDoc, collection, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import InputButton from '../../Components/InputButton';
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Modal from 'react-native-modal';
import InfoModal from '../../Components/InfoModal';
import styles from './style';
import DatePicker from "react-native-date-picker"
import Notification from '../../../Notifications';


const NewEntry = () => {

    const currentUser = useSelector(state => state?.currentUserAuth?.currentUser?.uid)
    const [date, setDate] = useState(new Date())
    const [glass, setGlasses] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [time, setTime] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [dailyWaterLimit, setDailyWaterLimit] = useState("")
    const [isTodaysLimitSet, setIsTodaysLimitSet] = useState(false)
    const [items, setItems] = useState([
        { label: '1.5 liter', value: '1500' },
        { label: '2 liter', value: '2000' },
        { label: '2.5 liter', value: '2500' },
        { label: '3 liter', value: '3000' },
        { label: '3.5 liter', value: '3500' },
    ]);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const weekday = weekdays[today.getDay()];


    async function handleConfirm() {
        const usersColRef = collection(db, "users");
        const parentDocRef = doc(usersColRef, currentUser);
        const subColRef = collection(parentDocRef, weekday);
        const subDocRef = doc(subColRef, "Data");

        const docSnapshot = await getDoc(subDocRef);
        const currentGraphArr = docSnapshot.data()?.graphArr || [];
        const todaysWaterLimit = docSnapshot.data()?.TodayWaterDrinkingLimit

        const newObject = { value: glass };

        const updatedGraphArr = [...currentGraphArr, newObject];

        if (todaysWaterLimit) {
            await updateDoc(subDocRef, {
                graphArr: updatedGraphArr,
                lastConsumptionOfWater: moment(new Date().getTime()).format("hh:mm A"),
            }, { merge: true });
        } else {
            await setDoc(subDocRef, {
                graphArr: updatedGraphArr,
                lastConsumptionOfWater: moment(new Date().getTime()).format("hh:mm A"),
                TodayWaterDrinkingLimit: dailyWaterLimit
            }, { merge: true });
        }
    }

    const currentTime = moment(new Date().getTime()).format("h:mm:ss a")

    setTimeout(() => {
        setTime(currentTime)
    }, 500);

    useEffect(() => {
        console.log(currentTime)
    }, [time])

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useLayoutEffect(() => {
        const usersColRef = collection(db, "users");
        const parentDocRef = doc(usersColRef, currentUser);
        const subColRef = collection(parentDocRef, weekday);
        const subDocRef = doc(subColRef, "Data");

        onSnapshot(subDocRef, (snapShot) => {
            if (snapShot.data()?.TodayWaterDrinkingLimit) {
                setIsTodaysLimitSet(true)
            }
        })
    }, [])

    function setNotification() {
        Notification.scheduleNotification(date)
    }
    
    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 20 }}>
                <TextInput
                    style={styles.input}
                    editable={false}
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
                </View>
            </View>
            <WaterInTakeBtn title={"Confirm"} onPress={() => handleConfirm()} />
            <View style={{ marginTop: 30 }}>
                <DatePicker
                    date={date}
                    onDateChange={setDate}
                />
                <Text onPress={() => setNotification()}>Set Timer</Text>
            </View>
            {/* <View style={styles.box_shadow}>
                <View style={styles.waterConsumptionTime}>
                    <Text style={styles.headingTxt2}>Time of water consumption</Text>
                    <Text style={{ fontSize: 12 }}>{currentTime}</Text>
                </View>
            </View> */}
            <View style={styles.box_shadow}>
                <View style={styles.waterConsumptionTime}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            isTodaysLimitSet ? <Text style={styles.headingTxt2}>Your daily water limit for today is set.</Text> : <Text style={styles.headingTxt2}> Set Today's Water Limit</Text>
                        }
                        <TouchableOpacity
                            onPress={() => toggleModal()}
                            style={{ position: "absolute", right: -30, backgroundColor: "#003366", borderRadius: 30, padding: 2, top: -10 }}>
                            <MaterialCommunityIcons name="information-variant" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    {
                        !isTodaysLimitSet && <DropDownPicker
                            style={{ width: 120, marginTop: 5, backgroundColor: "#B3E5FC" }}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            onChangeValue={(value) => setDailyWaterLimit(value)}
                            setValue={setValue}
                            placeholder="Select"
                            setItems={setItems}
                            dropDownContainerStyle={{
                                width: 120,
                                backgroundColor: "#B3E5FC"
                            }}
                            disabled={isTodaysLimitSet}
                        />
                    }
                    <Modal
                        isVisible={isModalVisible}
                        onBackdropPress={toggleModal}
                        style={styles.modal}
                    >
                        <InfoModal />
                    </Modal>
                </View>
            </View>
        </View>
    )
}


export default NewEntry


{/* <meta-data android:name="google_analytics_adid_collection_enabled" android:value="false" />
<meta-data android:name="com.dieam.reactnativepushnotification.notification_channel_name" android:value="NotifcationDemo"/>
<meta-data android:name="com.dieam.reactnativepushnotification.notification_channel_description" android:value="NotifcationDemo Notifications"/>
<!-- Change the resource name to your App's accent color - or any other color you want -->
<meta-data android:name="com.dieam.reactnativepushnotification.notification_color" android:resource="@android:color/white"/>

<receiver android:name="com.google.android.gms.gcm.GcmReceiver" android:exported="true" android:permission="com.google.android.c2dm.permission.SEND">
   <intent-filter>
      <action android:name="com.google.android.c2dm.intent.RECEIVE" />
       <category android:name="${applicationId}" />
   </intent-filter>
</receiver>
<receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationPublisher" />
<receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
    </intent-filter>
</receiver>
<service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationRegistrationService"/>
<service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerServiceGcm" android:exported="false">
    <intent-filter>
       <action android:name="com.google.android.c2dm.intent.RECEIVE" />
    </intent-filter>
</service> */}