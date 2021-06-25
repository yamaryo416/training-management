import { memo, VFC } from 'react'

import { HeadTitle } from '../components/atoms/title/HeadTitle'
import { HeaderForGeneralUser } from '../components/templates/HeaderForGeneralUser'
import { UserAuthModal } from '../components/organisms/modal/UserAuthModal'

const Home: VFC = memo(() => {
  return (
    <>
       <HeadTitle title='トップ' />
       <HeaderForGeneralUser />
       <UserAuthModal />
    </>
  )
})

export default Home