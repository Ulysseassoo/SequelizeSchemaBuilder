import React, { createContext, useEffect, useReducer } from "react"
import { toast } from "react-toastify"

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

	return <DataContext.Provider value={{ state, dispatch }}>{props.children}</DataContext.Provider>
}

export default DataProvider
