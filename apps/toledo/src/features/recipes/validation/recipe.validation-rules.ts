import { Validator } from '@/services/validator/validator.service';

export const recipeValidationRules = {
  name: [
    (v: string) => Validator.required(v),
    (v: string) => Validator.minLength(v, 3),
    (v: string) => Validator.maxLength(v, 30),
  ],
  icon: [
    (v: string) => Validator.required(v),
    (v: string) => Validator.minLength(v, 3),
    (v: string) => Validator.maxLength(v, 30),
  ],
  text: [(v: string) => Validator.maxLength(v, 1023)],
  url: [(v: string) => Validator.maxLength(v, 100)],
};
