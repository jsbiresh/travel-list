import { useState } from 'react'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 12, packed: false },
]

// *******************************
// COMPONENT App
export default function App() {
  const [items, setItems] = useState([...initialItems])

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  // const packedItemsCount = items.reduce(
  //   (acc, current) => acc + (current.packed ? 1 : 0),
  //   0
  // )

  function handleDeleteItem(id) {
    // first it recieves the current items array, from that we filter
    // out the item with id = item.id
    setItems((items) => items.filter((item) => id !== item.id))
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  )
}

// COMPONENT Logo
function Logo() {
  return <h1>🌴 Far Away 👜 </h1>
}

// COMPONENT Form
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

// COMPONENT PackingList
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onToggleItem={onToggleItem}
            handleDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  )
}

// COMPONENT Item
function Item({ item, handleDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => onToggleItem(item.id)}
        value={item.packed}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}> ❌ </button>
    </li>
  )
}

// COMPONENT Stats
function Stats({ items }) {
  // return if the items list is empty
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    )

  // if items list is not empty start calculating
  const numItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const percentage = Math.round((numPacked / numItems) * 100)
  return (
    <footer className="stats">
      {percentage !== 100 ? (
        <em>
          You have {numItems} items on your list, and you already packed{' '}
          {numPacked} ( {percentage} %)
        </em>
      ) : (
        <em>Complete Packing Done. Let's Go...✈</em>
      )}
    </footer>
  )
}
