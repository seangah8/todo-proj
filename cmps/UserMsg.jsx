
import { eventBusService } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const messageRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(onCloseMsg, 3000)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (msg && messageRef.current) {
          utilService.animateCSS(messageRef.current, "backInRight")
        }
      }, [msg])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null

    return (
        <section ref={messageRef} className='user-msg' >
            <p>{msg.txt}</p>
        </section>
    )
}
