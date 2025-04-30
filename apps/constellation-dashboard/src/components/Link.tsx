import { ButtonLink } from '@spuxx/solid';
import type { Component } from 'solid-js';

interface Props {
  path: string;
  icon: string;
  title: string;
}

export const Link: Component<Props> = (props) => {
  return (
    <ButtonLink
      variant="contained"
      color="primary"
      href={`https://constellation.spuxx.dev${props.path}`}
      icon={props.icon}
    >
      {props.title}
    </ButtonLink>
  );
};
