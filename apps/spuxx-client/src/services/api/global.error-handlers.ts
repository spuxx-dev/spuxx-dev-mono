// import router from '@/router';
// import { redirect, useLocation } from '@solidjs/router';
import type { ErrorHandler } from '@spuxx/js-utils';

export const globalErrorHandlers: ErrorHandler[] = [
  // {
  //   statusFilter: (status) => status === 401,
  //   function: () => {
  //     if (!useLocation().pathname.includes('login')) throw redirect('/login');
  //   },
  // },
  // {
  //   statusFilter: (status) => status === 403,
  //   function: () => {
  //     throw redirect('/forbidden');
  //   },
  // },
];
