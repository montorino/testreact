import { useEffect } from 'react'
import styles from './styles.module.scss'
const AddModal = ({ open, openClose, addSeminar }) => {


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        addSeminar(data)
        openClose()
    }

    return (
        <div>
            {open &&

                <div className={`${styles.addWindow}`}>
                    <h6>Add Seminar</h6>
                    <form className={`${styles.addWindowForm}`} onSubmit={handleSubmit}>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Title:</label>
                            <input className={`${styles.formControlInput}`} type="text" name='title' required />
                        </div>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Description:</label>
                            <textarea className={`${styles.formControlTextarea}`} name='description' required></textarea>
                        </div>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Date:</label>
                            <input className={`${styles.formControlInput}`} type="date" name='date' required />
                        </div>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Time:</label>
                            <input className={`${styles.formControlInput}`} type="time" name='time' required />
                        </div>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Photo:</label>
                            <input className={`${styles.formControlInput}`} type="text" name='photo' />
                        </div>
                        <input className={`${styles.formControlButton}`} type="submit" value="Add Seminar" />
                    </form>
                    <div className={`${styles.closeModal}`} onClick={openClose}>Close</div>
                </div>}
        </div>
    )
}

export default AddModal
