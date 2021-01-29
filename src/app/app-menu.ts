import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Doenças',
    icon: 'activity-outline',
    link: '/disease',
    home: true,
  },
  {
    title: 'Recomendações',
    icon: 'book-open-outline',
    link: '/recomendation',
  },
  {
    title: 'Importar',
    icon: 'folder-add-outline',
    link: '/import',
  },
  {
    title: 'Configurações',
    icon: 'settings-2-outline',
    link: '/settings',
  },
];
