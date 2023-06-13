import React from 'react';
import {StyleSheet} from 'react-native';
import type {PickerSelectProps} from 'react-native-picker-select';
import SelectPicker from 'react-native-picker-select';

import S from './styles';

const pickerSelectStyles = StyleSheet.create({
  placeholder: {
    color: 'grey',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 64,
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 226, 226, 0.52)',
    borderRadius: 32,
    color: 'black',
    paddingRight: 0, // to ensure the text is never behind the icon
  },
});

const ChoiceList: React.FC<PickerSelectProps> = ({...rest}) => {
  return (
    <S.Container>
      <SelectPicker
        {...rest}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        useNativeAndroidPickerStyle={false}
      />
    </S.Container>
  );
};

export default ChoiceList;
