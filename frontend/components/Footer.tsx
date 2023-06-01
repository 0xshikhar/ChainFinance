import styled from 'styled-components';

const Footer = () => {
	return (
		<FooterContainer>
			<p className='text-white text-center '>Built with ❤️ for Chainlink Hackathon 2023</p>
		</FooterContainer>
	);
};

const FooterContainer = styled.div`
	border-top: 1px solid ${({ theme }) => theme.background.secondary};
	background-color: ${({ theme }) => theme.background.primary};
	color: ${({ theme }) => theme.text.primary};
	padding: 1rem 1.5rem;
	font-size: ${({ theme }) => theme.typeScale.smallParagraph};
	align: center;
`;

export default Footer;
