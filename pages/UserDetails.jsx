import { updateUser } from '../store/actions/user.actions.js'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from '../cmps/LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


const { useSelector } = ReactRedux
const { useState, useEffect } = React



export function UserDetails() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const [userToEdite, setUserToEdite] = useState(user)

    useEffect(() => {
        setUserToEdite(user);
    }, [user])

    async function onSubmitChanges(ev){
        ev.preventDefault()
        const updatedUser = await changeUsername(userToEdite.username)
        changePrefs(userToEdite.prefs, updatedUser)
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

    async function changeUsername(username){
        const usersList = await userService.query()
        const isUsernameExist = usersList.some(userli => { return(
            (userli.username === username) && (user._id !== userli._id))})
        if(isUsernameExist) {showErrorMsg('Username already taken')}
        else{
            const updatedUser = { ...user, username}
            updateUser(updatedUser) 
            return updatedUser
        }

    }

    async function changePrefs(prefs, user) {
        const updatedUser = { ...user, prefs}
        updateUser(updatedUser)       
    }

    if(!user || !userToEdite) return <LoginSignup/>

    const { username, prefs } = userToEdite


    return (
        <section className="user-detalis">

            <button onClick={logout}>Logout</button>
            <h1>Hello {user.username}</h1>
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