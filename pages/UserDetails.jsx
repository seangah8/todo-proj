import { changeUsername, changePrefs } from '../store/actions/user.actions.js'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from '../cmps/LoginSignup.jsx'

const { useSelector } = ReactRedux
const { useState, useEffect } = React



export function UserDetails() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const todos = useSelector(storeState => storeState.todoModule.todos)

    const [userToEdite, setUserToEdite] = useState(user)

    useEffect(() => {
        setUserToEdite(user);
    }, [user])

    function todosPrecentage(){
        if(todos.length <= 0) return 0
        let doneTodos = 0
        for(let i=0; i < todos.length; i++){
            if(todos[i].isDone) doneTodos ++
        }
        return parseInt((doneTodos/todos.length) * 100)
    }

    async function onSubmitChanges(ev){
        ev.preventDefault()
        await changeUsername(userToEdite.username)
        changePrefs(userToEdite.prefs)
    }

    function handleUsernameChange({ target }){
        setUserToEdite( prevUserToEdite => 
            ({...prevUserToEdite, username: target.value}))
    }

    function handlePrefsChange({ target }){
        const field = target.name
        let value = target.value

        setUserToEdite( prevUserToEdite => ({...prevUserToEdite,
             prefs: {...prevUserToEdite.prefs, [field]: value}}))
    }

    function simplifyTimeToStr(time){
        const now = new Date().getTime()
        const timeSince = {timeUnit: 'seconds',
             number: (now - time) / 1000}
        
        if(timeSince.number > 3600*24*7)
            {timeSince.timeUnit = 'weeks',
            timeSince.number /= 3600*24*7}
     
        else if(timeSince.number > 3600*24)
            {timeSince.timeUnit = 'days',
            timeSince.number /= 3600*24}
              
        else if(timeSince.number > 3600) 
            {timeSince.timeUnit = 'hours',
            timeSince.number /= 3600}

        else if(timeSince.number > 60) 
            {timeSince.timeUnit = 'minutes',
            timeSince.number /= 60}
        
        return {timeUnit: timeSince.timeUnit,
            number: parseInt(timeSince.number)
        }
    }

    if(!user || !userToEdite) return <LoginSignup/>

    const { username, prefs } = userToEdite


    return (
        <section className="user-detalis">

            <button onClick={logout}>Logout</button>
            <h1>Hello {user.username}</h1>
            <p>Todos Progress: {todosPrecentage()}%</p>
            <p>score: {user.balance}</p>

            <form onSubmit={onSubmitChanges}>

                <label htmlFor="username">Username: </label>
                <input 
                type="text" 
                id="username" 
                name="username"
                value={ username }
                onChange={handleUsernameChange}/>

                <label htmlFor="color">Color: </label>
                <input 
                type="color" 
                id="color" 
                name="color"
                value={ prefs.color }
                onChange={handlePrefsChange}/>

                <label htmlFor="bgColor">Background Color: </label>
                <input 
                type="color" 
                id="bgColor" 
                name="bgColor"
                value={ prefs.bgColor }
                onChange={handlePrefsChange}/>

                <button>Submit</button>
            </form>

            <ul>
                {
                    user.activities.map(act => {

                        const timeSince = simplifyTimeToStr(act.at)

                        return <li key={act.at}>
                            <p>{`${act.txt} | 
                            ${timeSince.number} ${timeSince.timeUnit} ago`}</p>
                        </li>
                    })
                }
            </ul>

        </section>                               

    )
}