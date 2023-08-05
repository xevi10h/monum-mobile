import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import AuthServices from './AuthServices';

class GoogleAuthService {
  public async configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId:
        '944908105248-u4k7dp5du3a3ahcg1u6a284u0mri26av.apps.googleusercontent.com',
    });
  }

  public async signInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('Usuario actual:', currentUser);
      if (!currentUser || !currentUser.idToken) {
        throw new Error('No se pudo obtener el usuario actual.');
      }
      const {email, name, id, photo} = currentUser.user;
      return AuthServices.loginWithGoogle({email, name, id, photo});
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('El inicio de sesión con Google fue cancelado.');
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        console.log('Ya hay una operación de inicio de sesión en curso.');
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(
          'Los servicios de Google Play no están disponibles o no están actualizados.',
        );
      } else {
        console.log('Error al iniciar sesión:', error);
      }
    }
  }

  // Otros métodos relacionados con el inicio de sesión con Google...
}

export default new GoogleAuthService();
