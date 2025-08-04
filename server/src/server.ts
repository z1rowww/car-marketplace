import { createServer } from 'http';
import { parse } from 'url';
import { readFileSync } from 'fs';
import { join } from 'path';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
}

let cars: Car[] = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2022, price: 90000 },
  { id: 2, make: 'BMW', model: 'X5', year: 2020, price: 50000 }
];

const server = createServer((req, res) => {
  const url = parse(req.url || '', true);
  if (url.pathname === '/api/cars') {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(cars));
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const car = JSON.parse(body);
        car.id = cars.length ? cars[cars.length - 1].id + 1 : 1;
        cars.push(car);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(car));
      });
      return;
    }
  }

  const filePath = join(__dirname, '..', '..', 'public', url.pathname === '/' ? 'index.html' : url.pathname!);
  try {
    const file = readFileSync(filePath);
    const ext = filePath.split('.').pop();
    const contentType = ext === 'js' ? 'application/javascript'
      : ext === 'html' ? 'text/html'
      : ext === 'css' ? 'text/css'
      : 'text/plain';
    res.setHeader('Content-Type', contentType);
    res.end(file);
  } catch {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
