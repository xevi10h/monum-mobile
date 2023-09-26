import {gql} from '@apollo/client';

export const GET_MARKERS = gql`
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

export const GET_PLACE_INFO = gql`
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
