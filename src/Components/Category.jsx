import React from "react"
import styled from "styled-components"

const Category = ({ text, children, Icon }) => {
	return (
		<Container>
			<Separator />
			<Flex>
				{text && <Text>{text}</Text>}
				{Icon && <Icon />}
			</Flex>
			{children}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0.2rem;
`

const Flex = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	& > svg {
		margin-right: 0.5rem;
		transition: 0.1s ease-in;
		color: ${({ theme }) => theme.textsecondary};
		cursor: pointer;
		&:hover {
			color: ${({ theme }) => theme.secondary};
		}
	}
`
const Separator = styled.span`
	display: block;
	height: 1px;
	width: 100%;
	background-color: ${({ theme }) => theme.borders};
`
const Text = styled.p`
	font-size: 1.1rem;
	color: ${({ theme }) => theme.textsecondary};
`

export default Category
