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
