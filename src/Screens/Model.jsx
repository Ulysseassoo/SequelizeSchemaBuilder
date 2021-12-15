import React, { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { DataContext } from "../Provider/DataProvider"
import { Section } from "../Theme/global"

const Model = () => {
	let params = useParams()
	const context = useContext(DataContext)
	const { state } = context
	let navigate = useNavigate()
	useEffect(() => {
		const { id } = params
		let error = 0
		state.data.map((model) => {
			if (model.id !== parseInt(id)) {
				error++
			}
		})
		if (error > 0 || state.data.length === 0) {
			navigate("/")
			return
		}
	}, [])

	if (state.data.length === 0) {
		return <div />
	}
	return (
		<Section flex="flex" dir="column">
			Model
		</Section>
	)
}

export default Model
