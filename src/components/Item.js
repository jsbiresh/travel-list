// COMPONENT Item
export default function Item({ item, handleDeleteItem, onToggleItem }) {
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
