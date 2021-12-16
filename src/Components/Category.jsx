import React, { useContext } from "react"
import { toast } from "react-toastify"
import styled from "styled-components"
import { DataContext } from "../Provider/DataProvider"

const Category = ({ text, children, Icon }) => {
	const context = useContext(DataContext)
	const { state, dispatch } = context

	const createModel = () => {
		let error = 0
		state.data.map((model) => {
			if (model.name === "New") {
				error++
			}
		})
		if (error === 0) {
			toast.success("Model Created", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			})
			dispatch({ type: "new" })
			return
		}
		return toast.error("A Model called 'New' already exists", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		})
	}
	return (
		<Container>
			<Separator />
			<Flex>
				{text && <Text>{text}</Text>}
				{Icon && <Icon onClick={() => createModel()} />}
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
