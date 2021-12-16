import React, { createContext, useEffect, useMemo, useReducer } from "react"

export const DataContext = createContext({
	state: {},
	dispath: () => {}
})

export const DataProvider = (props) => {
	const dataReducer = (state, action) => {
		switch (action.type) {
			case "new": {
				const newModel = {
					id: state.data.length,
					name: "New",
					properties: {},
					required: []
				}
				return {
					...state,
					data: [...state.data, newModel]
				}
			}
			case "update-name": {
				const model = state.data.filter((element) => element.id == action.data.id)[0]
				model.name = action.data.name
				state.data[action.data.id] = model
				return {
					...state,
					data: [...state.data]
				}
			}
			case "error": {
				return {
					...state,
					error: action.error
				}
			}
		}
	}
	const initialState = {
		data: [],
		error: null
	}

	const [state, dispatch] = useReducer(dataReducer, initialState)
	const dataMemo = useMemo(
		() => ({
			state,
			dispatch
		}),
		[state]
	)
	// useEffect(() => {
	// 	const token = localStorage.getItem("token")
	// 	if (!token) {
	// 		return
	// 	}
	// 	getOrders(token)
	// 	return () => setIsLoading(true)
	// }, [navigate])
	useEffect(() => {
		console.log(state)
	}, [state])

	return <DataContext.Provider value={dataMemo}>{props.children}</DataContext.Provider>
}

export default DataProvider
