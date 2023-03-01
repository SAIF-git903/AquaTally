import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 50,
        backgroundColor:"#0CAFFF"
    },
    profilePic: {
        marginTop: 10
    },
    email: {
        fontSize: 18,
        color: '#777'
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    input: {
        backgroundColor: 'transparent',
        width: "100%",
    },
    userNameView: {
        marginBottom: 20,
        marginHorizontal: 20
    },
})

export default styles