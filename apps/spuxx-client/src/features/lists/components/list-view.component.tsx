import { List } from '@/services/api/lists/lists.types';
import { Heading, Icon } from '@spuxx/solid';
import { Component } from 'solid-js';
import { ListItems } from './list-items.component';
import { ListSettings } from './list-settings.component';

interface Props {
  list: List;
}

export const ListView: Component<Props> = (props) => {
  return (
    <>
      <Heading level={2}>
        <Icon icon={props.list.icon} />
        {props.list.name}
      </Heading>
      <ListItems list={props.list} />
      <ListSettings list={props.list} />
    </>
  );
};
