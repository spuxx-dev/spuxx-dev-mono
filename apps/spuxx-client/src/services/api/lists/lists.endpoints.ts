import type { AppConfig } from '@/config/app.config';
import { Config } from '@spuxx/browser-utils';
import { defineEndpoint } from '@spuxx/js-utils';
import { Api } from '../api.service';
import type {
  List,
  ListInviteLink,
  ListItem,
  NewList,
  NewListItem,
  UpdatedList,
} from './lists.types';

export const listsEndpoints = {
  findManyLists: defineEndpoint({
    function: async ({ signal }): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists`, {
        ...Api.requestOptions,
        signal,
      });
    },
    transformer: async (response): Promise<List[] | undefined> => {
      const json = await response.json();
      const lists: List[] = [...json];
      return lists;
    },
  }),
  findListById: defineEndpoint<{ id: string }>({
    function: async ({ args, signal }): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${args.id}?include=items`, {
        ...Api.requestOptions,
        signal,
      });
    },
    transformer: async (response): Promise<List> => {
      const json = await response.json();
      const list: List = { ...json };
      return list;
    },
  }),
  createList: defineEndpoint<{ list: NewList }>({
    function: async ({ args, signal }): Promise<Response> => {
      const body = JSON.stringify(args.list);
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists`, {
        ...Api.requestOptions,
        method: 'POST',
        body,
        signal,
      });
    },
    transformer: async (response): Promise<List> => {
      const json = await response.json();
      const list: List = { ...json };
      return list;
    },
  }),
  updateList: defineEndpoint<{ list: UpdatedList }>({
    function: async ({ args, signal }): Promise<Response> => {
      const body = JSON.stringify(args.list);
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${args.list.id}?include=items`, {
        ...Api.requestOptions,
        method: 'PATCH',
        body,
        signal,
      });
    },
    transformer: async (response): Promise<List> => {
      const json = await response.json();
      const list: List = { ...json };
      return list;
    },
  }),
  deleteList: defineEndpoint<{ id: string }>({
    function: async ({ args, signal }): Promise<void> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      await fetch(`${API_URL}/toledo/lists/${args.id}`, {
        ...Api.requestOptions,
        method: 'DELETE',
        signal,
      });
    },
  }),
  generateListInvite: defineEndpoint<{ id: string }>({
    function: async ({ args, signal }): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${args.id}/generate-invite`, {
        ...Api.requestOptions,
        method: 'POST',
        signal,
      });
    },
    transformer: async (response): Promise<ListInviteLink> => {
      const json = await response.json();
      const inviteLink: ListInviteLink = { ...json };
      return inviteLink;
    },
  }),
  acceptListInvite: defineEndpoint<{ id: string; code: string }>({
    function: async ({ args, signal }): Promise<Response> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(
        `${API_URL}/toledo/lists/${args.id}/accept-invite?code=${args.code}`,
        {
          ...Api.requestOptions,
          method: 'PUT',
          signal,
        }
      );
    },
  }),
  createListItem: defineEndpoint<{ listId: string; item: NewListItem }>({
    function: async ({ args, signal }): Promise<Response> => {
      const body = JSON.stringify(args.item);
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(`${API_URL}/toledo/lists/${args.listId}/items`, {
        ...Api.requestOptions,
        method: 'POST',
        body,
        signal,
      });
    },
    transformer: async (response): Promise<ListItem> => {
      const json = await response.json();
      const list: ListItem = { ...json };
      return list;
    },
  }),
  updateListItem: defineEndpoint<{ item: ListItem }>({
    function: async ({ args, signal }): Promise<Response> => {
      const body = JSON.stringify(args.item);
      const { API_URL } = Config.getConfig<AppConfig>();
      return fetch(
        `${API_URL}/toledo/lists/${args.item.listId}/items/${args.item.id}`,
        {
          ...Api.requestOptions,
          method: 'PATCH',
          body,
          signal,
        }
      );
    },
    transformer: async (response): Promise<ListItem> => {
      const json = await response.json();
      const list: ListItem = { ...json };
      return list;
    },
  }),
  deleteListItem: defineEndpoint<{ listId: string; itemId: string }>({
    function: async ({ args, signal }): Promise<void> => {
      const { API_URL } = Config.getConfig<AppConfig>();
      await fetch(
        `${API_URL}/toledo/lists/${args.listId}/items/${args.itemId}`,
        {
          ...Api.requestOptions,
          method: 'DELETE',
          signal,
        }
      );
    },
  }),
};
