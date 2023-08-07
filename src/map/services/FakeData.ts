import IFilter from '../domain/IFilter';
import IPlaceMedia from '../domain/IMedia';
import IPlace from '../domain/IPlace';

export function getPlaceInfo(): IPlace {
  return {
    id: '1',
    name: 'La Sagrada Familia',
    description:
      'La Sagrada Familia es una basílica en Barcelona, España, diseñada por Antoni Gaudí. Es un hito arquitectónico en construcción desde 1882. Sus fachadas y torres esculpidas, junto con su estilo distintivo, la convierten en un símbolo reconocido internacionalmente.',
    rating: 4.3,
    importance: 5,
    address: {
      city: 'Barcelona',
      province: 'Barcelona',
      country: 'Spain',
      street: 'Carrer de Mallorca 401',
      coordinates: {
        lat: 2.1743558,
        lng: 41.4036299,
      },
    },
    imagesUrl: [
      'https://lh3.googleusercontent.com/p/AF1QipP3QmBuE3KmQBWw3DnRhUnvky-IJ53m6FvNwdbB=s680-w680-h510',
    ],
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
