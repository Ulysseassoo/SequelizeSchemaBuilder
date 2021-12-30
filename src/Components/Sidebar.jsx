import React, { useContext, useState } from "react"
import styled, { css } from "styled-components"
import Category from "./Category"
import { BsPlusSquareFill } from "react-icons/bs"
import Card from "./Card"
import { DataContext } from "../Provider/DataProvider"
import Modal from "./Modal"

const Sidebar = () => {
	const context = useContext(DataContext)
	const { state } = context
	const [onOpen, setOnOpen] = useState(false)

	const generateSchema = () => {
		let schema = []
		let relations = []
		state.data.forEach((model, index) => {
			index > 0 && schema.push("\n")
			schema.push(`const ${model.name} = sequelize.define('${model.name}', { \n`)
			model.properties.map((property, i) => {
				if (!property.relation) {
					schema.push(`${property.name}: {\n	type: DataTypes.${property.type.toUpperCase()}`)
					property.defaultValue && schema.push(`,\n	defaultValue: ${property.defaultValue}`)
					property.primaryKey && schema.push(`,\n	primaryKey: true`)
					property.null && schema.push(`,\n	allowNull: true`)
					property.autoIncrement && schema.push(`,\n	autoIncrement: true`)
					property.unique && schema.push(`,\n	unique: true`)
					schema.push("\n     }, \n")
				} else {
					switch (property.relation) {
						case "OneToMany":
							relations.push(`\n${model.name}.hasMany(${property.type}) \n${property.type}.belongsTo(${model.name})`)
							break
						case "ManyToOne":
							relations.push(`\n${property.type}.hasMany(${model.name}) \n${model.name}.belongsTo(${property.type})`)
							break
						case "ManyToMany":
							break

						default:
							break
					}
				}
			})
			schema.push("})")
		})
		schema.push(relations)
		console.log(schema)
		return schema.join("")
	}

	return (
		<>
			{onOpen && <Modal exported setOnOpen={setOnOpen} data={generateSchema()} />}
			{onOpen && <Overlay />}
			<Container>
				<Title>Sequelize Builder</Title>
				<Scroller>
					<Category text="Models" Icon={BsPlusSquareFill}>
						{state.data.map((model) => {
							return <Card key={model.id} id={model.id} title={model.name} />
						})}
					</Category>
					<Category text="">
						<Button active={true} onClick={() => setOnOpen(true)}>
							Export
						</Button>
					</Category>
				</Scroller>
			</Container>
		</>
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

const Container = styled.aside`
	position: relative;
	height: 100%;
	width: 450px;
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
	${({ active }) =>
		active &&
		css`
			background-color: ${({ theme }) => theme.accent};
			color: ${({ theme }) => "white"};
			&:hover {
				background-color: ${({ theme }) => theme.accentHover};
			}
		`}
`

export default Sidebar
