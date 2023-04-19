import { Icon, iconConstants } from 'components/atoms/icon';
import React from 'react';
import Layout from 'components/layout';
import Image from 'next/image';
import BannerImage from 'public/images/banner.png';
import { BouncingButton, buttonConstants } from '../components/atoms/button';

export default function App() {
    return (
        <Layout>
            <>
                <header className='flex justify-between'>
                    <BouncingButton variant={buttonConstants.variants.ABOUT}>
                        <Icon color='white' size={20} id={iconConstants.ids.QUESTION_MARK} />
                    </BouncingButton>
                    <div className='flex gap-6'>
                        <BouncingButton variant={buttonConstants.variants.TWITTER}>
                            <Icon color='white' size={32} id={iconConstants.ids.TWITTER} />
                        </BouncingButton>
                        <BouncingButton variant={buttonConstants.variants.FACEBOOK}>
                            <Icon color='white' size={22} id={iconConstants.ids.FACEBOOK} />
                        </BouncingButton>
                    </div>
                </header>
                <main className='flex flex-col flex-1 items-center'>
                    <Image
                        className='flex-1 object-contain w-full sm:w-auto'
                        src={BannerImage}
                        alt='banner'
                    />
                    <p className='text-5xl my-6'>Make it squiggly!!!</p>
                    <p className='text-2xl'>
                        A combination of drawing anh guessing. Let&apos;s scribble your idea !
                    </p>
                    <div className='h-24' />
                    <BouncingButton
                        size={buttonConstants.sizes.LG}
                        variant={buttonConstants.variants.PRIMARY}
                    >
                        Let&apos;s draw
                    </BouncingButton>
                </main>
            </>
        </Layout>
    );
}
