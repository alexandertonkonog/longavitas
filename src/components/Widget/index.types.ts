export type TStep = {
  id: number;
  title: string;
  completed: boolean
}

export type TCalendarItem = {
  name: number;
  free: boolean;
  empty?: boolean;
}

export type TButtonVariant = 'outlined' | 'contained' | 'text';