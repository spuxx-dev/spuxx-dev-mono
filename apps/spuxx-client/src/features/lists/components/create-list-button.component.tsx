import { Api } from '@/services/api';
import { NewList } from '@/services/api/lists/lists.types';
import { useNavigate } from '@solidjs/router';
import { intl } from '@spuxx/js-utils';
import { Button, Layout } from '@spuxx/solid';
import { Component, createSignal } from 'solid-js';

export const CreateListButton: Component = () => {
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const list: NewList = {
      name: intl('lists.component.create-list-button.new-list-name'),
    };
    setLoading(true);
    const request = Api.createList({ args: { list } });
    const { id } = await request.promise;
    setLoading(false);
    navigate(`/lists/${id}`);
    Layout.closeSidebarOnMobile();
  };

  return (
    <Button
      variant="colored"
      color="text-default"
      onClick={handleClick}
      icon="mdi:plus"
      loading={loading()}
    >
      {intl('lists.component.create-list-button.title')}
    </Button>
  );
};
