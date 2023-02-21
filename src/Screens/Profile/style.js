import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    profilePic: {
        marginBottom: 20
    },
    nameTxt: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    email: {
        fontSize: 18,
        color: '#777'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    logoutButton: {
        backgroundColor: '#007791',
        borderRadius: 10,
        marginBottom: 10
    },
    signInButton: {
        borderRadius: 10
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
})

export default styles