import React from 'react';
import {View, StyleSheet} from "react-native";

export class Grid extends React.Component {

    render() {
        const {children, style} = this.props;
        return (
            <View {...this.props}
                style={[styles.grid, style]} >
                {children}
            </View>
        );
    }
}

export class Row extends React.Component {
    render() {
        const {children, style} = this.props;
        return (
            <View {...this.props}
                  style={[styles.row, style]} >
                {children}
            </View>
        );
    }
}

export class Col extends React.Component {
    render() {
        const {children, style} = this.props;
        return (
            <View {...this.props}
                style={[styles.col, style]} >
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    col: {
        flex: 1,
    }
});