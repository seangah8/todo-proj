import { userService } from '../services/user.service.js'
import { login , signup } from '../store/actions/user.actions.js'

const { useState } = React

export function LoginSignup() {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignup, setIsSignUp] = useState(true)
    
    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    function onLogin(credentials) {
        !isSignup ? signup(credentials) : login(credentials)
    }

    return (
        <div className="login-signup">
            <section className='window'>
                <h3>
                    {isSignup ? "Login" : "Signup"} to your account
                </h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    {!isSignup && <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full name"
                        onChange={handleChange}
                        required
                    />}
                    <button>{!isSignup ? 'Signup' : 'Login'}</button>
                </form>

                <div className="switch">
                    <a onClick={() => setIsSignUp(!isSignup)}>
                        {!isSignup ?
                            'Already a member? Login' :
                            'New user? Signup here'
                        }
                    </a >
                </div>
            </section>
            
        </div >
    )
}
