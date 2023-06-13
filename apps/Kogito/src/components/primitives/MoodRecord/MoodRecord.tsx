import React from 'react';

import type {Mood} from '../../../../gql/__generated__/graphql';
import EmoticonHappy from '../../../assets/emotions/happy.png';
import EmoticonOkay from '../../../assets/emotions/okay.png';
import EmoticonSad from '../../../assets/emotions/sad.png';
import EmoticonSatisfied from '../../../assets/emotions/satisfied.png';
import EmoticonVerysad from '../../../assets/emotions/verysad.png';

import S from './styles';

type MoodRecordProps = React.PropsWithChildren & {
  type: Mood;
  onLongPress?: () => void;
};

const MoodRecord: React.FC<MoodRecordProps> = ({
  type,
  onLongPress = () => {},
  children,
}) => {
  return (
    <S.Container type={type} onLongPress={onLongPress}>
      <S.Text>{children}</S.Text>
      {type === 'SATISFIED' && <S.Image source={EmoticonSatisfied} />}
      {type === 'HAPPY' && <S.Image source={EmoticonHappy} />}
      {type === 'OKAY' && <S.Image source={EmoticonOkay} />}
      {type === 'SAD' && <S.Image source={EmoticonSad} />}
      {type === 'VERYSAD' && <S.Image source={EmoticonVerysad} />}
    </S.Container>
  );
};

export default MoodRecord;
