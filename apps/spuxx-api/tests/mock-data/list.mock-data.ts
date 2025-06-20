import { ListCreateResource } from '@src/toledo/lists/dtos/list.create.resource';

export const listCreateMockData = {
  groceries: {
    name: 'Groceries',
    icon: 'mdi:list-box',
    usesQuantities: true,
    usesCheckboxes: true,
  } as ListCreateResource,
  toDos: {
    name: 'To dos',
    icon: 'mdi:list',
    usesQuantities: false,
    usesCheckboxes: true,
  } as ListCreateResource,
  important: {
    name: 'Important',
    icon: 'mdi:star',
    usesQuantities: false,
    usesCheckboxes: false,
    requiresDeleteConfirmation: true,
  } as ListCreateResource,
};
