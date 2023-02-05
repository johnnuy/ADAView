import { createRouter, createWebHashHistory } from 'vue-router'
import Wallet from '@/components/pages/Wallet'
import Roadmap from '@/components/pages/Roadmap'
import Support from '@/components/pages/Support'
import Issues from '@/components/pages/Issues'
import WalletDetails from '@/components/wallet/WalletDetails'
import WalletTabs from '@/components/wallet/WalletTabs'
import TransactionDetails from '@/components/wallet/transactions/TransactionDetails'
import StakePoolDetails from '@/components/wallet/stakePools/StakePoolDetails'
import AssetDetails from '@/components/wallet/assets/AssetDetails'
import { useSettings } from '@/composables/useSettings'

const { setNetworkByName } = useSettings()

// TODO lazy load these routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Wallet,
    props: true,
    children: [
      {
        name: 'WalletDetails',
        path: ':network/:address',
        component: WalletDetails,
        props: true,
        children: [
          {
            name: 'WalletHome',
            path: '',
            component: WalletTabs,
            props: true,
            meta: {
              // Adding this here to store the scroll position for when
              // the user returns to the wallet home from one of the subroutes
              scrollPos: {
                top: 0,
                left: 0,
              },
            },
          },
          {
            name: 'TransactionDetails',
            path: 'transactions/:transactionId',
            component: TransactionDetails,
            props: true,
          },
          {
            name: 'StakePoolDetails',
            path: 'stakepools/:poolId',
            component: StakePoolDetails,
            props: true,
          },
          {
            name: 'AssetDetails',
            path: 'asset/:assetId',
            component: AssetDetails,
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    component: Roadmap,
    props: true,
  },
  {
    path: '/support',
    name: 'Support',
    component: Support,
    props: true,
  },
  {
    path: '/issues',
    name: 'Issues',
    component: Issues,
    props: true,
  },
]

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // if the route has a scrollPos saved, use this to determine scroll position
    if (to.meta?.scrollPos) return to.meta?.scrollPos
    // otherwise use the browser's savedPosition, or 0
    else return savedPosition || { top: 0, left: 0 }
  },
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // only bother saving the scroll position for routes with the scrollPos prop
  from.meta?.scrollPos && (from.meta.scrollPos.top = window.scrollY)

  // any route with a :network in it's path will set the global network property
  to.params.network && setNetworkByName(to.params.network)

  // proceed
  next()
})

export default router
