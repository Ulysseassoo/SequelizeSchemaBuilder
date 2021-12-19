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
					properties: [],
					required: []
				}
				return {
					...state,
					data: [...state.data, newModel]
				}
			}
			case "add-property": {
				const data = state.data.map((item, i) => (item.id == action.id ? { ...item, properties: [...item.properties, action.data] } : item))

				console.log(data)
				return { ...state, data: data }
			}
			case "update-name": {
				const data = state.data.map((item, i) => (item.id === action.data.id ? { ...item, name: action.data.name } : item))
				return { ...state, data: data }
			}
		}
	}
	const initialState = {
		data: []
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
