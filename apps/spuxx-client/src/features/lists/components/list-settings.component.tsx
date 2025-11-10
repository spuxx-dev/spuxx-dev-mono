import { Api } from '@/services/api';
import { List } from '@/services/api/lists/lists.types';
import { intl } from '@spuxx/js-utils';
import { Accordion, Input } from '@spuxx/solid';
import { Accessor, Component, createSignal, mergeProps } from 'solid-js';
import styles from './list-settings.module.css';
import { SelectOption } from '@spuxx/browser-utils';

interface Props {
  list: Accessor<List>;
  onUpdate: (list: List) => void;
}

export const ListSettings: Component<Props> = (props) => {
  const [iconOptions, setIconOptions] = createSignal<SelectOption[]>([]);
  const p = mergeProps<[Partial<Props>, Props]>({}, props);

  const patch = (patch: Partial<List>) => {
    p.onUpdate({ ...p.list(), ...patch });
  };

  const handleIconInput = async (value: string) => {
    if (value.length < 2) return;
    const request = Api.findManyIcons({ args: { query: value } });
    await request.promise;
    const { status, transformedResult } = request;
    if (status === 'success' && transformedResult) {
      // @ts-expect-error TODO Needs to be fixed in jslibs? Type is any
      const options: SelectOption[] = transformedResult.map((icon) => ({
        label: icon,
        value: icon,
      }));
      setIconOptions(options);
    }
  };

  return (
    <Accordion class={styles.accordion}>
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
        <Input
          label={intl('lists.component.settings.icon.label')}
          size="full"
          value={p.list().icon}
          options={iconOptions()}
          onChange={(value) => {
            patch({ icon: value });
          }}
          onInput={handleIconInput}
        />
      </Accordion.Item>
    </Accordion>
  );
};
