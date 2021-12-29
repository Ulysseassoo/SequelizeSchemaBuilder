import React, { useContext, useEffect } from "react"
import styled, { css } from "styled-components"
import { AiOutlineCloseSquare } from "react-icons/ai"
import { useForm } from "react-hook-form"
import { DataContext } from "../Provider/DataProvider"
import { AiOutlineCopy } from "react-icons/ai"
import { toast } from "react-toastify"

const Modal = ({ field, setOnOpen, id, exported, data, properties }) => {
	const context = useContext(DataContext)
	const { dispatch, state } = context
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm()
	const onSubmit = (formData) => {
		console.log(formData)
		const newData = { ...formData, id: properties.length }
		dispatch({ type: "add-property", data: newData, id: id })
		setOnOpen(false)
	}
	useEffect(() => {
		setValue("type", field)
	}, [])
	const copyToClipboard = () => {
		navigator.clipboard.writeText(data)
		toast.success("Copied to Clipboard !", {
			position: "top-right",
			autoClose: 800,
			hideProgressBar: true,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true
		})
	}

	if (exported) {
		return (
			<Container exported>
				<Header>
					<Title>Schema Result</Title>
					<AiOutlineCloseSquare onClick={() => setOnOpen(false)} />
				</Header>
				<Body>
					<Box>
						<pre>
							<code>{data}</code>
						</pre>
					</Box>
				</Body>
				<Margin>
					<Button copy onClick={() => copyToClipboard()}>
						<AiOutlineCopy />
					</Button>
				</Margin>
			</Container>
		)
	}
	return (
		<Container>
			<Header>
				<Title>New field</Title>
				<AiOutlineCloseSquare onClick={() => setOnOpen(false)} />
			</Header>
			<Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="type">Field Type</label>
					<input type="text" placeholder="type" id="type" {...register("type", { disabled: true })} />
					<label htmlFor="name">Name</label>
					<input type="text" placeholder="name" id="name" {...register("name", { required: true })} />
					<label htmlFor="default">Default Value</label>
					<input type="text" placeholder="If there is..." id="default" {...register("defaultValue", {})} />
					<CheckBoxes>
						<Center>
							<label htmlFor="required">Required ?</label>
							<input type="checkbox" id="required" {...register("required", {})} />
						</Center>
						<Center>
							<label htmlFor="null">Null ?</label>
							<input type="checkbox" id="null" {...register("null", {})} />
						</Center>
						<Center>
							<label htmlFor="primary">Primary Key ?</label>
							<input type="checkbox" id="primary" {...register("primaryKey", {})} />
						</Center>
						<Center>
							<label htmlFor="unique">Unique ?</label>
							<input type="checkbox" id="unique" {...register("unique", {})} />
						</Center>
						<Center>
							<label htmlFor="auto">Auto Incrementation ?</label>
							<input type="checkbox" id="auto" {...register("autoIncrement", {})} />
						</Center>
					</CheckBoxes>
					<Button special type="submit">
						Add
					</Button>
				</Form>
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

const Box = styled.div`
	padding: 1rem;
	height: 250px;
	background-color: ${({ theme }) => theme.borders};
	overflow-y: scroll;
	color: ${({ theme }) => theme.secondarytext};
	font-size: 1.1rem;
	font-style: italic;
	letter-spacing: 0.1rem;
	margin: 1rem;
`

const Margin = styled.div`
	margin: 1rem;
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

const Center = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`

const CheckBoxes = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
	margin-top: 1rem;
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
	cursor: pointer;
	border: none;
	color: white;
	margin-top: 0.5rem;
	${({ special }) =>
		special &&
		css`
			background: ${({ theme }) => theme.accent};
		`}
	${({ copy }) =>
		copy &&
		css`
			background: ${({ theme }) => theme.accent};
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.5rem;
			font-size: 1.3rem;
			border-radius: 0.25rem;
			&:hover {
				background: ${({ theme }) => theme.accentHover};
			}
		`}
`

const Form = styled.form`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`

export default Modal
