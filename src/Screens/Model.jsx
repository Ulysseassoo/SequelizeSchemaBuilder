import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import styled from "styled-components"
import { DataContext } from "../Provider/DataProvider"
import { Section } from "../Theme/global"
import { FiEdit3 } from "react-icons/fi"
import { IoIosOptions } from "react-icons/io"
import Field from "../Components/Field"

const Model = () => {
	let params = useParams()
	const { id } = params
	const context = useContext(DataContext)
	const { state, dispatch } = context
	const [editMode, setEditMode] = useState(false)
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
	const { name } = state.data[id]
	const [newName, setNewName] = useState(name)
	useEffect(() => {
		setNewName(name)
	}, [id])

	const changeName = (input) => {
		setNewName(input.target.value)
	}

	const registerName = (element) => {
		if (element.key === "Enter") {
			dispatch({ type: "update-name", data: { id: id, name: newName } })
			setEditMode(false)
		}
	}

	return (
		<Section flex="flex" dir="column">
			<Container>
				<Top>
					<Block>
						{editMode === false && newName}
						{editMode && <Name value={newName} autoFocus onChange={(e) => changeName(e)} onKeyDown={(e) => registerName(e)}></Name>}
						<FiEdit3 onClick={() => setEditMode(true)} />
					</Block>
					<IoIosOptions />
				</Top>
				<Bottom>
					<Left></Left>
					<Right>
						<Title>Add a new field</Title>
						<FieldContainer>
							<Field />
						</FieldContainer>
					</Right>
				</Bottom>
			</Container>
		</Section>
	)
}

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
`
const Left = styled.div`
	width: 60%;
	height: 100%;
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
`
export default Model
