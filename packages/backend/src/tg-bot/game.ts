import { kebabCase } from 'lodash';
import { onGameQuery } from './core';

onGameQuery(async ({ queryId: gameId, gameName }) => {
  return {
    url: `${process.env.FRONTEND_DOMAIN}/game/${kebabCase(
      gameName,
    )}?id=${gameId}`,
  };
});
