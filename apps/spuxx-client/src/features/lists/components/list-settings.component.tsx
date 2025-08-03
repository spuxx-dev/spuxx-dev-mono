import { List } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { Container } from '@spuxx/solid';
import { Component } from 'solid-js';

interface Props {
  list: List;
}

export const ListSettings: Component<Props> = (props) => {
  return (
    <Container>
      {intl('lists.component.settings.title')}
      {props.list.name}
    </Container>
  );
};
