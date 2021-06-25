import { memo, VFC } from 'react'

import { HeadTitle } from '../components/atoms/title/HeadTitle'
import { HeaderForGeneralUser } from '../components/templates/HeaderForGeneralUser'

const Home: VFC = memo(() => {
  return (
    <>
       <HeadTitle title='トップ' />
       <HeaderForGeneralUser />
    </>
  )
})

export default Home