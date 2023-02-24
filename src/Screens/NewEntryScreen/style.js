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
        width: 300,
    },
    waterConsumptionTime: {
        backgroundColor: "#B3E5FC",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
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
    box_shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,

        elevation: 10,
        width: "80%",
        marginVertical: 10,
        borderRadius: 10
    }
})

export default styles