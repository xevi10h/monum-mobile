import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  backgroundColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3F713B', // Color de fondo con transparencia
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen para cubrir todo el fondo
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
  },
  buttonContainer: {
    flex: 6,
    width: '80%',
    height: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    borderRadius: 24,
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF172',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10, // Solo para Android
    marginVertical: 36,
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#032000',
  },
  secondaryButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 24,
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#3F713B',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Solo para Android
  },
  secondaryButtonLogo: {
    position: 'absolute',
    left: 9,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: 'white',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  separatorCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  inputButton: {
    paddingHorizontal: 15,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: 16,
    backgroundColor: '#3F713B',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hidePasswordButton: {
    position: 'absolute',
    backgroundColor: '#3F713B',
    right: 10,
  },
  hidePasswordButtonIcon: {
    width: 20,
    margin: 5,
  },
  forgotPasswordButton: {
    marginRight: 'auto',
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'left',
    backgroundColor: '#3F713B',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    flex: 1,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#3F713B',
  },
  registerButtonText: {
    color: '#FFF172',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#3F713B',
    textDecorationLine: 'underline',
  },
  companyContainer: {
    alignItems: 'center',
    marginTop: 6,
  },
  companyText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 14,
    backgroundColor: '#3F713B',
  },
});
