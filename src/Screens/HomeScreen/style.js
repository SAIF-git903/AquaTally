import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    headerStyle: {
        backgroundColor: "#0CAFFF",
        height: 190,
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
    infoTxt: {
        marginTop: 20,
    },
    infoTxt2: {
        marginTop: 15
    },
    plusView: {
        alignItems: "center",
        position: "absolute",
        bottom: 5,
    },
    plusIcon: {
        backgroundColor: "#0CAFFF",
        padding: 10,
        borderRadius: 30,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    moreInfoTxt: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 5,
        textDecorationLine: "underline",
    }
})

export default styles