export default function Page() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 100 }, (_, i) => (
        <div key={i}>page {i + 1}</div>
      ))}
    </div>
  )
}
