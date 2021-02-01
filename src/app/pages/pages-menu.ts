import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Doenças',
    icon: 'activity-outline',
    link: '/pages/diseases',
    home: true,
  },
  {
    title: 'Recomendações',
    icon: 'book-open-outline',
    link: '/pages/recomendations',
  },
  {
    title: 'Importar',
    icon: 'folder-add-outline',
    link: '/pages/import',
  },
  {
    title: 'Configurações',
    icon: 'settings-2-outline',
    link: '/pages/settings',
  },
  {
    title: 'Logout',
    icon: 'log-out-outline',
    link: '/auth/logout',
  },
];
