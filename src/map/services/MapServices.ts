import IPlace from '../domain/IPlace';
import {MarkerResponse} from './MapServicesInterfaces';
import client from '../../graphql/connection';
import {GET_MARKERS, GET_PLACE_INFO} from '../../graphql/queries/placeQueries';
import {GET_PLACE_MEDIA} from '../../graphql/queries/mediaQueries';

class MapServices {
  public async getAllMarkers(): Promise<MarkerResponse[]> {
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
