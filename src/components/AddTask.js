import { useState } from 'react'

const AddTask = ({onAdd}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('please add an algo Question')
            return
        }
        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className = 'add-form' onSubmit={onSubmit}>
        <div className = 'form-control'>
            <label>Algo Question</label>
            <input type='text' placeholder='Add algo question' value={text} onChange={(e) =>setText(e.target.value)} />
        </div>
        <div className = 'form-control'>
            <label>Date</label>
            <input type='text' placeholder='Expected completion date' value={day} onChange={(e)=> setDay(e.target.value)}/>
        </div>
        <div className = 'form-control form-control-check'>
            {/* <label>Set Reminder</label> */}
            {/* <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/> */}
        </div>

        <input type='submit' value='Save Algo' className='btn btn-block'/>
        </form>
    )
}

export default AddTask
