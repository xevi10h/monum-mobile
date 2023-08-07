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
  public async getAllMarkers(): Promise<MarkerResponse[]> {
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
      return response.data.places || [];
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
          imagesUrl
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

  public async getPlaceMedia(placeId: string, lang?: string) {
    const GET_PLACE_MEDIA = gql`
      query MediaOfPlace($placeId: ID!, $lang: Language) {
        mediaOfPlace(placeId: $placeId, lang: $lang) {
          duration
          id
          title
          rating
        }
      }
    `;
    console.log(placeId);
    try {
      const response = await client.query({
        query: GET_PLACE_MEDIA,
        variables: {placeId, lang},
      });
      return response.data?.mediaOfPlace || null;
    } catch (error) {
      console.error('Error trying to get place media:', error);
      return null;
    }
  }
}

export default new MapServices();
