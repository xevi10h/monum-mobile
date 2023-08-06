import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import {MarkerProps} from '../components/Marker';
import IPlace from '../domain/IPlace';
import {MarkerResponse} from './MapServicesInterfaces';
const BASE_URL = 'http://127.0.0.1:4000';

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

class MapServices {
  public async getAllMarkers(): Promise<MarkerProps[]> {
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
        return response.data.places.map((place: MarkerResponse) => ({
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
      console.error('Error trying to get markers:', error);
      return [];
    }
  }

  public async getPlaceInfo(placeId: string): Promise<IPlace | null> {
    const GET_PLACE_INFO = gql`
      query Query($placeId: ID!) {
        place(id: $placeId) {
          address {
            city
            coordinates {
              lat
              lng
            }
            country
            postalCode
            province
            street
          }
          description
          id
          importance
          name
          rating
        }
      }
    `;
    try {
      const response = await client.query({
        query: GET_PLACE_INFO,
        variables: {placeId},
      });
      return response.data?.place || null;
    } catch (error) {
      console.error('Error trying to get place info:', error);
      return null;
    }
  }
}

export default new MapServices();
