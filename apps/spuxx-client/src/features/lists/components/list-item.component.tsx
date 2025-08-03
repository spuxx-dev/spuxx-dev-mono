import { ListItem as Item } from '@/services/api/lists/lists.types';
import { Container } from '@spuxx/solid';
import { Component } from 'solid-js';

interface Props {
  item: Item;
}

export const ListItem: Component<Props> = (props) => {
  return (
    <Container variant="contained" color="surface">
      {props.item.text}
    </Container>
  );
};
