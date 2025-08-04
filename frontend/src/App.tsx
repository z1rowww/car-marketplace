interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
}

function App() {
  const [cars, setCars] = React.useState<Car[]>([]);
  const [form, setForm] = React.useState({ make: '', model: '', year: '', price: '' });

  React.useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(setCars);
  }, []);

  const addCar = async () => {
    const newCar = {
      make: form.make,
      model: form.model,
      year: parseInt(form.year),
      price: parseFloat(form.price)
    };
    const res = await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar)
    });
    const saved = await res.json();
    setCars(prev => [...prev, saved]);
    setForm({ make: '', model: '', year: '', price: '' });
  };

  return (
    <div>
      <h1>Car Marketplace</h1>
      <div>
        <input placeholder="Make" value={form.make} onChange={e => setForm({ ...form, make: e.target.value })} />
        <input placeholder="Model" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} />
        <input placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <button onClick={addCar}>Add Car</button>
      </div>
      <ul>
        {cars.map(car => (
          <li key={car.id}>{car.make} {car.model} ({car.year}) - ${car.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
