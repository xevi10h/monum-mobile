import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, User} from '../../redux/store';
import {useMutation, useQuery} from '@apollo/client';
import {removeAuthToken, setUser} from '../../redux/states/user';
import {GET_USER_BY_ID, UPDATE_USER} from '../../graphql/queries/userQueries';
import {t} from 'i18next';
import ProfilePhotoComponent from '../components/ProfilePhoto';
import LanguageSelector from '../components/LanguageSelector';
import NameInput from '../components/NameInput';
import UpdateButton from '../components/UpdateButton';
import LogoutButton from '../components/LogoutButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../auth/navigator/AuthNavigator';

const BOTTOM_TAB_NAVIGATOR_HEIGHT = 56;

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigationToLogin: RegisterScreenNavigationProp;
};

export default function ProfileScreen({navigationToLogin}: Props) {
  console.log(navigationToLogin);
  const dispatch = useDispatch();
  // Acceder al estado global para ver si 'user' ya existe
  const user = useSelector((state: RootState) => state.user);

  const [provisionalUser, setProvisionalUser] = useState<User>(user);

  // Realizar la consulta GraphQL si 'user' no existe
  const {data, loading, error} = useQuery(GET_USER_BY_ID, {
    skip: !!user, // Si 'user' ya existe, omitimos la consulta
  });

  const [
    updateUser,
    {data: dataUpdated, loading: loadingUpdated, error: errorUpdated},
  ] = useMutation(UPDATE_USER, {
    refetchQueries: [{query: GET_USER_BY_ID, variables: {id: user.id}}],
  });

  // Actualizar el usuario si cambia la foto de perfil
  useEffect(() => {
    if (provisionalUser.photo !== user.photo) {
      // Solo ejecuta si la foto es diferente
      updateUser({
        variables: {
          updateUserInput: {
            id: provisionalUser.id,
            photo: provisionalUser.photo,
          },
        },
      });
    }
  }, [provisionalUser.photo]);

  useEffect(() => {
    if (data && data.user) {
      // Guardar el usuario en el estado global si obtenemos data desde GraphQL
      dispatch(setUser(data.user));
      setProvisionalUser(data.user);
      console.log('dataUser', data.user);
    }
  }, [data, dispatch, setProvisionalUser]);

  useEffect(() => {
    if (dataUpdated && dataUpdated.user) {
      // Guardar el usuario en el estado global si obtenemos data desde GraphQL
      dispatch(setUser(dataUpdated.user));
      setProvisionalUser(dataUpdated.user);
      console.log('dataUpdatedUser', dataUpdated.user);
    }
  }, [dataUpdated, dispatch, setProvisionalUser]);

  const handleUpdateUsername = (newUsername: string) => {
    setProvisionalUser(prevUser => ({...prevUser, username: newUsername}));
  };

  const handleUpdateLanguage = (newLanguage: string) => {
    setProvisionalUser(prevUser => ({...prevUser, language: newLanguage}));
  };

  const labelText = (userParam: string) => {
    switch (userParam) {
      case 'username':
        return t('authScreens.username');
      case 'language':
        return t('profile.language');
      default:
        return t('authScreens.username');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorComponent
        errorMessage={t('profile.errorGetting')}
        onRetry={() => useQuery(GET_USER_BY_ID)}
      />
    );

  if (loadingUpdated) return <LoadingSpinner />;
  if (errorUpdated)
    return (
      <ErrorComponent
        errorMessage={t('profile.errorUpdating')}
        onRetry={async () =>
          await updateUser({
            variables: {
              updateUserInput: {
                id: provisionalUser.id,
                username: provisionalUser.username,
                language: provisionalUser.language,
                photo: provisionalUser.photo,
              },
            },
          })
        }
      />
    );

  return (
    <View style={styles.page}>
      <View style={{paddingTop: 100, paddingBottom: 50}}>
        <ProfilePhotoComponent
          url={user.photo}
          username={provisionalUser.username}
          setNewPhoto={photo =>
            setProvisionalUser(prevUser => ({...prevUser, photo}))
          }
        />
      </View>
      <View style={{width: '100%', zIndex: 10}}>
        <NameInput
          labelText={labelText('username')}
          value={provisionalUser.username}
          setValue={handleUpdateUsername}
        />
        <LanguageSelector
          language={provisionalUser.language}
          setLanguage={handleUpdateLanguage}
        />
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 30,
        }}>
        <UpdateButton
          text={t('profile.update')}
          onPress={async () =>
            await updateUser({
              variables: {
                updateUserInput: {
                  id: provisionalUser.id,
                  username: provisionalUser.username,
                  language: provisionalUser.language,
                  photo: provisionalUser.photo,
                },
              },
            })
          }
        />
        <Text
          style={{
            fontSize: 16,
            color: '#3F713B',
            fontFamily: 'Montserrat',
            textAlign: 'center',
          }}>{`${t('profile.createdAt')} ${new Date(
          provisionalUser.createdAt,
        ).toLocaleDateString(
          provisionalUser.language?.replace('_', '-') || 'en-US',
          {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        )}`}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: useSafeAreaInsets().bottom + BOTTOM_TAB_NAVIGATOR_HEIGHT + 50,
          width: '100%',
          paddingHorizontal: 30,
        }}>
        <LogoutButton
          text={t('profile.logout')}
          onPress={() => {
            dispatch(setUser(null));
            dispatch(removeAuthToken());
            navigationToLogin.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    elevation: 0,
    backgroundColor: 'white',
  },
});
