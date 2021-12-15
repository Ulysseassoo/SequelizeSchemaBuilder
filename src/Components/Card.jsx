import React from "react"
import { HiOutlineDatabase } from "react-icons/hi"
import { useNavigate } from "react-router"
import styled from "styled-components"

const Card = ({ title = "New", id }) => {
	let navigate = useNavigate()
	return (
		<Container onClick={() => navigate(`models/${id}`)}>
			<Content>
				<HiOutlineDatabase />
				<Title>{title}</Title>
			</Content>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 75px;
	padding: 0.5rem;
	margin-top: 0.4rem;
`
const Content = styled.div`
	box-shadow: ${({ theme }) => theme.borders} 0px 4px 12px;
	padding: 1rem;
	border-radius: 0.5rem;
	display: flex;
	gap: 1rem;
	align-items: center;
	outline: transparent;
	transition: 0.1s ease-in;
	cursor: pointer;
	& > svg {
		font-size: 1.4rem;
		color: ${({ theme }) => theme.textsecondary};
	}
	&:hover {
		outline: 1px solid ${({ theme }) => theme.accent};
	}
`
const Title = styled.p``

export default Card
