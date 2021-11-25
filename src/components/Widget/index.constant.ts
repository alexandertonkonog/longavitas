export enum SiteAdresses {
  SITE_MAIN = 'https://longavitas.ru',
  SITE_SECOND = 'https://longavita-ct.ru',
  SITE_DEV = 'http://localhost:3000',
  SITE_TEST = 'https://alexandertonkonog.github.io',
}

export const AvailableUrls: string[] = [
  SiteAdresses.SITE_MAIN,
  SiteAdresses.SITE_SECOND,
  SiteAdresses.SITE_TEST,
];

export enum ClinicIds {
  SITE_MAIN = '058826cf-b50f-11e9-a205-ac1f6b67f28a',
  SITE_SECOND = '9d050044-1007-11ec-a220-ac1f6b67f28a',
}

export const SourceCodes: {[key: string]: number} = {
  [SiteAdresses.SITE_MAIN]:  38,
  [SiteAdresses.SITE_SECOND]:  141,
}

export const Months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const DaysOfWeek = [
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
];