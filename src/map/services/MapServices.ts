import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import {MarkerProps} from '../components/Marker';
import IPlace from '../domain/IPlace';
const BASE_URL = 'http://127.0.0.1:4000';

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

class MapServices {
  public async getAllMarkersMap(): Promise<MarkerProps[]> {
    interface marker {
      id: string;
      address: {
        coordinates: {
          lat: number;
          lng: number;
        };
      };
      importance: number;
    }
    const GET_MARKERS = gql`
      query Places {
        places {
          id
          address {
            coordinates {
              lat
              lng
            }
          }
          importance
        }
      }
    `;
    try {
      const response = await client.query({
        query: GET_MARKERS,
      });
      if (response.data && Array.isArray(response.data.places)) {
        return response.data.places.map((place: marker) => ({
          id: place.id,
          coordinates: [
            place.address.coordinates.lng,
            place.address.coordinates.lat,
          ],
          importance: place.importance,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error al realizar el registro:', error);
      return [];
    }
  }
}

export default new MapServices();
