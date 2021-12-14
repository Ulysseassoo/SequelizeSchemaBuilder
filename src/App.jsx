import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router"
import { GlobalStyle } from "./Theme/global"
import Home from "./Screens/Home"
import Model from "./Screens/Model"
import Sidebar from "./Components/Sidebar"
import styled, { ThemeProvider } from "styled-components"
import { lightTheme } from "./Theme/theme"

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<Main>
				<GlobalStyle />
				<Sidebar theme={lightTheme} />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/models/:id" element={<Model />} />
					</Routes>
				</BrowserRouter>
			</Main>
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
