import React, {useCallback, useState} from 'react';
import {Alert, SafeAreaView, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import type {DayPart, Todo} from '../../gql/__generated__/graphql';
import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader';
import BoxAdd from '../components/primitives/BoxAdd';
import BoxCheckbox from '../components/primitives/BoxCheckbox';
import Text from '../components/primitives/Text';
import EditTodoModal from '../modules/diary/modal/EditTodoModal/EditTodoModal';
import {useTodos} from '../modules/diary/useTodos';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

type EditorSettings = {
  dayPart: DayPart;
  id: string | null;
  title: string;
};

type DayPartRender = {
  dayPart: DayPart;
  handleCheck: (id: string, checked: boolean) => void;
  handleLongClick: (id: string) => void;
  setEditor: (settings: EditorSettings) => void;
  title: string;
  todos: Todo[];
};

const DayPartRender: React.FC<DayPartRender> = ({
  title,
  dayPart,
  todos,
  handleCheck,
  handleLongClick,
  setEditor,
}) => {
  return (
    <>
      <Text colorVariant="gray" textVariant="headerSub2">
        {title}
      </Text>
      {todos
        .filter(todo => todo.dayPart === dayPart)
        .map(todo => (
          <BoxCheckbox
            key={todo.id}
            checked={todo.checked}
            title={todo.title}
            onChange={value => handleCheck(todo.id, value)}
            onLongPress={() => handleLongClick(todo.id)}
          />
        ))}
      <BoxAdd onPress={() => setEditor({id: null, title: '', dayPart})} />
    </>
  );
};

const TodosScreen: React.FC = () => {
  const {todos, refetch, saveTodo, trackTodo, removeTodo} = useTodos();
  const [editor, setEditor] = useState<EditorSettings | null>(null);
  const {
    trackTodoScreenOpened,
    trackTodoCreated,
    trackTodoCompleted,
    trackTodoDeleted,
  } = useMixPanelTracking();

  const handleItemSave = async (title: string) => {
    if (editor) {
      await saveTodo({
        id: editor.id,
        dayPart: editor.dayPart,
        title,
      });
      setEditor(null);
      trackTodoCreated();
    }
  };

  const handleItemRemove = () => {
    setEditor(null);
  };

  const handleCheck = async (id: string, checked: boolean) => {
    await trackTodo({
      variables: {
        input: {
          id,
          checked,
        },
      },
    });
    if (checked) {
      trackTodoCompleted();
    }
  };

  const handleLongPress = async (id: string) => {
    Alert.alert('Smazat', 'Doopravdy chcete smazat záznam?', [
      {
        text: 'Ne',
        style: 'cancel',
      },
      {
        text: 'Ano',
        onPress: async () => {
          await removeTodo({
            variables: {
              id,
            },
          });
          trackTodoDeleted();
          refetch();
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      trackTodoScreenOpened();
    }, []),
  );

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer color="white" page="subWithoutFooter">
            <Text add={true} textVariant="bigHeader">
              Plánovač
            </Text>

            <DayPartRender
              dayPart="MORNING"
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
              title="Ráno"
              todos={todos}
            />
            <DayPartRender
              dayPart="AFTERNOON"
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
              title="Odpoledne"
              todos={todos}
            />
            <DayPartRender
              dayPart="EVENING"
              handleCheck={handleCheck}
              handleLongClick={handleLongPress}
              setEditor={setEditor}
              title="Večer"
              todos={todos}
            />

            {editor && (
              <EditTodoModal
                close={() => setEditor(null)}
                initText=""
                remove={handleItemRemove}
                save={handleItemSave}
              />
            )}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default TodosScreen;
