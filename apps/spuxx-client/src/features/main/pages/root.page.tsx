import { SessionService } from '@/services/session';
import { Component } from 'solid-js';

export const RootPage: Component = () => {
  SessionService.protectRoute();

  return (
    <div>
      <h1>Root Page</h1>
    </div>
  );
};
