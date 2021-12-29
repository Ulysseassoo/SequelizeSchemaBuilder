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
					id: state.counter,
					name: "New",
					properties: [],
					required: []
				}
				return {
					...state,
					data: [...state.data, newModel],
					counter: state.counter + 1
				}
			}
			case "delete-model": {
				const data = state.data.filter((item) => item.id !== action.id)
				return { ...state, data: data }
			}
			case "add-property": {
				const data = state.data.map((item) => (item.id == action.id ? { ...item, properties: [...item.properties, action.data] } : item))

				return { ...state, data: data }
			}
			case "delete-property": {
				const data = state.data.map((item) =>
					item.id == action.id ? { ...item, properties: item.properties.filter((element) => element.id !== action.property.id) } : item
				)
				return { ...state, data: data }
			}
			case "update-name": {
				const data = state.data.map((item) => (item.id === action.data.id ? { ...item, name: action.data.name } : item))
				return { ...state, data: data }
			}
		}
	}
	const initialState = {
		data: [],
		counter: 0
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
