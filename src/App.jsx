import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router"
import { GlobalStyle } from "./Theme/global"
import Home from "./Screens/Home"
import Model from "./Screens/Model"
import Sidebar from "./Components/Sidebar"
import styled, { ThemeProvider } from "styled-components"
import { lightTheme } from "./Theme/theme"
import DataProvider from "./Provider/DataProvider"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<DataProvider>
				<ToastContainer />
				<Main>
					<GlobalStyle />
					<BrowserRouter>
						<Sidebar theme={lightTheme} />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/models/:id" element={<Model />} />
						</Routes>
					</BrowserRouter>
				</Main>
			</DataProvider>
		</ThemeProvider>
	)
}

const Main = styled.main`
	display: flex;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`

export default App
