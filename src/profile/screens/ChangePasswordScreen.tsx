import {StackNavigationProp} from '@react-navigation/stack';
import {Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {ProfileStackParamList} from '../navigator/ProfileNavigator';
import media_bubble_back from '../../assets/images/icons/media_bubble_back.png';
import {t} from 'i18next';
import {Text} from 'react-native';
import {useState} from 'react';
import ChangePasswordInput from '../components/ChangePasswordInput';
import SecondaryButton from '../components/SecondaryButton';
import {useMutation} from '@apollo/client';
import {UPDATE_PASSWORD} from '../../graphql/queries/userQueries';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorComponent from '../../shared/components/ErrorComponent';

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'ProfileDetail'
>;

type UpdatePasswordScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export default function UpdatePasswordScreen({
  navigation,
}: UpdatePasswordScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [
    updatePassword,
    {
      data: dataUpdatedPassword,
      loading: loadingUpdatedPassword,
      error: errorUpdatedPassword,
    },
  ] = useMutation(UPDATE_PASSWORD);

  const isDisabled = () => {
    return (
      currentPassword.length < 6 ||
      newPassword.length < 6 ||
      confirmNewPassword.length < 6 ||
      newPassword !== confirmNewPassword
    );
  };

  if (loadingUpdatedPassword) return <LoadingSpinner />;
  if (errorUpdatedPassword)
    return (
      <ErrorComponent
        errorMessage={t('profile.errorUpdating')}
        onRetry={async () =>
          await updatePassword({
            variables: {
              oldPassword: currentPassword,
              newPassword: newPassword,
            },
          })
        }
      />
    );

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View style={styles.profilePhotoContainer}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.goBack()}>
            <Image source={media_bubble_back} style={{height: 14, width: 8}} />
          </TouchableOpacity>
          <Text style={styles.goBackText}>{t('profile.changePassword')}</Text>
        </View>
        <Text style={styles.introductionText}>
          {t('profile.introChangePassword')}
        </Text>
        <ChangePasswordInput
          value={currentPassword}
          setValue={setCurrentPassword}
          defaultText={t('profile.currentPassword') || 'Current password'}
        />
        <ChangePasswordInput
          value={newPassword}
          setValue={setNewPassword}
          defaultText={t('profile.newPassword') || 'New password'}
        />
        <ChangePasswordInput
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
          defaultText={
            t('profile.confirmedNewPassword') || 'Confirm new password'
          }
        />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <SecondaryButton
          text={t('profile.changePassword')}
          onPress={async () => {
            await updatePassword({
              variables: {
                oldPassword: currentPassword,
                newPassword: newPassword,
              },
            });
            navigation.goBack();
          }}
          style={{marginBottom: useSafeAreaInsets().bottom + 50}}
          disabled={isDisabled()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    elevation: 0,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: 20,
  },
  profilePhotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#032000',
    fontFamily: 'Montserrat',
  },
  introductionText: {
    fontSize: 14,
    color: '#3F713B',
    fontFamily: 'Montserrat',
    paddingVertical: 10,
  },
});
