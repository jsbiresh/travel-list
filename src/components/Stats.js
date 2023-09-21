// COMPONENT Stats
export default function Stats({ items }) {
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
