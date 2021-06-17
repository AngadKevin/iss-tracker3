import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import axois from "axois";

export default class MeteorScreen extends Component {
    constructor() {
        super();
        this.state = {
            meteors={}
        }
    }
    componentDidMount() {
        this.getmeteordata()
    }
    getmeteordata = () => {
        axois.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=Zd0lsize9kNnTvCHObraxrrSHcooy2IyTIxtKfOu").then(response => {
            this.setState({ meteors: response.data.near_earth_objects })
        }).catch((error) => {
            Alert.alert(error.message)
        })
    }
    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (<View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>LOADING!!!</Text>
            </View>)
        }
        else {
            var meteor = Object.keys(this.state.meteors).map(meteorDate => {
                return this.state.meteors[meteorDate]
            })
            var met = [].concat.apply([], meteor)
            met.forEach(function (element) {
                var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                var threatscore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 100000000
                element.threatscore = threatscore
            });
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Meteor Screen!</Text>
                </View>
            )
        }
    }
}