import React from 'react';
import {Controller, useForm} from 'react-hook-form';

import type {EditProfileInput} from '../../../../gql/__generated__/graphql';
import TextInput from '../../../components/form/TextInput';
import Button from '../../../components/primitives/Button';
import {useEditProfile} from '../useEditProfile';
import {useMeQuery} from '../useMeQuery';

type ProfileSettingsForm = {
  onSuccess?: () => void;
};

const ProfileSettingsForm: React.FC<ProfileSettingsForm> = ({
  onSuccess = () => {},
}) => {
  const {me} = useMeQuery();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      firstName: me?.firstName || '',
      lastName: me?.lastName || '',
    },
  });
  const {editProfileMutation} = useEditProfile();

  console.log({me});

  const onSubmit = async (input: EditProfileInput) => {
    try {
      await editProfileMutation({
        variables: {
          input,
        },
      });
      onSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="firstName"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Jméno"
            style={{marginTop: 16, marginBottom: 6}}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
          />
        )}
        rules={{required: true}}
      />
      <Controller
        control={control}
        name="lastName"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Příjmení"
            style={{marginTop: 6, marginBottom: 12}}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
          />
        )}
        rules={{required: true}}
      />
      <Button
        style={{marginBottom: 24}}
        title="Uložit"
        type="medium"
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default ProfileSettingsForm;
