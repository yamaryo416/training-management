import { memo, VFC } from 'react'
import { UserAuthModal } from '../components/organisms/modal/UserAuthModal'
import { HeaderForGeneralUser } from '../components/templates/HeaderForGeneralUser'
import { AboutContentsSection } from '../components/templates/AboutContentsSection'
import { Footer } from '../components/organisms/layout/Footer'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { HeadTitle } from '../components/atoms/title/HeadTitle'

const About: VFC = memo(() => {
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/main')
        }
    }, [])

    return (
        <> 
            <HeadTitle title='トレサポとは' />
            <HeaderForGeneralUser/>
            <UserAuthModal />
            <AboutContentsSection />
            <Footer />
        </>
    )
})

export default About