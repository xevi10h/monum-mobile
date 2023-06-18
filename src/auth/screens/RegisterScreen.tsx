// import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';

import background_monuments from '../../assets/images/backgrounds/background_monuments.png';
import password_eye from '../../assets/images/icons/password_eye.png';
import password_eye_crossed from '../../assets/images/icons/password_eye_crossed.png';
import logo_white from '../../assets/images/logos/logo_white.png';
import {RootStackParamList} from '../navigator/AuthNavigator';
import {styles} from '../styles/LoginStyles';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({navigation}: Props) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
          <View style={styles.buttonContainer}>
            <TextInput
              placeholder={t('authScreens.email') || 'Email'}
              placeholderTextColor="#FFFFFF"
              style={styles.inputButton}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder={t('authScreens.password') || 'Password'}
                placeholderTextColor="#FFFFFF"
                style={[styles.inputButton]}
                secureTextEntry={!showPassword} // Mostrar o ocultar la contraseña según el estado
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.hidePasswordButton}
                onPress={togglePasswordVisibility}>
                {showPassword ? (
                  <Image
                    source={password_eye}
                    style={styles.hidePasswordButtonIcon}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={password_eye_crossed}
                    style={styles.hidePasswordButtonIcon}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
