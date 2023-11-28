import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../redux/store';

const BASE_URL =
  process.env.ENVIRONMENT === 'DEV'
    ? 'http://127.0.0.1:4000'
    : 'https://api.monum.es';

const httpLink = createHttpLink({
  uri: BASE_URL,
});

const authLink = setContext(async (_, {headers}) => {
  // Get the authentication token from AsyncStorage if it exists
  const asyncToken = await AsyncStorage.getItem('authToken');

  // If there is no token in AsyncStorage, try to get it from Redux
  const reduxToken = store.getState().user.token;

  // If there is no token in AsyncStorage or Redux, token will be null.
  const token = asyncToken || reduxToken;

  // Eeturn the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default client;
