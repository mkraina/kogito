import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';

import ChoiceList from '../../../components/form/ChoiceList/ChoiceList';
import TextInput from '../../../components/form/TextInput/TextInput';
import Button from '../../../components/primitives/Button/Button';
import Text from '../../../components/primitives/Text';
import {EMAIL_REGEX} from '../../../helpers/regexp';
import {useFinishRegistration} from '../../user/useFinishRegistration';
import {useMeQuery} from '../../user/useMeQuery';

type FinishRegistrationForm = {
  onSuccess: () => void;
};

const MaritalStatusChoices = [
  {label: 'Žiji s manželem', value: 1},
  {label: 'Žiji s partnerem', value: 2},
  {label: 'Žiji sama', value: 3},
  {label: 'Vdova', value: 4},
  {label: 'Jiný - prosím doplňte', value: 5},
];

const EducationalAttainment = [
  {label: 'Základní včetně neukončeného', value: 1},
  {label: 'Střední včetně vyučení bez maturity', value: 2},
  {label: 'Střední s maturitou', value: 3},
  {label: 'Vyšší odborné vzdělání ', value: 4},
  {label: 'Vysokoškolské bakalářské', value: 5},
  {label: 'Vysokoškolské magisterské', value: 6},
  {label: 'Vyšší', value: 7},
];

const Population = [
  {label: '1 – 999', value: 1},
  {label: '1 000 - 4 999', value: 2},
  {label: '5 000 - 9 999', value: 3},
  {label: '10 000 - 49 999', value: 4},
  {label: '50 000 - 99 999', value: 5},
  {label: '100 000 a více', value: 6},
];

const ActualState = [
  {label: 'Těhotná', value: 1},
  {label: 'V šestinedělí', value: 2},
  {label: 'Po šestinedělí do 1 roku dítěte', value: 3},
  {label: 'Od porodu uběhl víc jak rok', value: 4},
];

const FinishRegistrationForm: React.FC<FinishRegistrationForm> = ({
  onSuccess,
}) => {
  const {me, updateCacheValue} = useMeQuery();
  const {finishRegistrationMutation} = useFinishRegistration();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: me?.firstName || '',
      lastName: me?.lastName || '',
      email: me?.email || '',
      age: me?.age,
      maritalStatus: me?.maritalStatus,
      maritalStatusDescription: me?.maritalStatusDescription || '',
      numberOfChildren: me?.numberOfChildren,
      educationalAttainment: me?.educationalAttainment,
      population: me?.population,
      actualState: me?.actualState,
    },
  });
  const maritalStatusValue = watch('maritalStatus');

  const onSubmit: Parameters<typeof handleSubmit>[0] = async input => {
    console.log('Submit', input);
    try {
      const result = await finishRegistrationMutation({
        variables: {
          input: {
            ...input,
            firstName: '',
            lastName: '',
          },
        },
      });
      if (result.data?.finishRegistration.viewer) {
        updateCacheValue(result.data.finishRegistration.viewer.me);
      }
      onSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      {/*<Controller*/}
      {/*  control={control}*/}
      {/*  name="firstName"*/}
      {/*  rules={{required: {value: true, message: 'Vyplň prosím své jméno'}}}*/}
      {/*  render={({field: {onChange, onBlur, value}}) => (*/}
      {/*    <TextInput*/}
      {/*      placeholder="Jméno"*/}
      {/*      style={{marginTop: 16}}*/}
      {/*      onBlur={onBlur}*/}
      {/*      onChangeText={(value) => onChange(value)}*/}
      {/*      value={value}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      {/*{errors.firstName && <Text>{errors.firstName.message}</Text>}*/}

      {/*<Controller*/}
      {/*  control={control}*/}
      {/*  name="lastName"*/}
      {/*  rules={{required: {value: true, message: 'Vyplň prosím své příjmení'}}}*/}
      {/*  render={({field: {onChange, onBlur, value}}) => (*/}
      {/*    <TextInput*/}
      {/*      placeholder="Příjmení"*/}
      {/*      style={{marginTop: 16}}*/}
      {/*      onBlur={onBlur}*/}
      {/*      onChangeText={(value) => onChange(value)}*/}
      {/*      value={value}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      {/*{errors.lastName && <Text>{errors.lastName.message}</Text>}*/}

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            autoComplete="email"
            keyboardType="email-address"
            placeholder="E-Mail"
            style={{marginTop: 16}}
            textContentType="emailAddress"
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
          />
        )}
        rules={{
          required: {value: true, message: 'Vyplň prosím svůj e-mail'},
          pattern: {value: EMAIL_REGEX, message: 'E-mail není validní'},
        }}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="age"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            keyboardType="number-pad"
            placeholder="Věk"
            style={{marginTop: 16}}
            value={value?.toString()}
            onBlur={onBlur}
            onChangeText={value =>
              onChange(parseInt(value.replace(/[^0-9]/g, '')))
            }
          />
        )}
        rules={{required: {value: true, message: 'Vyplň prosím svůj věk'}}}
      />
      {errors.age && <Text>{errors.age.message}</Text>}

      <Controller
        control={control}
        name="actualState"
        render={({field: {onChange, value}}) => (
          <ChoiceList
            items={ActualState}
            placeholder={{label: 'Aktuálně jsem', value: 0}}
            value={value}
            onValueChange={onChange}
          />
        )}
        rules={{
          required: {value: true, message: 'Vyplň prosím svůj aktuální stav'},
        }}
      />
      {errors.actualState && <Text>{errors.actualState.message}</Text>}

      <Controller
        control={control}
        name="maritalStatus"
        render={({field: {onChange, value}}) => (
          <ChoiceList
            items={MaritalStatusChoices}
            placeholder={{label: 'Váš rodinný stav', value: 0}}
            value={value}
            onValueChange={value => onChange(value)}
          />
        )}
        rules={{
          required: {value: true, message: 'Vyplň prosím svůj rodinný stav'},
        }}
      />
      {errors.maritalStatus && <Text>{errors.maritalStatus.message}</Text>}

      {maritalStatusValue === 5 && (
        <>
          <Controller
            control={control}
            name="maritalStatusDescription"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Popis Váš rodinný stav zde"
                style={{marginTop: 16}}
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
              />
            )}
          />
          {errors.maritalStatusDescription && (
            <Text>{errors.maritalStatusDescription.message}</Text>
          )}
        </>
      )}

      <Controller
        control={control}
        name="numberOfChildren"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            keyboardType="number-pad"
            placeholder="Počet dětí v domácnosti"
            style={{marginTop: 16}}
            value={value?.toString()}
            onBlur={onBlur}
            onChangeText={value =>
              onChange(parseInt(value.replace(/[^0-9]/g, '')))
            }
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'Vyplň prosím počet dětí v domácnosti',
          },
        }}
      />
      {errors.numberOfChildren && (
        <Text>{errors.numberOfChildren.message}</Text>
      )}

      <Controller
        control={control}
        name="educationalAttainment"
        render={({field: {onChange, value}}) => (
          <ChoiceList
            items={EducationalAttainment}
            placeholder={{label: 'Dosažené vzdělání', value: 0}}
            value={value}
            onValueChange={value => onChange(value)}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'Vyplň prosím své dosažené vzdělání',
          },
        }}
      />
      {errors.educationalAttainment && (
        <Text>{errors.educationalAttainment.message}</Text>
      )}

      <Controller
        control={control}
        name="population"
        render={({field: {onChange, value}}) => (
          <ChoiceList
            items={Population}
            placeholder={{label: 'Počet obyvatel v místě bydliště', value: 0}}
            value={value}
            onValueChange={value => onChange(value)}
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'Vyplň počet obyvatel v místě bydliště',
          },
        }}
      />
      {errors.population && <Text>{errors.population.message}</Text>}

      <Button
        style={{marginTop: 24}}
        title="Pokračovat"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default FinishRegistrationForm;
