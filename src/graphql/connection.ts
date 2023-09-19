import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://127.0.0.1:4000';

const httpLink = createHttpLink({
  uri: BASE_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // Añade el token de autorización al header, si está disponible
  const token = AsyncStorage.getItem('authToken');
  console.log(token);

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      // Puedes añadir otros headers aquí si es necesario
    },
  });

  return forward(operation);
});

// Aplica el middleware al enlace HTTP
const link = authMiddleware.concat(httpLink);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
