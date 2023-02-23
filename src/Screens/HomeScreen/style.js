import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
        position: "absolute",
        right: 20,
        top: 10,
    },
    detailTxt: {
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 15,
        color: "black",
    },
    infoTxt: {
        marginTop: 20,
    }
})

export default styles