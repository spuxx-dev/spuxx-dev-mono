import { Api } from '@/services/api';
import { Params, useParams } from '@solidjs/router';
import { HttpRequest, HttpRequestStatus } from '@spuxx/js-utils';
import { Container, Icon } from '@spuxx/solid';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import { ListView } from '../components/list-view.component';
import styles from './list.module.css';
import { listsEndpoints } from '@/services/api/lists/lists.endpoints';

export const ListPage: Component = () => {
  const params = useParams<Params>();

  const [request, setRequest] = createSignal<HttpRequest<
    typeof listsEndpoints.findListById
  > | null>(null);

  createEffect(async () => {
    const request = Api.findListById({ args: { id: params.id } });
    await request.promise;
    setRequest(request);
  });

  if (request()) return null;

  return (
    <Container class={styles.container}>
      <Show
        when={!request() || request()!.status === HttpRequestStatus.pending}
      >
        {/* TODO: Move to Loader component in @spuxx/solid?  */}
        <Icon icon="svg-spinners:ring-resize" class={styles.loader} />
      </Show>
      <Show
        when={
          request()?.status === HttpRequestStatus.success &&
          request()?.transformedResult
        }
      >
        <ListView list={request()!.transformedResult} />
      </Show>
    </Container>
  );
};
