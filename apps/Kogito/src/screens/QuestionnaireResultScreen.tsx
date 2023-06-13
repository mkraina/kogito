/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import HTML from 'react-native-render-html';

import RegisterImg from '../assets/register-img.svg';
import MainContainer from '../components/container/MainContainer';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Text from '../components/primitives/Text';
import {useRegistrationStatus} from '../modules/user/useRegistrationStatus';
import type {AppScreen} from '../navigation/Navigation';

import {RegisterImgWrapper} from './RegisterScreen';

const styles = {
  p: {
    marginBottom: 12,
    fontSize: 18,
  },
  li: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    lineHeight: 20,
  },
};

const resultTexts = {
  normal: {
    Va: [
      {
        text: '<p>Výborně! Dle Vašich odpovědí, to vypadá, že aktuálně nejsou úzkosti nebo špatná nálada Vaším nepřítelem. Pokud Však chcete pracovat na svých myšlenkách s Kogito, tak se do toho pusťte 🙂.  Můžete si vybrat, zda se chcete zaměřit na náladu nebo úzkosti a strachy.</p>',
        button: 'OK',
      },
    ],
    Vb: [
      {
        text: '<p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel smutná až depresivní nálada a příznaky s ní spojené. Nebojte, Kogito Vám může pomoci pracovat na Vašich myšlenkách a emocích. Také se naučíme, jak správně relaxovat a poznáte, jak podobnou situaci prožívaly jiné ženy.</p>',
        button: 'Chci začít',
      },
    ],
    Vc: [
      {
        text: '<p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel depresivní nálada a příznaky s ní spojené. Pokud Vy nebo Vaše okolí cítíte, že Vám depresivní příznaky silně ovlivňují Vaše každodenní bytí, doporučujeme vyhledat konzultaci u odborníka ve Vašem okolí. Váš praktický lékař by Vám měl pomoci někoho najít.</p><p>Nebojte, nejste na to teď ale sama.</p>',
        button: 'Pokračovat',
      },
      {
        text: '<p>Již teď můžete začít pracovat s Kogito.  Naučíme se jak pracovat na Vašich myšlenkách a emocích.  Dále budete mít možnost pravidelně relaxovat a také poznáte, jak podobné příznaky prožívaly jiné ženy. Upozorňujeme ale, že Kogito nenahrazuje krizovou pomoc nebo osobní návštěvu odborníků.</p>',
        button: 'Chci začít',
      },
    ],
    Vd: [
      {
        text: '<p>Při vyplňování otázek jste uvedla, že Vás velmi často napadají myšlenky, že si nějak ublížíte. Pokud aktuálně přemýšlíte, že byste si nějak ublížila, či dokonce šáhla na život. Zkuste zavolat na Linku důvěry krizového centra: </p><p style="text-align: center"><strong>284 016 666</strong></p><p>Tam Vám mohou poskytnout telefonickou krizovou intervenci.</p>',
        button: 'CO DĚLAT JINÉHO? ',
      },
      {
        text: '<p>Již teď můžete začít pracovat s Kogito na Vašich myšlenkách a emocích, ale upozorňujeme, že Kogito nenahrazuje krizovou pomoc nebo osobní návštěvu odborníků.</p>',
        button: 'CHCI ZAČÍT',
      },
    ],
    Ve: [
      {
        text: '<p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel úzkost a příznaky s ní spojené. Nebojte, Kogito Vám může pomoci pracovat na Vašich myšlenkách a emocích a jejich tělesných příznacích. Také se naučíme, jak správně relaxovat a poznáte, jak podobnou situaci prožívaly jiné ženy.</p>',
        button: 'Chci začít',
      },
    ],
    Vf: [
      {
        text: '<p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel silná úzkost a příznaky s ní spojené. Pokud Vy nebo Vaše okolí cítíte, že Vám úzkosti silně ovlivňují Vaše každodenní bytí, doporučujeme vyhledat konzultaci u odborníka ve Vašem okolí. Váš praktický lékař by Vám měl pomoci někoho najít.</p><p>Nebojte, nejste na to teď ale sama.</p>',
        button: 'Pokračovat',
      },
      {
        text: '<p>Již teď můžete začít pracovat s Kogito.  Naučíme se jak pracovat na Vašich myšlenkách, emocích a tělesných projevech úzkosti.  Dále budete mít možnost pravidelně relaxovat a také poznáte, jak podobné příznaky prožívaly jiné ženy. Upozorňujeme ale, že Kogito nenahrazuje krizovou pomoc nebo osobní návštěvu odborníků.</p>',
        button: 'Chci začít',
      },
    ],
  },
  control: {
    Va: [
      {
        text: '<p>Byla jste náhodně zařazena do kontrolní skupiny.</p><p>Výborně! Dle Vašich odpovědí, to vypadá, že aktuálně nejsou úzkosti nebo špatná nálada Vaším nepřítelem.</p><p>Prosím nemažte si  Kogito z telefonu. Za měsíc se Vám připomene, tak abyste mohla opět vyplnit dotazníky a začít využívat obsah aplikace.</p>',
        button: 'Ok',
      },
    ],
    Vb: [
      {
        text: '<p>Byla jste náhodně zařazena do kontrolní skupiny.</p> <p>Dle Vašich odpovědí, to vypadá, že aktuálně by Váš hlavní nepřítel mohla být smutná až depresivní nálada a příznaky s ní spojené. V případě potřeby koukněte na web usmevmamy.cz  nebo kontaktujte svého praktického lékaře.</p> <p>Prosím nemažte si Kogito z telefonu. Za měsíc se Vám připomene, tak abyste mohla opět vyplnit dotazníky a začít využívat obsah aplikace.</p>',
        button: '',
      },
    ],
    Vc: [
      {
        text: '<p>Byla jste náhodně zařazena do kontrolní skupiny.</p> <p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel depresivní nálada a příznaky s ní spojené. Pokud Vy nebo Vaše okolí cítíte, že Vám depresivní příznaky silně ovlivňují Vaše každodenní bytí, doporučujeme vyhledat konzultaci u odborníka ve Vašem okolí. Váš praktický lékař by Vám měl pomoci někoho najít.</p> <p>V případě potřeby koukněte na web usmevmamy.cz nebo kontaktujte hlavního řešitele projektu MUDr. Antonína Šebelu, Ph.D. antonin.sebela@nudz.cz</p> <p>Prosím nemažte si  Kogito z telefonu. Za měsíc se Vám připomene, tak abyste mohla opět vyplnit dotazníky a začít využívat obsah aplikace.</p>',
        button: '',
      },
    ],
    Vd: [
      {
        text: '<p>Byla jste náhodně zařazena do kontrolní skupiny.</p> <p>Při vyplňování otázek jste uvedla, že Vás velmi často napadají myšlenky, že si nějak ublížíte. Pokud aktuálně přemýšlíte, že byste si nějak ublížila, či dokonce šáhla na život. Zkuste zavolat na Linku důvěry krizového centra: </p> <p>284 016 666</p> <p>Tam Vám mohou poskytnout telefonickou krizovou intervenci.</p>',
        button: 'OK',
      },
      {
        text: '<p>V případě potřeby koukněte na web usmevmamy.cz nebo kontaktujte hlavního řešitele projektu MUDr. Antonína Šebelu, Ph.D. antonin.sebela@nudz.cz</p><p>Prosím nemažte si  Kogito z telefonu. Za měsíc se Vám připomene, tak abyste mohla opět vyplnit dotazníky a začít využívat obsah aplikace.</p>',
        button: 'OK',
      },
    ],
    Ve: [
      {
        text: '<p>Byla jste náhodně zařazena do kontrolní skupiny.</p> <p>Dle Vašich odpovědí, to vypadá, že aktuálně by Váš hlavní nepřítel mohla být úzkost a příznaky s ní spojené. V případě potřeby koukněte na web usmevmamy.cz  nebo kontaktujte svého praktického lékaře.</p> <p>Prosím nemažte si  Kogito z telefonu. Za měsíc se Vám připomene, tak abyste mohla opět vyplnit dotazníky a začít využívat obsah aplikace.</p>',
        button: '',
      },
    ],
    Vf: [
      {
        text: '<p>Byla jste náhodně zařazena do kontrolní skupiny.</p> <p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel silná úzkost a příznaky s ní spojené. Pokud Vy nebo Vaše okolí cítíte, že Vám úzkosti silně ovlivňují Vaše každodenní bytí, doporučujeme vyhledat konzultaci u odborníka ve Vašem okolí. Váš praktický lékař by Vám měl pomoci někoho najít.</p> <p></p>',
        button: 'OK',
      },
      {
        text: '<p>V případě potřeby koukněte na web usmevmamy.cz nebo kontaktujte hlavního řešitele projektu MUDr. Antonína Šebelu, Ph.D. antonin.sebela@nudz.cz</p><p>Prosím nemažte si  Kogito z telefonu. Za měsíc se Vám připomene, tak abyste mohla opět vyplnit dotazníky a začít využívat obsah aplikace.</p>',
        button: 'OK',
      },
    ],
  },
};

const QuestionnaireResultScreen: AppScreen<'QuestionnaireResultScreen'> = ({
  navigation,
}) => {
  const {status, loading} = useRegistrationStatus();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [status]);

  const handlePress = async () => {
    if (status) {
      if (resultTexts[status.group][status.userLabel].length - 1 > page) {
        setPage(page + 1);
      } else if (status.group === 'normal') {
        navigation.navigate('JourneySwitch');
      }
    }
  };

  if (loading) {
    return <Text>Načítám</Text>;
  }

  const showButton =
    status?.group === 'normal' ||
    (status?.group === 'control' &&
      resultTexts[status.group][status.userLabel].length - 1 !== page);

  return (
    <ColoredSafeAreaView>
      <ScrollView>
        <MainContainer align="left">
          <Text textVariant="header">Vyhodnocení</Text>
          <Text />
          {status && (
            <HTML
              source={{
                html: resultTexts[status.group][status.userLabel][page].text,
              }}
              tagsStyles={styles}
            />
          )}

          {showButton && (
            <Button
              title={resultTexts[status.group][status.userLabel][page].button}
              onPress={handlePress}
            />
          )}
          <RegisterImgWrapper>
            <RegisterImg />
          </RegisterImgWrapper>
        </MainContainer>
      </ScrollView>
    </ColoredSafeAreaView>
  );
};

export default QuestionnaireResultScreen;
