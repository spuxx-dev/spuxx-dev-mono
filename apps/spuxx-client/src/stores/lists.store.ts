import { Api } from '@/services/api';
import { List } from '@/services/api/lists/lists.types';
import { HttpRequestStatus } from '@spuxx/js-utils';
import { createStore } from 'solid-js/store';

export function createListsStore() {
  const [store, setStore] = createStore<{
    lists: List[];
    status: HttpRequestStatus;
    error: Error | null;
  }>({
    lists: [],
    status: HttpRequestStatus.pending,
    error: null,
  });

  const fetchLists = async () => {
    const request = Api.findManyLists();
    setStore('status', request.status);
    setStore('error', null);

    try {
      await request.promise;
      setStore('lists', request.transformedResult);
      setStore('status', HttpRequestStatus.success);
    } catch (error) {
      setStore('error', error as Error);
      setStore('status', HttpRequestStatus.error);
      setStore('lists', []);
    }
  };

  return { store, fetchLists };
}
