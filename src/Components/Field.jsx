import React from "react"
import styled from "styled-components"

const Field = ({ Icon, title, description, setOnOpen, setSelectedField }) => {
	return (
		<Container
			onClick={() => {
				setOnOpen(true)
				setSelectedField(title)
			}}>
			{Icon && <Icon />}
			<Content>
				<Text>{title}</Text>
				<Description>{description}</Description>
			</Content>
		</Container>
	)
}

const Container = styled.div`
	padding: 1rem;
	display: flex;
	align-items: center;
	height: 75px;
	width: 100%;
	border-radius: 0.25rem;
	background-color: white;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	gap: 1rem;
	outline: transparent;
	transition: 0.2s ease-in-out;
	cursor: pointer;
	&:hover {
		outline: 1px solid ${({ theme }) => theme.accent};
	}
	& > svg {
		font-size: 1.6rem;
	}
`
const Content = styled.div`
	display: flex;
	flex-direction: column;
`
const Text = styled.p`
	font-size: 1rem;
	color: ${({ theme }) => theme.textsecondary};
`
const Description = styled.p`
	font-size: 0.9rem;
	font-style: italic;
	color: ${({ theme }) => theme.text};
`

export default Field
