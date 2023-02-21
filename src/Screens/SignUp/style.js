import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "black"
    },
    form: {
        width: '80%',
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        width: "100%"
    },
    button: {
        marginTop: 20,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: "gray",
    },
    footerLink: {
        fontSize: 16,
        color: "#0CAFFF",
        fontWeight: "bold",
        marginLeft: 5,
    },
    passwordContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
})

export default styles