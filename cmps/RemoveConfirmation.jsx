

export function RemoveConfirmation({ todo, onRemoveTodo, onRemoveConfirmation }){

    return(
        <section className="remove-confirmation">
            {todo? 
                <section>
                    <p>Are you sure you want to remove this todo?</p>
                    <button onClick={() => {
                        onRemoveTodo(todo)
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