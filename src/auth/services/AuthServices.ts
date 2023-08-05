import AsyncStorage from '@react-native-async-storage/async-storage';

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

  public async signup(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch('http://127.0.0.1:8080/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      if (response.ok) {
        const data = await response.json();
        const authToken = data.token;
        console.log('authtoken', authToken);
        await this.setAuthToken(authToken);
        return true;
      } else {
        const data = await response.json();
        console.error('El usuario no pudo registrarse', data);
        return false;
      }
    } catch (error) {
      console.error('Error al realizar el registro:', error);
      return false;
    }
  }

  public async login(
    emailOrUsername: string,
    password: string,
  ): Promise<boolean> {
    try {
      const response = await fetch('http://127.0.0.1:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({emailOrUsername, password}),
      });
      if (response.ok) {
        const data = await response.json();
        const authToken = data.token;
        await this.setAuthToken(authToken);
        return true;
      } else {
        const data = await response.json();
        console.error('No se pudo iniciar sesión:', data);
        return false;
      }
    } catch (error) {
      console.error('Error al realizar el inicio de sesión:', error);
      return false;
    }
  }

  public async loginWithGoogle({
    email,
    photo,
    name,
    id,
  }: LoginGoogle): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:8080/users/loginGoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, photo, name, id}),
      });
      console.log('response', response);
      if (response.ok) {
        const data = await response.json();
        const authToken = data.token;
        await this.setAuthToken(authToken);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al realizar el inicio de sesión:', error);
      return false;
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
