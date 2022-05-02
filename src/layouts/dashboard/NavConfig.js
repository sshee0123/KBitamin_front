// component
import Iconify from '../../components/Iconify';
import MemberService from '../../service/MemberService';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// eslint-disable-next-line import/no-mutable-exports
let navConfig = null;

console.log('Nav Rendering !')

if(!MemberService.getCurrentUser()){
  navConfig = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill'),
    },
    {
      title: 'MediInfo',
      path: '/dashboard/mediInfo',
      icon: getIcon('eva:alert-triangle-fill'),
    },
    {
      title: 'user',
      path: '/dashboard/user',
      icon: getIcon('eva:people-fill'),
    },
    {
      title: 'product',
      path: '/dashboard/products',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: getIcon('eva:file-text-fill'),
    },
    {
      title: 'login',
      path: '/login',
      icon: getIcon('eva:lock-fill'),
    },
    {
      title: 'register',
      path: '/register',
      icon: getIcon('eva:person-add-fill'),
    },
    {
      title: 'Calendar(Not found)',
      path: '/404',
      icon: getIcon('eva:alert-triangle-fill'),
    },
    {
      title: 'Calendar',
      path: '/dashboard/calendar',
      icon: getIcon('eva:alert-triangle-fill'),
    }
  ];
}

if(MemberService.getCurrentUser()){
  navConfig = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill'),
    },
    {
      title: 'MediInfo',
      path: '/dashboard/mediInfo',
      icon: getIcon('eva:alert-triangle-fill'),
    },
    {
      title: 'user',
      path: '/dashboard/user',
      icon: getIcon('eva:people-fill'),
    },
    {
      title: 'product',
      path: '/dashboard/products',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: getIcon('eva:file-text-fill'),
    },
    {
      title: 'Not found',
      path: '/404',
      icon: getIcon('eva:alert-triangle-fill'),
    },
    {
      title: 'Calendar',
      path: '/dashboard/calendar',
      icon: getIcon('eva:alert-triangle-fill'),
    }
  ];
}



export default navConfig;
