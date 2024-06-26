import React, { RefObject, useCallback, useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Counter } from '@components';
import {
  Box,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckIcon,
  EditIcon,
  HStack,
  Icon,
  Pressable,
  Text,
  TrashIcon,
} from '@gluestack-ui/themed';
import { useGroceryList } from '@hooks';
import { EDIT_ITEM_SCREEN_ROUTE } from '@navigation';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '@navigation/RootStackNavigator.types';
import { SWIPEABLE_FRICTION, SWIPEABLE_THRESHOLD } from './ListItem.contants';
import { ListItemProps } from './ListItem.types';

export const ListItem = React.memo((item: ListItemProps) => {
  const swipableRef = useRef<Swipeable>();

  const { navigate } = useNavigation<RootStackNavigationProp>();

  const { editGroceryListItemMutation, deleteGroceryListItemMutation } =
    useGroceryList();

  const onCountChange = (newAmount: number) => {
    editGroceryListItemMutation.mutate({
      ...item,
      amount: newAmount,
    });
  };

  const onChangeCheck = (checked: boolean) => {
    editGroceryListItemMutation.mutate({
      ...item,
      checked,
    });
  };

  const onItemEdit = useCallback(() => {
    navigate(EDIT_ITEM_SCREEN_ROUTE, item);
    swipableRef?.current?.close();
  }, [navigate, item]);

  const onItemDelete = useCallback(() => {
    deleteGroceryListItemMutation.mutate(item.id);
  }, [deleteGroceryListItemMutation, item.id]);

  const removeItemAction = useCallback(
    () => (
      <Pressable
        onPress={onItemDelete}
        w="$12"
        alignItems="center"
        justifyContent="center"
        bg="$error500"
      >
        <Icon color="$white" as={TrashIcon} />
      </Pressable>
    ),
    [onItemDelete],
  );

  const editItemAction = useCallback(
    () => (
      <Pressable
        onPress={onItemEdit}
        alignItems="center"
        justifyContent="center"
        w="$12"
        bg="$primary500"
      >
        <Icon color="$white" as={EditIcon} />
      </Pressable>
    ),
    [onItemEdit],
  );

  return (
    <Swipeable
      ref={swipableRef as RefObject<Swipeable>}
      friction={SWIPEABLE_FRICTION}
      rightThreshold={SWIPEABLE_THRESHOLD}
      leftThreshold={SWIPEABLE_THRESHOLD}
      renderRightActions={removeItemAction}
      renderLeftActions={editItemAction}
    >
      <Box p="$3" backgroundColor="$white">
        <HStack space="md" justifyContent="space-between">
          <Checkbox
            aria-label="checkbox"
            value={`${item.checked}`}
            isChecked={item.checked}
            onChange={onChangeCheck}
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>
          <HStack flex={1} alignItems="center">
            <Text numberOfLines={2} strikeThrough={item.checked}>
              {item.title}
            </Text>
          </HStack>
          <Counter onChange={onCountChange} value={item.amount} />
        </HStack>
      </Box>
    </Swipeable>
  );
});
