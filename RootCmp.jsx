const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

const { Provider } = ReactRedux

import { store } from './store/store.js'
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { TodoIndex } from "./pages/TodoIndex.jsx"
import { TodoDetails } from "./pages/TodoDetails.jsx"
import { TodoEdit } from "./pages/TodoEdit.jsx"
import { UserDetails } from './pages/UserDetails.jsx'
import { Dashboard } from "./pages/Dashboard.jsx"
import { NotFound } from './pages/NotFound.jsx'

export function RootCmp() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/todo/:todoId" element={<TodoDetails />} />
                            <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
                            <Route path="/todo/edit" element={<TodoEdit />} />
                            <Route path="/todo" element={<TodoIndex />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/profile" element={<UserDetails/>}/>
                            <Route path="*" element={<NotFound/>}/>

                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}