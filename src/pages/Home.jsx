import React from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
    return (
        <div className='relative'>
            <Hero />
            <div className='container mx-auto'>
                <LatestCollections />
                <OurPolicy />
                <NewsLetter />
            </div>
        </div>
    )
}

export default Home