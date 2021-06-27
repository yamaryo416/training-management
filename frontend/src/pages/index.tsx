import { memo, VFC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { HeadTitle } from '../components/atoms/title/HeadTitle'
import { HeaderForGeneralUser } from '../components/templates/HeaderForGeneralUser'
import { UserAuthModal } from '../components/organisms/modal/UserAuthModal'
import { TopContentsSection } from '../components/templates/TopContentsSection'
import { Footer } from '../components/organisms/layout/Footer'

const Home: VFC = memo(() => {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('token')) {
        router.push('/main')
    }
}, [])

  return (
    <>
       <HeadTitle title='トップ' />
       <HeaderForGeneralUser />
       <UserAuthModal />
       <TopContentsSection />
       <Footer />
    </>
  )
})

export default Home