import { useState } from 'react'
import Logo from './Logo'
import Form from './Form'
import PackingList from './PackingList'
import Stats from './Stats'

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

  // clear list in PackingList
  function handleClearList() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all Items?'
    )
    if (confirmed) setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}
