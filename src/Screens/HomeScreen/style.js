import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    headerStyle: {
        backgroundColor: "#0CAFFF",
        height: 150,
        width: "100%",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 10,
    },
    logoTxt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 19,
        padding: 15
    },
    userNameTxt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 19,
        padding: 15,
        position:"absolute",
        right: 10
    }
})

export default styles