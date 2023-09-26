import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

interface ProfilePhotoComponentProps {
  url: string | undefined;
  username: string;
}
export default function ProfilePhotoComponent({
  url,
  username,
}: ProfilePhotoComponentProps) {
  const [imageSource, setImageSource] = useState<string | undefined>('');
  console.log(imageSource);

  return (
    <TouchableOpacity>
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
