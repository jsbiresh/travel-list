import { useState } from 'react'

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: true },
//   { id: 3, description: 'Charger', quantity: 12, packed: false },
// ]

// *******************************
export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItem(id) {
    // first it recieves the current items array, from that we filter
    // out the item with id = item.id
    setItems((items) => items.filter((item) => id !== item.id))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats itemCount={items.length} />
    </div>
  )
}
function Logo() {
  return <h1>🌴 Far Away 👜 </h1>
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    }
    // call the function
    onAddItems(newItem)

    // clear the form fields
    setDescription('')
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😎 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option> */}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}
function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} handleDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item, handleDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}> ❌ </button>
    </li>
  )
}

function Stats({ itemCount }) {
  return (
    <footer className="stats">
      <em>
        You have {itemCount} items on your list, and you already packed X (X%)
      </em>
    </footer>
  )
}
