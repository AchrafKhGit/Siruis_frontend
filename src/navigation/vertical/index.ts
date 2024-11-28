// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Projects',
      path: '/projects',
      icon: 'mdi:folder-outline',
    },
    {
      title: 'Timeline',
      path: '/timeline',
      icon: 'mdi:timeline-clock-outline',
    },    {
      title: "Géstion d'hypothèses",
      path: '/hypothese',
      icon: 'mdi:lightbulb-on-outline',
    },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'mdi:shield-outline',
    // }
  ]
}

export default navigation
