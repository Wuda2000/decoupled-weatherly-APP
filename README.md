# Weather App

This project is a Weather application consisting of two main parts:

- **Backend:** A Laravel-based API server that provides weather data.
- **Frontend:** A Next.js React application that serves as the user interface.

## Project Structure

```
/backend   - Laravel API backend
/frontend  - Next.js frontend application
```

---

## Backend

The backend is built with [Laravel](https://laravel.com), a PHP web application framework.

### Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install PHP dependencies using Composer:

```bash
composer install
```

3. (Optional) Install Node.js dependencies if needed (for frontend assets):

```bash
npm install
```

4. Set up your environment variables by copying `.env.example` to `.env` and configuring as needed.

5. Run database migrations:

```bash
php artisan migrate
```

### Running the Backend Server

Start the Laravel development server:

```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`.

For more details, see the [backend README](./backend/README.md).

---

## Frontend

The frontend is built with [Next.js](https://nextjs.org), a React framework for server-rendered applications.

### Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

### Running the Frontend Server

Start the development server:

```bash
npm run dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

For more details, see the [frontend README](./frontend/README.md).

---

## Additional Notes

- Ensure the backend server is running before using the frontend to fetch weather data.
- Configure any necessary environment variables in the backend `.env` file.
- Ports used:
  - Backend: 8000
  - Frontend: 3000

---

## License

This project is licensed under the MIT License.
