import { Icon, iconConstants } from 'components/atoms/icon';
import { Modal } from 'components/atoms/modal';
import Layout from 'components/layout';
import { InfoModal } from 'components/modals';
import useToggle from 'hooks/useToggle';
import Image from 'next/image';
import BannerImage from 'public/svgs/banner.svg';
import { BouncingButton, buttonConstants } from '../components/atoms/button';
import React from 'react';
import { Canvas } from 'components/atoms/canvas';

export default function App() {
	const [isInfoModalOpen, toggleIsInfoModalOpen] = useToggle(false);

	const drawBackground = (ctx) => {
		ctx.fillRect(25, 25, 100, 100);
		ctx.clearRect(45, 45, 60, 60);
		ctx.strokeRect(50, 50, 50, 50);
	};

	return (
		<Layout>
			<Canvas draw={drawBackground} fallbackText='background home page' />
			<div className='fixed inset-0 p-[30px] hidden'>
				<header className='flex justify-between'>
					<BouncingButton
						onClick={toggleIsInfoModalOpen}
						variant={buttonConstants.variants.ABOUT}
					>
						<Icon color='white' size={20} id={iconConstants.ids.QUESTION_MARK} />
					</BouncingButton>
					<Modal isOpen={isInfoModalOpen} handleDismiss={toggleIsInfoModalOpen}>
						<InfoModal />
					</Modal>
					<div className='flex gap-6'>
						<a
							href='https://twitter.com/intent/tweet?text=Draw%20and%20guess.%20Check%20it%20out%20!%20https%3A%2F%2Fsquiggly.vercel.app%2F%20'
							target='_blank'
							rel='noopener noreferrer'
						>
							<BouncingButton variant={buttonConstants.variants.TWITTER}>
								<Icon color='white' size={32} id={iconConstants.ids.TWITTER} />
							</BouncingButton>
						</a>
						<a
							href='https://www.facebook.com/sharer.php?u=https://squiggly.vercel.app'
							target='_blank'
							rel='noopener noreferrer'
						>
							<BouncingButton variant={buttonConstants.variants.FACEBOOK}>
								<Icon color='white' size={22} id={iconConstants.ids.FACEBOOK} />
							</BouncingButton>
						</a>
					</div>
				</header>
				<main className='flex flex-col flex-1 items-center'>
					<Image
						className='flex-1 object-contain sm-height:w-[150px] w-[200px] sm:w-auto max-w-[400px]'
						src={BannerImage}
						alt='banner'
					/>
					<p className='text-3xl md-height:text-4xl lg-height:text-5xl my-6'>
						Make it squiggly!!!
					</p>
					<p className='sm-height:text-xl text-2xl'>
						Drawing anh Guessing. Let&apos;s scribble your idea !
					</p>
					<div className='h-24' />
					<BouncingButton
						size={buttonConstants.sizes.LG}
						variant={buttonConstants.variants.PRIMARY}
					>
						Let&apos;s draw
					</BouncingButton>
					<div className='h-8' />
				</main>
			</div>
		</Layout>
	);
}
