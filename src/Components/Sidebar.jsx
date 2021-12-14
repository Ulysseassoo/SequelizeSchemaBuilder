import React from "react"
import styled from "styled-components"
import Category from "./Category"
import { BsPlusSquareFill } from "react-icons/bs"

const Sidebar = () => {
	return (
		<Container>
			<Title>Sequelize Builder</Title>
			<Scroller>
				<Category text="Models" Icon={BsPlusSquareFill} />
				<Category text="">
					<Button>Export</Button>
				</Category>
			</Scroller>
		</Container>
	)
}

const Container = styled.aside`
	position: relative;
	height: 100%;
	width: 350px;
	padding: 0.75rem;
	border-right: ${({ theme }) => `1px solid ${theme.borders}`};
	background-color: ${({ theme }) => theme.primary};
`
const Scroller = styled.div`
	padding-top: 1rem;
	overflow-y: scroll;
	scroll-behavior: scroll;
	scrollbar-width: thin;
	height: 100%;
	width: 100%;
`
const Title = styled.h1`
	font-size: 2rem;
	color: ${({ theme }) => theme.textsecondary};
	font-weight: bold;
`

const Button = styled.button`
	width: 100%;
	padding: 0.25rem;
	border-radius: 0.25rem;
	text-align: center;
	background-color: ${({ theme }) => theme.borders};
	border: none;
	cursor: pointer;
	color: ${({ theme }) => theme.text};
	transition: 0.3s ease-in-out;
	&:hover {
		background-color: ${({ theme }) => theme.text};
		color: ${({ theme }) => theme.borders};
	}
`

export default Sidebar
