import styles from './styles.module.scss'

const LineItem = ({ item, handleUpdate, handleDelete }) => {
  return (

    <tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.date}</td>
      <td>{item.time}</td>
      <td>{item.photo}</td>
      <td>
        <div className={`${styles.actionsBlock}`}>
          <button onClick={() => handleUpdate(item.id)}>Update</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default LineItem
