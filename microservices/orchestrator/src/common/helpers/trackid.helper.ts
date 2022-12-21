import { RmqContext } from '@nestjs/microservices';

export const getTrackId = (context: RmqContext) => {
  const {
    properties: { headers },
  } = context.getMessage();
  return headers['trackId'];
};
