import {MarkerProps} from '../components/Marker';
import {IFilter} from '../domain/IFilter';
import {IPlace} from '../domain/IPlace';
import {IPlaceMedia} from '../domain/IPlaceMedia';

export function getAllMarkers(): MarkerProps[] {
  return [
    {
      id: '1',
      coordinates: [-124.032, 38.7272],
      importance: 5,
    },
    {
      id: '2',
      coordinates: [-125.032, 37.5272],
      importance: 4,
    },
    {
      id: '3',
      coordinates: [-127.032, 38.7272],
      importance: 3,
    },
    {
      id: '4',
      coordinates: [-128.032, 38.9272],
      importance: 2,
    },
    {
      id: '5',
      coordinates: [-123.032, 36.9272],
      importance: 1,
    },
  ];
}

export function getPlaceInformation(): IPlace {
  return {
    id: '1',
    name: 'La Sagrada Familia',
    rating: 4.3,
    importance: 5,
    address: {
      city: 'Barcelona',
      province: 'Barcelona',
      country: 'Spain',
      street: 'Carrer de Mallorca 401',
    },
    coordinates: [41.4036299, 2.1743558],
    imageUrl:
      'https://lh3.googleusercontent.com/p/AF1QipP3QmBuE3KmQBWw3DnRhUnvky-IJ53m6FvNwdbB=s680-w680-h510',
  };
}

export function getPlaceMedia(): IPlaceMedia[] {
  return [
    {
      id: '1',
      duration: 200,
      title: 'Historia de la sagrada família',
      rating: 4.65,
    },
    {
      id: '1',
      duration: 200,
      title: 'Historia de la sagrada família',
      rating: 4.65,
    },
    {
      id: '1',
      duration: 200,
      title: 'Historia de la sagrada família',
      rating: 4.65,
    },
    {
      id: '1',
      duration: 200,
      title: 'Historia de la sagrada família',
      rating: 4.65,
    },
    {
      id: '1',
      duration: 200,
      title: 'Historia de la sagrada família',
      rating: 4.65,
    },
    {
      id: '1',
      duration: 200,
      title: 'Historia de la sagrada família',
      rating: 4.65,
    },
    {
      id: '1',
      duration: 200,
      title: 'Historia de la sagrada família',
      rating: 4.65,
    },
  ];
}

export function getAllFilters(): IFilter[] {
  return [
    {id: '1', order: 1, label: 'Cultura', active: false},
    {id: '3', order: 2, label: 'Entreteniment', active: false},
    {id: '4', order: 3, label: 'Art', active: false},
    {id: '5', order: 4, label: 'Historia', active: false},
    {id: '6', order: 5, label: 'Natura', active: false},
    {id: '2', order: 6, label: 'Restaurants', active: false},
  ];
}