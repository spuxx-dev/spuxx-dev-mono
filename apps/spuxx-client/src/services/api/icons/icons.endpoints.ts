import { defineEndpoint } from '@spuxx/js-utils';

export const iconsEndpoints = {
  findManyIcons: defineEndpoint<{ query: string }>({
    function: async ({ args, signal }): Promise<Response> => {
      const response = await fetch(
        `https://api.iconify.design/search?query=mdi:${args.query}`,
        {
          signal,
        }
      );
      return response;
    },
    transformer: async (response: Response): Promise<string[]> => {
      const body: { icons: Record<number, string> } = await response.json();
      return Object.values(body.icons).map(
        (icon: string) => icon.split(':')[1]
      );
    },
  }),
};
