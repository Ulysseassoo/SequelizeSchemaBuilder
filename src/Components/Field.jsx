import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { SiDatabricks } from "react-icons/si"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useParams } from "react-router"
import { DataContext } from "../Provider/DataProvider"

const Field = ({ Icon, title, description, setOnOpen, setSelectedField, isAdded, data }) => {
	let params = useParams()
	const { id: modelID } = params
	if (isAdded === true) {
		const { name, primaryKey, required, type, unique, id } = data
		const context = useContext(DataContext)
		const { dispatch } = context
		const deleteField = () => {
			dispatch({ type: "delete-property", property: { id: id }, id: modelID })
		}
		return (
			<Container isAdded>
				<Content isAdded>
					<Left>{data.relation ? <Text isAdded>{data.relation}</Text> : <Text isAdded>{name}</Text>}</Left>
					<RiDeleteBin5Line onClick={() => deleteField()} />
				</Content>
				<Content isAdded>
					<Flex>
						{type && <Button type>{type}</Button>}
						{required && <Button>Required</Button>}
						{unique && <Button>Unique</Button>}
						{primaryKey && <Button>Primary Key</Button>}
					</Flex>
				</Content>
			</Container>
		)
	}

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
	padding: ${({ isAdded }) => (isAdded ? 0 : "1rem")};
	display: flex;
	align-items: center;
	height: ${({ isAdded }) => (isAdded ? "100px" : "75px")};
	width: 100%;
	border-radius: 0.25rem;
	background-color: white;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	gap: ${({ isAdded }) => (isAdded ? 0 : "1rem")};
	outline: transparent;
	transition: 0.2s ease-in-out;
	flex-direction: ${({ isAdded }) => (isAdded ? "column" : "row")};
	cursor: pointer;
	&:hover {
		outline: 1px solid ${({ theme }) => theme.accent};
	}
	& > svg {
		font-size: 1.6rem;
	}
`

const Text = styled.p`
	font-size: ${({ isAdded }) => (isAdded ? "1.3rem" : "1rem")};
	font-weight: ${({ isAdded }) => (isAdded ? "bold" : "")};
	color: ${({ theme }) => theme.textsecondary};
`
const Description = styled.p`
	font-size: 0.9rem;
	font-style: italic;
	color: ${({ theme }) => theme.text};
`
const Button = styled.div`
	padding: 0.4rem 0.8rem;
	font-size: ${({ type }) => (type ? "0.6rem" : "0.5rem")};
	color: ${({ type, theme }) => (type ? theme.text : theme.accent)};
	text-transform: uppercase;
	font-size: 0.75rem;
	text-shadow: 1px 10px 3px rgba(0, 0, 0, 0.02);
	user-select: none;
	border-radius: 0.25rem;
	background-color: ${({ theme }) => theme.primary};
	border: ${({ theme }) => (theme ? `1px solid ${theme.borders}` : none)};
`
const Flex = styled.div`
	display: flex;
	gap: 1rem;
`
const Left = styled.div`
	display: flex;
	gap: 1rem;
`
const Content = styled.div`
	display: flex;
	flex-direction: column;
	${({ isAdded }) =>
		isAdded &&
		css`
			user-select: none;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 0.65rem;
			&:first-child {
				border-bottom: ${({ theme }) => `1px solid ${theme.borders}`};
			}
			& > svg {
				color: #9c0000;
				font-size: 1.3rem;
			}
			& > ${Text} {
				font-size: 1.4rem;
				font-weight: bold;
			}
		`}
`

export default Field
