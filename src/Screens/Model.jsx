import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import styled from "styled-components"
import { DataContext } from "../Provider/DataProvider"
import { Section } from "../Theme/global"
import { FiEdit3 } from "react-icons/fi"
import Field from "../Components/Field"
import { Fields } from "../Data/Fields"
import Modal from "../Components/Modal"
import { IoCube } from "react-icons/io5"

const Model = () => {
	let params = useParams()
	const { id } = params
	const context = useContext(DataContext)
	const { state, dispatch } = context
	const [editMode, setEditMode] = useState(false)
	const [onOpen, setOnOpen] = useState(false)
	const [onOpenRelation, setOnOpenRelation] = useState(false)
	const [selectedField, setSelectedField] = useState("")
	let navigate = useNavigate()
	useEffect(() => {
		const model = state.data.filter((model) => model.id === parseInt(id))
		if (model.length === 0 || state.data.length === 0) {
			navigate("/")
			return
		}
	}, [id])

	if (state.data.length === 0) {
		return <div />
	}
	const { name, properties } = state.data.filter((model) => model.id === parseInt(id))[0]
	const [newName, setNewName] = useState(name)
	useEffect(() => {
		setNewName(name)
	}, [id])

	const changeName = (input) => {
		setNewName(input.target.value)
	}

	const registerName = (element) => {
		if (element.key === "Enter") {
			dispatch({ type: "update-name", data: { id: parseInt(id), name: newName } })
			setEditMode(false)
		}
	}

	return (
		<Section flex="flex" dir="column">
			{onOpen && <Modal setOnOpen={setOnOpen} field={selectedField} id={id} properties={properties} />}
			{onOpenRelation && <Modal setOnOpen={setOnOpenRelation} field={selectedField} id={id} properties={properties} relation />}
			{onOpen && <Overlay />}
			{onOpenRelation && <Overlay />}
			<Container>
				<Top>
					<Block>
						{editMode === false && newName}
						{editMode && <Name value={newName} autoFocus onChange={(e) => changeName(e)} onKeyDown={(e) => registerName(e)}></Name>}
						<FiEdit3 onClick={() => setEditMode(true)} />
					</Block>
					<Button
						onClick={() => {
							dispatch({ type: "delete-model", id: parseInt(id) })
							navigate("/")
						}}>
						Delete
					</Button>
				</Top>
				<Bottom>
					<Left>
						{properties.map((field) => (
							<Field title={field.name} description={field.type} key={field.name} isAdded data={field} />
						))}
					</Left>
					<Right>
						<Title>Add a new field</Title>
						<FieldContainer>
							{Fields.map((field) => (
								<Field
									Icon={field.Icon}
									title={field.title}
									description={field.description}
									key={field.title}
									setOnOpen={setOnOpen}
									setSelectedField={setSelectedField}
								/>
							))}
							{state.data.map((field) => (
								<Field
									Icon={IoCube}
									title={field.name}
									description="A Model to make a relation with"
									key={field.name}
									data={field}
									setOnOpen={setOnOpenRelation}
									setSelectedField={setSelectedField}
									relation
								/>
							))}
						</FieldContainer>
					</Right>
				</Bottom>
			</Container>
		</Section>
	)
}
const Overlay = styled.div`
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 10;
	position: absolute;
	inset: 0;
`
const Container = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 0.5rem;
`
const Name = styled.input``
const Top = styled.div`
	display: flex;
	width: 100%;
	height: 50px;
	justify-content: space-between;
	font-size: 1.35rem;
	padding-bottom: 1rem;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.borders};
	& svg {
		cursor: pointer;
	}
`
const Block = styled.div`
	display: flex;
	gap: 0.5rem;
	color: ${({ theme }) => theme.textsecondary};
	align-items: center;
`
const Bottom = styled.div`
	display: flex;
	height: calc(100vh - 100px);
	gap: 2rem;
`
const Left = styled.div`
	width: 60%;
	height: 100%;
	gap: 0.75rem;
	display: flex;
	flex-direction: column;
`
const Right = styled.div`
	min-width: 400px;
	height: 100%;
	background-color: ${({ theme }) => theme.borders};
	border-radius: 0.2rem;
	padding: 0.75rem;
	display: flex;
	flex-direction: column;
`
const Title = styled.p`
	font-size: 1.4rem;
	font-weight: bold;
	padding: 1rem;
`
const FieldContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	padding: 1rem;
	gap: 0.75rem;
`
const Button = styled.button`
	border: transparent;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	text-align: center;
	background-color: #ef233c;
	color: white;
	cursor: pointer;
	font-size: 1.1rem;
	transition: 0.2s ease-in;
	&:hover {
		background-color: #d90429;
	}
`
export default Model
