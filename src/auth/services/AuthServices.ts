import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import client from '../../graphql/connection';
import {userSlice} from 'src/redux/states/user';
import {User} from '../../redux/store';

interface LoginGoogle {
  email: string;
  photo: string | null;
  name: string | null;
  id: string;
}

class AuthService {
  async setAuthToken(token: string) {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error al guardar el token de autenticación:', error);
    }
  }

  private async removeAuthToken() {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error al eliminar el token de autenticación:', error);
    }
  }

  public async signup(email: string, password: string): Promise<User | null> {
    const REGISTER_USER = gql`
      mutation RegisterUser($registerInput: RegisterInput!) {
        registerUser(registerInput: $registerInput) {
          id
          email
          username
          createdAt
          googleId
          token
          language
          name
          photo
        }
      }
    `;
    try {
      const response = await client.mutate({
        mutation: REGISTER_USER,
        variables: {registerInput: {email, password, language: 'en-US'}},
      });
      const user = response.data?.registerUser;
      return user;
    } catch (error) {
      console.error('Error al realizar el registro de usuario', error);
      return null;
    }
  }

  public async login(
    emailOrUsername: string,
    password: string,
  ): Promise<User | null> {
    const LOGIN_USER = gql`
      mutation LoginUser($loginInput: LoginInput!) {
        loginUser(loginInput: $loginInput) {
          id
          email
          username
          createdAt
          googleId
          token
          language
          name
          photo
        }
      }
    `;
    try {
      const response = await client.mutate({
        mutation: LOGIN_USER,
        variables: {loginInput: {emailOrUsername, password}},
      });
      const user = response.data?.loginUser;
      return user;
    } catch (error) {
      console.error('Error al realizar el inicio de sesión:', error);
      return null;
    }
  }

  public async loginWithGoogle({
    email,
    photo,
    name,
    id,
  }: LoginGoogle): Promise<User | null> {
    const LOGIN_GOOGLE_USER = gql`
      mutation LoginGoogleUser($loginGoogleInput: LoginGoogleInput!) {
        loginGoogleUser(loginGoogleInput: $loginGoogleInput) {
          id
          email
          username
          createdAt
          googleId
          token
          language
          name
          photo
        }
      }
    `;
    try {
      const response = await client.mutate({
        mutation: LOGIN_GOOGLE_USER,
        variables: {
          loginGoogleInput: {
            email,
            googleId: id,
            name,
            photo,
            language: 'en-US',
          },
        },
      });
      const user = response.data?.loginGoogleUser;
      return user;
    } catch (error) {
      console.error('Error al realizar el inicio de sesión:', error);
      return null;
    }
  }

  public async logout() {
    await this.removeAuthToken();
    // Otros pasos necesarios para el cierre de sesión, como limpiar el estado de la aplicación
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      return !!authToken; // Verifica si existe un token de autenticación
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return false;
    }
  }
}

export default new AuthService();
