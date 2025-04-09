// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Home',
    path: '/home',
    icon: 'mdi:home-outline'
  },

  {
    title: '사용자 LIST',
    path: '/users',
    icon: 'mdi:account-multiple'
  },
  {
    title: '실행게임 LIST',
    path: '/games',
    icon: 'mdi:clipboard-list-outline'
  },
  {
    title: '기존 VR 1-11',

    icon: 'mdi:virtual-reality',
    children: [
      {
        title: '1 부산갈매기',
        path: '/content1'
      },
      {
        title: '2 번갈아느린갈매기',
        path: '/content2'
      },
      {
        title: '3 맞춰봐요 러브하우스',
        path: '/content3'
      },
      {
        title: '4 달라진 러브하우스',
        path: '/content4'
      },
      {
        title: '5 장보기',
        path: '/content5'
      },
      {
        title: '6 팔각정 섞어주스',
        path: '/content6'
      },
      {
        title: '7 은행의 달인',
        path: '/content7'
      },
      {
        title: '8 사과담기',
        path: '/content8'
      },
      {
        title: '9 장단마당',
        path: '/content9'
      },
      {
        title: '10 불꽃놀이',
        path: '/content10'
      },
      {
        title: '11 새똥갈매기',
        path: '/content11'
      }
    ]
  },
  {
    title: '신규 VR 12-20',

    icon: 'mdi:new-box',
    children: [
      {
        title: '12 신나는 뇌 체조',
        path: '/content12'
      },
      {
        title: '13 신궁의 후예',
        path: '/content13'
      },
      {
        title: '14 분리수거 대작전',
        path: '/content14'
      },
      {
        title: '15 즐거운 숫자 놀이',
        path: '/content15'
      },
      {
        title: '16 단어 맞추기',
        path: '/content16'
      },
      {
        title: '17 신나는 전국일주',
        path: '/content17'
      },
      {
        title: '18 틀린것을 찾아라',
        path: '/content18'
      },
      {
        title: '19 흔들어 댄스',
        path: '/content19'
      },
      {
        title: '20 즐거운 바다 여행',
        path: '/content20'
      }
    ]
  }

  // {
  //   path: '/acl',
  //   action: 'read',
  //   subject: 'acl-page',
  //   title: 'Access Control',
  //   icon: 'mdi:shield-outline'
  // }
]

export default navigation
