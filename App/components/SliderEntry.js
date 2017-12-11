import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from "../constants/Styles/Slider";
import StarRating from "react-native-star-rating/star-rating";

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { cover_image, id }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
                source={{ uri: illustration }}
                containerStyle={[styles.imageContainer]}
                style={[styles.image, { position: 'relative' }]}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
            <Image
                source={{ uri: "https://randomuser.me/api/portraits/women/"+ id +".jpg" }}
                style={styles.image}
            />
        );
    }

    render () {
        const { data: { username, skills_tag, lowest_price, rating }} = this.props;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                //onPress={() => { alert(`You've clicked '${title}'`); }}
            >
                <View style={[styles.imageContainer]}>
                    { this.image }
                    <View style={[styles.radiusMask]} />
                </View>
                <View style={[styles.textContainer]}>
                    <Text
                        style={[styles.title]}
                        numberOfLines={1}
                    >
                        { username }
                    </Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={rating}
                        starSize={12}
                        starColor={'#2E9BD7'}
                        emptyStarColor={'#2E9BD7'}
                        starStyle={{padding:1}}
                    />
                    <Text
                        style={[styles.subtitle]}
                        numberOfLines={1}
                    >
                        { skills_tag }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}