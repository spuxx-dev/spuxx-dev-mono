import { List } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { Accordion, Input } from '@spuxx/solid';
import { Component } from 'solid-js';

interface Props {
  list: List;
}

export const ListSettings: Component<Props> = (props) => {
  // const p = {};

  return (
    <Accordion>
      <Accordion.Item
        title={intl('lists.component.settings.title')}
        icon="mdi:gear"
      >
        <Input
          label={intl('lists.component.settings.name.label')}
          size="full"
          // value={props.list.name}
        />
      </Accordion.Item>
    </Accordion>
  );
};
