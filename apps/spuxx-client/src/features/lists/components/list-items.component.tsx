import { List } from '@/services/api/lists/lists.types';
import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { ListItem } from './list-item.component';

interface Props {
  list: List;
}

export const ListItems: Component<Props> = (props) => {
  const [checkedAmount, setCheckedAmount] = createSignal<number>(0);
  createEffect(() => {
    const checkedItems = props.list.items?.filter((item) => item.checked) ?? [];
    setCheckedAmount(checkedItems.length);
  });

  return (
    <>
      <For each={props.list.items}>{(item) => <ListItem item={item} />}</For>
      <Show when={checkedAmount() > 0}>{checkedAmount()}</Show>
    </>
  );
};
