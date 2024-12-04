// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
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
]

export default navigation
