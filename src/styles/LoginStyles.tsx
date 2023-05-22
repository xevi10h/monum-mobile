import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
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
  logo: {
    height: 100,
    marginTop: '30%',
    marginBottom: '5%',
  },
  buttonContainer: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    boxSizing: 'border-box',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 24,
    height: 48,
    width: '100%',
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLogo: {
    position: 'absolute',
    left: 9,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
});
