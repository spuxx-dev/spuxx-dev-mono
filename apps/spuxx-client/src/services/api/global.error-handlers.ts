// import router from '@/router';
import { redirect } from '@solidjs/router';
import type { ErrorHandler } from '@spuxx/js-utils';

export const globalErrorHandlers: ErrorHandler[] = [
  {
    statusFilter: (status) => status === 401,
    function: () => {
      // debugger;
      if (!window.location.href.includes('/login')) {
        window.location.replace('/login');
        // throw redirect('/login');
      }
    },
  },
  {
    statusFilter: (status) => status === 403,
    function: () => {
      throw redirect('/forbidden');
    },
  },
];
