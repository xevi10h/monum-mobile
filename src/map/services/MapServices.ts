import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import {MarkerProps} from '../components/Marker';
import IPlace from '../domain/IPlace';
import {MarkerResponse} from './MapServicesInterfaces';
import client from '../../graphql/connection';

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
      query Place($placeId: ID!) {
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

  public async getPlaceMedia(placeId: string, language?: string) {
    const GET_PLACE_MEDIA = gql`
      query Medias($placeId: ID!, $language: Language) {
        medias(placeId: $placeId, language: $language) {
          id
          title
          rating
        }
      }
    `;
    try {
      const response = await client.query({
        query: GET_PLACE_MEDIA,
        variables: {placeId, language},
      });
      return response.data?.medias || [];
    } catch (error) {
      console.error('Error trying to get place media:', error);
      return [];
    }
  }
}

export default new MapServices();
