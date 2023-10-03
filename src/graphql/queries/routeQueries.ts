import {gql} from '@apollo/client';

export const GET_CITIES = gql`
  query Cities($textSearch: String) {
    cities(textSearch: $textSearch) {
      id
      translations {
        es_ES
        en_US
        ca_ES
        fr_FR
      }
      imageUrl
    }
  }
`;

export const GET_ROUTES_OF_CITY = gql`
  query Routes($cityId: ID!, $language: String, $textSearch: String) {
    routes(cityId: $cityId, language: $language, textSearch: $textSearch) {
      id
      title
      description
      rating
      stops {
        media {
          id
        }
      }
      cityId
      language
      stopsCount
    }
  }
`;
