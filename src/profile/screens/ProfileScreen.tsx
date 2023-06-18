import React from 'react';
import {View, Image, ImageBackground} from 'react-native';

import background_monuments from '../../assets/images/backgrounds/background_monuments.png';
import logo_white from '../../assets/images/logos/logo_white.png';
import {styles} from '../styles/ProfileStyles';

export default function ProfileScreen() {
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.backgroundColor} />
      <ImageBackground source={background_monuments} style={styles.background}>
        <View style={styles.container}>
          <View>
            <Image
              source={logo_white}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
