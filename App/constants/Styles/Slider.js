import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.28;
const slideWidth = wp(35);
const itemHorizontalMargin = 5;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 0;

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on ios; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: Platform.OS === 'ios' ? 'white' : 'transparent'
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 7 - entryBorderRadius,
        paddingBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    title: {
        fontSize: 13,
        letterSpacing: 0.5,
        textAlign: 'center',
        paddingBottom: 2,
    },
    subtitle: {
        color: colors.gray,
        fontSize: 10,
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 3,
    },
    price: {
        textAlign: 'center',
        fontWeight: 'bold',
    }
});