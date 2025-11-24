import type {
  ReactElement,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';

type InputLikeElement =
  | ReactElement<InputHTMLAttributes<HTMLInputElement>>
  | ReactElement<TextareaHTMLAttributes<HTMLTextAreaElement>>
  | ReactElement<SelectHTMLAttributes<HTMLSelectElement>>;

export type FieldControlType = (id: string) => InputLikeElement;
