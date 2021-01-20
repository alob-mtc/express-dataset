import Joi from 'joi';

export const Schema: { [key: string]: Joi.ObjectSchema<any> } = {
  addEvent: Joi.object({
    id: Joi.number().required(),
    type: Joi.string().required(),
    actor: Joi.object({
      id: Joi.number().required(),
      login: Joi.string().required(),
      avatar_url: Joi.string().required(),
    }).required(),
    repo: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      url: Joi.string().required(),
    }),
    created_at: Joi.string().required(),
  }),
  updateActor: Joi.object({
    id: Joi.number().required(),
    avatar_url: Joi.string().required(),
  }).required(),
};
