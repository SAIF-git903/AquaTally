import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    titleContainer: {
        marginBottom: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "black"
    },
    formContainer: {
        alignItems: "center",
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        width: "100%",
    },
    passwordContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        marginTop: 20,
        borderRadius: 30,
        width:"90%"
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
})

export default styles