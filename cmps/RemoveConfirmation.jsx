

export function RemoveConfirmation({ todo, onRemoveTodo, onRemoveConfirmation }){

    return(
        <section className="remove-confirmation">
            {todo? 

                <section>
                    <p>Are you sure you want to remove this todo?</p>
                    <button onClick={() => {
<<<<<<< HEAD
                        onRemoveTodo(todo._id)
=======
<<<<<<< HEAD
                        onRemoveTodo(todo)
=======
                        onRemoveTodo(todo._id)
>>>>>>> 0dfc0722b07f2cabd81f41d2ec5567960059bedb
>>>>>>> 69ee785 (Reinitialize Git and add existing files)
                        onRemoveConfirmation(null)    
                    }}
                    >Yes, Remove</button>
                    <button onClick={() => onRemoveConfirmation(null)}
                        >Cancel</button>
                </section>

                : ''
            }
        </section>
            
    )

}