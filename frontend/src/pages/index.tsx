import { memo, VFC } from 'react'

import { HeadTitle } from '../components/atoms/title/HeadTitle'

const Home: VFC = memo(() => {
  return (
    <>
       <HeadTitle title='トップ' />
    </>
  )
})

export default Home