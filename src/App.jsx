import { useEffect, useState } from 'react'
import './App.css'
import apiRequest from './apiRequest'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'
import LineItem from './LineItem'

function App() {

  //Устанавливаем ссылку на API

  const API_URL = 'http://localhost:3500/seminars'


  // Задаем начальное состояние
  const [seminars, setSeminars] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddWindowOpen, setIsAddWindowOpen] = useState(false)
  const [isUpdateWindowOpen, setIsUpdateWindowOpen] = useState(false)
  const [seminarID, setSeminarID] = useState(1)
  const [seminarTitle, setSeminarTitle] = useState('')
  const [seminarDescription, setSeminarDescription] = useState('')
  const [seminarDate, setSeminarDate] = useState('')
  const [seminarTime, setSeminarTime] = useState('')
  const [seminarPhoto, setSeminarPhoto] = useState('')
  const [actionDone, setActionDone] = useState(false)


  // Открываем окно "Добавить Семинар"
  const showAddSeminarWindow = () => {
    setIsAddWindowOpen(true)
  }

  //Форматируем дату из "2025-02-07" по умолчанию в "07.02.2025"
  const formatDate = (seminarData) => {
    const date = seminarData['date']
    const newDate = new Date(date)
    const day = newDate.getDate() <= 9 ? `0${newDate.getDate()}` : newDate.getDate()
    const month = newDate.getMonth() < 9 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1
    const year = newDate.getFullYear()
    seminarData['date'] = `${day}.${month}.${year}`
  }


  // Добавляем информацию о семинарах в файл seminars.json
  const addSeminar = async (seminarData) => {
    const id = seminars.length ? +seminars[seminars.length - 1].id + 1 : 1
    formatDate(seminarData)
    const newSeminar = { id, ...seminarData }
    setSeminars([...seminars, newSeminar])

    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSeminar),
    }

    const result = await apiRequest(API_URL, postOptions, setFetchError)
    if (result) setFetchError(result)
  }


  //Заполняем текущими значениями редактируемого семинара форму UpdateSeminar и открываем её  
  const handleUpdate = async (id) => {
    const updatedSeminar = seminars.find(seminar => +seminar.id === +id)
    setSeminarID(+id)
    setSeminarTitle(updatedSeminar.title)
    setSeminarDescription(updatedSeminar.description)
    const dateArr = updatedSeminar.date.split('.')
    const formattedDate = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    setSeminarDate(formattedDate)
    setSeminarTime(updatedSeminar.time)
    setSeminarPhoto(updatedSeminar.photo)
    setIsUpdateWindowOpen(true)
  }


  // Обновляем информацию о семинаре в файле seminars.json
  const updateSeminar = async (seminarData) => {

    formatDate(seminarData)
    const updateOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seminarData),
    }

    const updateURL = `${API_URL}/${seminarID}`
    const result = await apiRequest(updateURL, updateOptions, setFetchError)
    if (result) setFetchError(result)

    setActionDone(true)


  }

  // Удаляем семинар из файла seminars.json
  const deleteSeminar = async (id) => {
    const deleteOptions = {
      method: 'DELETE',
    }

    const deleteURL = `${API_URL}/${id}`
    const result = await apiRequest(deleteURL, deleteOptions, setFetchError)
    if (result) setFetchError(result)

    setActionDone(true)
  }



  //Получаем список семинаров на главную страницу из файла seminars.json 
  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Did not receive expected data');
        }
        const data = await response.json();
        setSeminars(data);
        // setFetchError(null);
        setActionDone(false)
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    // Делаем задержу в 500мс, чтобы показать 'Loading...'
    setTimeout(() => {
      (async () => { await fetchSeminars() })()
    }, 500)


  }, [actionDone])

  return (
    <>
      {!fetchError && !isLoading && <button onClick={showAddSeminarWindow}>Add Seminar</button>}

      {/* Окно добавления семинара */}
      <AddModal open={isAddWindowOpen} openClose={() => setIsAddWindowOpen(false)} addSeminar={addSeminar} />

      {/* Окно редактирования семинара */}
      <UpdateModal
        open={isUpdateWindowOpen}
        openClose={() => setIsUpdateWindowOpen(false)}
        title={seminarTitle}
        setSeminarTitle={setSeminarTitle}
        description={seminarDescription}
        setSeminarDescription={setSeminarDescription}
        date={seminarDate}
        setSeminarDate={setSeminarDate}
        time={seminarTime}
        setSeminarTime={setSeminarTime}
        photo={seminarPhoto}
        setSeminarPhoto={setSeminarPhoto}
        updateSeminar={updateSeminar}
      />

      {isLoading && <div>Loading seminars...</div>}
      {fetchError && <div>Error: {fetchError}</div>}


      {/* Таблица семинаров  */}
      {!fetchError && !isLoading && <div className="scrollableTable">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>description</th>
              <th>date</th>
              <th>time</th>
              <th>photo</th>
              <th>actions</th>
            </tr>
          </thead>

          <tbody>
            {seminars.map(seminar => (
              // Строка таблицы семинаров
              <LineItem key={seminar.id} item={seminar} handleUpdate={handleUpdate} handleDelete={deleteSeminar} />
            ))
            }
          </tbody>
        </table>
      </div>
      }

    </>
  )
}

export default App
