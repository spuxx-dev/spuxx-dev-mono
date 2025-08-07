import { Api } from '@/services/api';
import { List } from '@/services/api/lists/lists.types';
import { Params, useParams } from '@solidjs/router';
import { HttpRequestStatus } from '@spuxx/js-utils';
import { Container, Icon } from '@spuxx/solid';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import { ListView } from '../components/list-view.component';

export const ListPage: Component = () => {
  const params = useParams<Params>();
  const [list, setList] = createSignal<List | null>(null);
  const [status, setStatus] = createSignal<HttpRequestStatus>(
    HttpRequestStatus.pending
  );
  createEffect(async () => {
    setStatus(HttpRequestStatus.pending);
    const request = Api.findListById({ args: { id: params.id } });
    await request.promise;
    setStatus(request.status);
    setList(request.transformedResult);
  });

  createEffect(() => {});

  return (
    <Container class="text-center m-auto w-2xl">
      <Show when={status() === HttpRequestStatus.pending}>
        {/* TODO: Move to Loader component in @spuxx/solid?  */}
        <Icon icon="svg-spinners:ring-resize" class="text-2xl" />
      </Show>
      <Show when={status() === HttpRequestStatus.success && list()}>
        <ListView list={list()!} />
      </Show>
    </Container>
  );
};
