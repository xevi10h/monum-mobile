import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

interface ProfilePhotoComponentProps {
  url: string | undefined;
  username: string;
  setNewPhoto: (photo: string) => void;
}
export default function ProfilePhotoComponent({
  url,
  username,
  setNewPhoto,
}: ProfilePhotoComponentProps) {
  console.log('url', url);
  const pickImage = async () => {
    const image = (await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      multiple: false,
      includeBase64: true,
    })) as any;
    // Ahora, la imagen en base64 estará en image.data
    if (image.data) {
      const base64Image = `data:${image.mime};base64,${image.data}`;
      setNewPhoto(base64Image);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <View
        style={{
          width: 105,
          height: 105,
          borderRadius: 100,
          borderWidth: 3,
          borderColor: '#3F713B',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {url ? (
          <Image
            source={{uri: url}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: 55,
              alignSelf: 'center',
              color: '#3F713B',
              fontFamily: 'Montserrat',
              fontWeight: '400',
            }}>
            {username.slice(0, 1).toUpperCase()}
          </Text>
        )}
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: -5,
            right: -5,
          }}>
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 30,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 15,
                height: 3,
                backgroundColor: 'white',
                borderRadius: 10,
                top: 7.5,
              }}
            />
            <View
              style={{
                width: 3,
                height: 15,
                backgroundColor: 'white',
                borderRadius: 10,
                top: -1.5,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
