import { Icon, iconConstants } from 'components/atoms/icon';
import Layout from 'components/layout';
import { InfoModal } from 'components/modals';
import useToggle from 'hooks/useToggle';
import Image from 'next/image';
import BannerImage from 'public/images/banner.png';
import { BouncingButton, buttonConstants } from '../components/atoms/button';
import * as React from 'react';
import { Canvas } from 'components/atoms/canvas';
import useInterval from 'hooks/useInterval';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Modal } from 'components/atoms/modal';
import { random } from 'utils/math';

export default function App({ appDomain }: { appDomain: string }) {
	const [isInfoModalOpen, toggleIsInfoModalOpen] = useToggle(false);

	const drawBackground = React.useCallback((context: CanvasRenderingContext2D) => {
		const innerHeight = window.innerHeight;
		const innerWidth = window.innerWidth;

		for (let i = 0; i < innerWidth - 20; i = i + 27) {
			context.beginPath();
			context.moveTo(i, random(10, 20));
			context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
			context.lineWidth = 1;
			context.lineTo(i, innerHeight - random(10, 20));
			context.stroke();
		}

		for (let i = 0; i < innerHeight; i = i + 27) {
			context.beginPath();
			context.moveTo(random(10, 20), i);
			context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
			context.lineWidth = 1;
			context.lineTo(innerWidth - random(10, 20), i);
			context.stroke();
		}
	}, []);

	console.log({ size: buttonConstants.sizes.LG });

	return (
		<Layout>
			<Canvas draw={drawBackground}> Home background canvas </Canvas>
			<div className='fixed inset-0 p-[30px] flex flex-col overflow-y-auto'>
				<header className='flex justify-between'>
					<BouncingButton
						onClick={toggleIsInfoModalOpen}
						variant={buttonConstants.variants.ABOUT}
						disable={true}
					>
						<Icon color='white' size={20} id={iconConstants.ids.QUESTION_MARK} />
					</BouncingButton>
					<Modal isOpen={isInfoModalOpen} handleDismiss={toggleIsInfoModalOpen}>
						<InfoModal />
					</Modal>
					<div className='flex gap-6'>
						<a
							href={`https://twitter.com/intent/tweet?text=Draw%20and%20guess.%20Check%20it%20out%20!%20${appDomain}%2F%20`}
							target='_blank'
							rel='noopener noreferrer'
						>
							<BouncingButton variant={buttonConstants.variants.TWITTER}>
								<Icon color='white' size={32} id={iconConstants.ids.TWITTER} />
							</BouncingButton>
						</a>
						<a
							href={`https://www.facebook.com/sharer.php?u=${appDomain}`}
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
					<LightBulb />
					<p className='text-3xl md-height:text-5xl my-6'> Make it squiggly!!! </p>
					<p className='sm-height:text-xl text-2xl'>
						Drawing anh Guessing. Let&apos;s scribble your idea!
					</p>
					<div className='h-24' />
					<Link href='/playground'>
						<BouncingButton
							size={buttonConstants.sizes.LG}
							variant={buttonConstants.variants.PRIMARY}
						>
							Let &apos;s draw
						</BouncingButton>
					</Link>
					<div className='h-14' />
				</main>
			</div>
		</Layout>
	);
}

App.propTypes = {
	appDomain: PropTypes.string.isRequired,
};

export async function getStaticProps() {
	const domain = process.env.DOMAIN;

	return {
		props: {
			appDomain: domain,
		},
	};
}

const LightBulb = () => {
	const [lightBulbOpacity, setLightBulbOpacity] = React.useState(1.0);
	const [flickerDelay, setFlickerDelay] = React.useState(200);

	useInterval(() => {
		setLightBulbOpacity((prevState) => 1.5 - prevState);
	}, flickerDelay);

	useInterval(() => {
		setFlickerDelay(random(200, 1000));
	}, 1000);

	return (
		<Image
			style={{ opacity: lightBulbOpacity }}
			className='flex-1 object-contain sm-height:w-[150px] w-[200px] sm:w-[350px]'
			src={BannerImage}
			alt='banner'
			priority={true}
		/>
	);
};
