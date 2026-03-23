export default function Pricing() {
  return (
    <div className="p-10 text-white text-center">
      <h1 className="text-4xl mb-10">Pricing</h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">

        <div className="border p-6 rounded">
          <h2 className="text-xl">Free</h2>
          <p className="text-3xl">$0</p>
          <p className="text-sm text-gray-400">5 generations/day</p>
        </div>

        <div className="border p-6 rounded border-cyan-400">
          <h2 className="text-xl">Starter</h2>
          <p className="text-3xl">$19</p>
          <p className="text-sm text-gray-400">50 generations/day</p>
        </div>

        <div className="border p-6 rounded">
          <h2 className="text-xl">Pro</h2>
          <p className="text-3xl">$49</p>
          <p className="text-sm text-gray-400">Unlimited</p>
        </div>

      </div>
    </div>
  );
}
