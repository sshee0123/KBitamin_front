// component
import Iconify from '../../components/Iconify';
import MemberService from '../../service/MemberService';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// eslint-disable-next-line import/no-mutable-exports
let navConfig = null;

// Login 안 된 메뉴
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
      icon: getIcon('eva:info-fill'),
    },
    {
      title: 'user',
      path: '/dashboard/myMedi',
      icon: getIcon('eva:people-fill'),
    },
    {
      title: 'login',
      path: '/dashboard/login',
      icon: getIcon('eva:lock-fill'),
    },
    {
      title: 'register',
      path: '/dashboard/register',
      icon: getIcon('eva:person-add-fill'),
    },
    {
      title: 'Calendar',
      path: '/dashboard/calendar',
      icon: getIcon('eva:calendar-fill'),
    }
  ];
}

// Login 된 메뉴
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
      icon: getIcon('eva:info-fill'),
    },
    {
      title: 'MyMedi',
      path: '/dashboard/myMedi',
      icon: getIcon('eva:people-fill'),
    },
    {
      title: 'Calendar',
      path: '/dashboard/calendar',
      icon: getIcon('eva:calendar-fill'),
    }
  ];
}

export default navConfig;
