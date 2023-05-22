import axios from 'axios';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {styles} from '../styles/LoginStyles';
import logo_white from '../assets/images/logos/logo_white.png';
import background_monuments from '../assets/images/backgrounds/background_monuments.png';
import google_sign_in_logo from '../assets/images/logos/google_sign_in_logo.png';

export default function LoginScreen() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  async function handleLogin() {
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/auth/login',
        {
          username: 'xeviht',
          password: 'Xa229er147.,',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }

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
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                try {
                  await GoogleSignin.hasPlayServices();
                  await GoogleSignin.signIn();
                  const currentUser = await GoogleSignin.getCurrentUser();
                  console.log(currentUser);
                  await handleLogin();
                } catch (error: any) {
                  if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
                    console.log(
                      'El inicio de sesión con Google fue cancelado.',
                    );
                  } else if (error?.code === statusCodes.IN_PROGRESS) {
                    console.log(
                      'Ya hay una operación de inicio de sesión en curso.',
                    );
                  } else if (
                    error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                  ) {
                    console.log(
                      'Los servicios de Google Play no están disponibles o no están actualizados.',
                    );
                  } else {
                    console.log('Error al iniciar sesión:', error);
                  }
                }
              }}>
              <Image
                source={google_sign_in_logo}
                style={styles.buttonLogo}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Continuar con Google</Text>
            </TouchableOpacity>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <View style={styles.separatorCircle} />
              <View style={styles.separatorLine} />
            </View>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Registrarse con tu email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
