import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: "contain"
    },
    splashTxt: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 20
    }
})

export default styles