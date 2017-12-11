import React from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import {ListView, Text,View, Image, Tile, Title, Divider, Subtitle, Row, Icon, Caption, TouchableOpacity} from "@shoutem/ui";
import {connect} from "react-redux";
import BookingActions from "../../redux/BookingRedux";

class BookingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.props.getBookingList();
    }

    componentDidMount() {
        this._interval = setInterval(() => {
            this.props.getBookingList();
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    renderRow = (item) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BookingDetails', { booking: item })}>
            <Row style={{marginBottom: 1}}>
                <Image
                    styleName="small rounded-corners"
                    source={{ uri: item.package_image }}
                />
                <View styleName="vertical stretch space-between">
                    <Caption>{item.section}</Caption>
                    <Caption>{item.formatted_event_date} - {item.duration}</Caption>
                    <Subtitle>{item.package_name}</Subtitle>
                    <Subtitle styleName="md-gutter-right">{item.formatted_price}</Subtitle>
                    <Caption>{item.status}</Caption>
                </View>
                <Icon styleName="disclosure" name="right-arrow" />
            </Row>
            </TouchableOpacity>
        );
    };

    renderError = (error) => {
        if(error)
        {
            return (
                <View>
                    <Text >{error}</Text>
                </View>
            );
        }
    };

    render() {
        const { bookings, error } = this.props;
        return (
            <ScreenContainer>
                {this.renderError(error)}
                <ListView
                    data={bookings}
                    renderRow={this.renderRow}
                />
            </ScreenContainer>
        );
    }
}

const styles = {

};

const mapStateToProps = (state) => {
    return {
        bookings: state.booking.bookingList,
        fetching: state.booking.fetchingBookingList,
        error: state.booking.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBookingList: () => dispatch(BookingActions.bookingListRequest()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);
