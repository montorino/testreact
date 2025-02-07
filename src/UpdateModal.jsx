import { useEffect } from 'react'
import styles from './styles.module.scss'
const UpdateModal = (
    { open,
        openClose,
        title, setSeminarTitle,
        date, setSeminarDate,
        description, setSeminarDescription,
        time, setSeminarTime,
        photo, setSeminarPhoto,
        updateSeminar
    }) => {


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        updateSeminar(data)
        openClose()
    }

    return (
        <div>
            {open &&
                <div className={`${styles.addWindow}`}>
                    <h6>Update Seminar</h6>
                    <form className={`${styles.addWindowForm}`} onSubmit={handleSubmit}>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Title:</label>
                            <input className={`${styles.formControlInput}`} type="text" name='title' value={title} required onChange={(e) => setSeminarTitle(e.target.value)} />
                        </div>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Description:</label>
                            <textarea className={`${styles.formControlTextarea}`} name='description' value={description} required onChange={(e) => setSeminarDescription(e.target.value)}></textarea>
                        </div>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Date:</label>
                            <input className={`${styles.formControlInput}`} type="date" name='date' value={date} required onChange={(e) => setSeminarDate(e.target.value)} />
                        </div>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Time:</label>
                            <input className={`${styles.formControlInput}`} type="time" name='time' value={time} required onChange={(e) => setSeminarTime(e.target.value)} />
                        </div>
                        <div className={`${styles.formControl}`}>
                            <label className={`${styles.formControlLabel}`}>Photo:</label>
                            <input className={`${styles.formControlInput}`} type="text" name='photo' value={photo} required onChange={(e) => setSeminarPhoto(e.target.value)} />
                        </div>
                        <input className={`${styles.formControlButton}`} type="submit" value="Update Seminar" />
                    </form>
                    <div className={`${styles.closeModal}`} onClick={openClose}>Close</div>
                </div>}
        </div>
    )
}

export default UpdateModal
