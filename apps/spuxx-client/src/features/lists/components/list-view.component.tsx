import { List } from '@/services/api/lists/lists.types';
import { Heading, Icon } from '@spuxx/solid';
import { Component, createSignal, mergeProps } from 'solid-js';
import { ListItems } from './list-items.component';
import { ListSettings } from './list-settings.component';
import { Api } from '@/services/api';
import styles from './list-view.module.css';

interface Props {
  list: List;
}

export const ListView: Component<Props> = (props) => {
  const p = mergeProps<[Partial<Props>, Props]>({}, props);
  const [list, setList] = createSignal<List>(p.list);

  const handleUpdate = (updatedList: List) => {
    setList(updatedList);
    Api.updateList({ args: { list: list() } });
  };

  return (
    <>
      <Heading level={2} class={styles.heading}>
        <Icon icon={list().icon} />
        {list().name}
      </Heading>
      <ListItems list={list()} />
      <ListSettings list={list} onUpdate={handleUpdate} />
    </>
  );
};
