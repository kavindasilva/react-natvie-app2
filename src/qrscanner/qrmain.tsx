import React, { Component } from 'react';

import {
    View, TextInput, ScrollView, StyleSheet, Text, Button,
    AppRegistry, TouchableOpacity, Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


export default class ScanScreen extends Component {
    state = {
        useBackCam: true,
        useFlash: false,
        qr_data: "scan qr/bar code",
        // qrFlashMode: RNCamera.Constants.FlashMode.off,
    }

    setFlashMode = () => {
        this.setState({useFlash: !this.state.useFlash })
        return true; // just used in incomplete unit testing
    }

    onSuccess = data => {
        console.log("qr result: ", data);
        console.debug("qr result str:", JSON.stringify(data, null, 2) );
        this.setQrcodeData(data);
        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
    };

    setQrcodeData = (data) => {
        let url = data.data;
        this.setState({qr_data: url });
    }

    openQrUrl = () => {
        Linking.openURL(this.state.qr_data)
            .catch(err =>
                console.error('openQrUrl error:', err)
            );
    }

    render() {
        return (
            <ScrollView style={{flex:1}} keyboardShouldPersistTaps="always" >
                <View style={{flex:1}}>
                    <View style={{flex:2}}>
                    <QRCodeScanner
                        onRead={this.onSuccess}
                        ref={(node) => { this.qrscanner = node }}
                        flashMode={ this.state.useFlash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off }
                        // topContent={
                        //     <Text style={styles.centerText}>
                        //         Go to{' '}
                        //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                        //         your computer and scan the QR code.
                        //     </Text>
                        // }
                        cameraType={ (this.state.useBackCam) ? "back" : "front" }
                        cameraStyle={ {flex: 1} }
                        // bottomContent={
                        //     <TouchableOpacity style={styles.buttonTouchable}>
                        //         <Text style={styles.buttonText}>OK. Got it!</Text>
                        //     </TouchableOpacity>
                        // }
                    />
                    </View>
                    <View style={{flex:1}}>
                        <Text>Control panel</Text>
                        <Button title="CAM" onPress={ (e)=>this.setState({useBackCam: !this.state.useBackCam})} />
                        <Button title="FLASH" onPress={ (e)=>this.setFlashMode() } />
                        <Button title="reScan" onPress={ () => this.qrscanner.reactivate() } />
                        <TextInput value={ this.state.qr_data } />
                        <Button 
                            title="open" 
                            onPress={ () => this.openQrUrl() }
                            disabled={ this.state.qr_data==="scan qr/bar code" }
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
