import { List } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { Accordion, Input } from '@spuxx/solid';
import { Accessor, Component, mergeProps } from 'solid-js';

interface Props {
  list: Accessor<List>;
  onUpdate: (list: List) => void;
}

export const ListSettings: Component<Props> = (props) => {
  const p = mergeProps<[Partial<Props>, Props]>({}, props);

  const patch = (patch: Partial<List>) => {
    p.onUpdate({ ...p.list(), ...patch });
  };

  return (
    <Accordion>
      <Accordion.Item
        title={intl('lists.component.settings.title')}
        icon="mdi:gear"
      >
        <Input
          label={intl('lists.component.settings.name.label')}
          size="full"
          value={p.list().name}
          onChange={(value) => {
            patch({ name: value });
          }}
        />
      </Accordion.Item>
    </Accordion>
  );
};
