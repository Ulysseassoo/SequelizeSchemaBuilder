import React from "react"
import styled from "styled-components"
import { Section } from "../Theme/global"

const Home = () => {
	return (
		<Section center="center" flex="flex" dir="column">
			<Title>Welcome on Sequelize Builder !</Title>
			<ol>
				<li>Create a model</li>
				<li>Choose its properties</li>
				<li>Export your schema</li>
			</ol>
		</Section>
	)
}

const Title = styled.p`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.textsecondary};
	margin-bottom: 0.5rem;
`

export default Home
