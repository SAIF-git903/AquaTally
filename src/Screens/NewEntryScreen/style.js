import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    headingTxt: {
        fontWeight: "800",
        fontSize: 20,
        padding: 20
    },
    input: {
        marginVertical: 10,
        backgroundColor: "transparent",
        padding: 10,
        width: 300
    },
    waterConsumptionTime: {
        marginTop: 10,
        backgroundColor: "rgb(203, 241, 250)",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: "80%"
    },
    headingTxt2: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})

export default styles