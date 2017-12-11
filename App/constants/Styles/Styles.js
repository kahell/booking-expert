import Colors from "../Colors";
import Layout from "../Layout";

const Roboto = 'Roboto';
const Raleway = 'Raleway';
const Couture = 'Couture';

export default {
    Roboto: Roboto,
    Raleway: Raleway,
    Couture: Couture,
    fontFamily: Raleway,
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'stretch',
    },
    divider: {
        height: 1,
        backgroundColor: '#DDD',
        marginTop: 10,
        marginBottom: 10,
    },
    logoImage: {
        height: 110,
        marginBottom: 30,
        alignSelf: 'center',
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        elevation: 0,
        padding: 12,
        borderRadius: 4,
        backgroundColor: Colors.tintColor,
    },
    buttonAlert: {
        marginTop: 5,
        marginBottom: 5,
        elevation: 0,
        padding: 12,
        borderRadius: 4,
        backgroundColor: '#D9534F',
    },
    buttonLight: {
        marginTop: 5,
        marginBottom: 5,
        elevation: 0,
        padding: 12,
        borderRadius: 4,
        backgroundColor: '#FFF',
    },
    buttonDisabled: {
        elevation: 0,
        padding: 12,
        borderRadius: 4,
        backgroundColor: '#CCC',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
    },
    buttonLightText: {
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
    },
    number: {
        fontFamily: Roboto,
    },
    input: {
        //fontFamily: Raleway,
        //fontSize: 14,
        backgroundColor: '#FFF',
        marginBottom: 5,
        padding: 10,
        alignSelf: 'stretch'
    },
    inputReadonly: {
        color: '#999',
        backgroundColor: '#DDD',
    },
    inlineContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    inline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    textSmall: {
        fontSize: 12,
    },
    textCenter: {
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    textBold: {
        fontWeight: 'bold',
        color: '#333',
    },
    textLink: {
        color: Colors.tintColor,
        backgroundColor: 'transparent',
    },
    textLight: {
        color: '#FFF',
        backgroundColor: 'transparent',
    },
    priceText: {
        color: Colors.tintColor,
    },
    footerContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        position:'absolute',
        bottom: 0,
        alignSelf: 'stretch',
        width:  Layout.window.width
    },
    footer: {
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignSelf: 'stretch',
    },
    noResult: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    noResultText: {
        color: '#666'
    },
};