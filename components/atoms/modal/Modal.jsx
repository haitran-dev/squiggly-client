import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { BouncingButton } from '../button';

const Backdrop = styled(Dialog.Overlay)`
	position: fixed;
	inset: 0;
	background-color: hsl(0, 0%, 0%, 0.15);
`;

const Wrapper = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2rem;
`;

const Panel = styled.div`
	position: relative;
	padding: 1rem;
	background-color: hsl(0, 0%, 100%);
`;

const Modal = ({ isOpen, handleDismiss, children }) => {
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as='div' onClose={handleDismiss}>
				<Wrapper>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-200'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Backdrop aria-hidden={true} />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-90'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-90'
					>
						<Panel>
							{children}
							<div className='absolute -top-10 -right-4'>
								<BouncingButton onClick={handleDismiss}>
									&nbsp;X&nbsp;
								</BouncingButton>
							</div>
						</Panel>
					</Transition.Child>
				</Wrapper>
			</Dialog>
		</Transition.Root>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool,
	handleDismiss: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.element,
};

export default Modal;
