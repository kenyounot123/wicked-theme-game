export default function Toast() {
  return (
    <div className="fixed top-4 right-4 bg-accent/20 text-primary p-4 rounded-lg shadow-lg">
      <h3 className="font-bold">Correct!</h3>
      <p>You&apos;ve earned a point!</p>
    </div>
  )
}