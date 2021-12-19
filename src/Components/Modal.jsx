import React, { useContext, useEffect } from "react"
import styled, { css } from "styled-components"
import { AiOutlineCloseSquare } from "react-icons/ai"
import { useForm } from "react-hook-form"
import { DataContext } from "../Provider/DataProvider"

const Modal = ({ field, setOnOpen, id }) => {
	const context = useContext(DataContext)
	const { dispatch } = context
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm()
	const onSubmit = (data) => {
		console.log(data)
		dispatch({ type: "add-property", data: data, id: id })
	}
	useEffect(() => {
		setValue("type", field)
	}, [])
	return (
		<Container>
			<Header>
				<Title>New field</Title>
				<AiOutlineCloseSquare onClick={() => setOnOpen(false)} />
			</Header>
			<Body>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="text" placeholder="type" disabled={true} {...register("type", {})} />
					<input type="text" placeholder="name" {...register("name", {})} />
					<input type="text" placeholder="default value" {...register("default value", {})} />
					<input type="checkbox" {...register("required", {})} />
					<input type="checkbox" {...register("null", {})} />
					<input type="checkbox" {...register("primary key", {})} />
					<input type="checkbox" {...register("unique", {})} />
					<Button special type="submit">
						Add
					</Button>
				</form>
			</Body>
		</Container>
	)
}

const Container = styled.div`
	width: 600px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: auto;
	height: auto;
	background: ${({ theme }) => theme.primary};
	z-index: 99;
	border-radius: 0.25rem;
`

const Header = styled.div`
	padding: 1rem;
	border-bottom: 1px solid ${({ theme }) => theme.borders};
	display: flex;
	align-items: center;
	justify-content: space-between;
	& > svg {
		font-size: 1.5rem;
		color: ${({ theme }) => theme.secondarytext};
		transition: 0.3s ease;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
`

const Title = styled.p`
	font-size: 1.1rem;
	color: ${({ theme }) => theme.secondarytext};
`

const Body = styled.div`
	display: flex;
	flex-direction: column;
`

const Button = styled.button`
	width: 100%;
	background: ${({ theme }) => theme.secondary};
	transition: 0.2s ease-in-out;
	${({ special }) =>
		special &&
		css`
			background: ${({ theme }) => theme.accent};
		`}
`

export default Modal
