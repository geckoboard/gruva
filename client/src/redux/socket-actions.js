import { createAction } from 'redan';

export default {
  teams: {
    update: createAction('socket:teams:update'),
  },
  goals: {
    create: createAction('socket:goals:create'),
    update: createAction('socket:goals:update'),
    updateOrders: createAction('socket:goals:updateOrders'),
    delete: createAction('socket:goals:delete'),
  },
  stories: {
    create: createAction('socket:stories:create'),
    update: createAction('socket:stories:update'),
    delete: createAction('socket:stories:delete'),
  },
};
