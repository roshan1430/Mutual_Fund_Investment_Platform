# Mutual Fund Investment Platform

This project uses:

- React + Vite for the frontend
- Spring Boot for the backend API
- MySQL for the database
- Docker + Docker Compose for local full-stack development
- Railway for hosted deployment

## Repository Structure

- `frontend/` contains the React + Vite app
- `backend/` contains the Spring Boot API
- `docker-compose.yml` at the repo root runs the local full stack

## Local Development

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
mvn spring-boot:run
```

Make sure MySQL is running and the backend database variables are configured before starting Spring Boot locally.

## Full-Stack Development With Docker

### 1. Create Your Environment File

Create a `.env` file in the project root using `.env.example` as the base:

```env
# Frontend
VITE_API_BASE=/api
FRONTEND_PORT=80

# Backend
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/mutual_fund_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=appuser
SPRING_DATASOURCE_PASSWORD=change_this_password

# Database
MYSQL_ROOT_PASSWORD=change_this_root_password
MYSQL_DATABASE=mutual_fund_db
MYSQL_USER=appuser
MYSQL_PASSWORD=change_this_password
```

Keep `SPRING_DATASOURCE_PASSWORD` and `MYSQL_PASSWORD` the same when using the bundled MySQL container.

### 2. Build And Start Everything

```bash
docker compose up --build -d
```

Services:

- Frontend: `http://localhost`
- Backend API: `http://localhost:8080/api`
- MySQL: port `3306`

The frontend is served by Nginx and automatically proxies `/api` requests to the Spring Boot backend.

### 3. Check Logs If Something Fails

```bash
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f db
```

### 4. Stop The Stack

```bash
docker compose down
```

To also remove the database volume:

```bash
docker compose down -v
```

## Deploying On Railway

Railway is the recommended hosted deployment path for this repository.

Recommended Railway service names:

- `frontend`
- `backend`
- `mysql`

### Railway Architecture

- `frontend` deploys from `/frontend`
- `backend` deploys from `/backend`
- `mysql` uses Railway's managed MySQL service
- the frontend proxies `/api` requests to the backend over Railway private networking

### Railway Deployment Steps

1. Push this repository to GitHub.
2. In Railway, create a new project.
3. Add a `MySQL` service from Railway's database templates.
4. Add a new service from GitHub for the frontend:
   - repo: this repository
   - root directory: `/frontend`
5. Add another new service from GitHub for the backend:
   - repo: this repository
   - root directory: `/backend`
6. Rename the services to exactly:
   - `frontend`
   - `backend`
   - `mysql`

### Frontend Variables

In Railway, open the `frontend` service and add:

```env
API_PROXY_TARGET=${{backend.RAILWAY_PRIVATE_DOMAIN}}:${{backend.PORT}}
```

Notes:

- the frontend container already serves the built React app through Nginx
- it proxies `/api` to `API_PROXY_TARGET`

### Backend Variables

In Railway, open the `backend` service and add:

```env
PORT=8080
SERVER_PORT=8080
SPRING_DATASOURCE_HOST=${{mysql.MYSQLHOST}}
SPRING_DATASOURCE_PORT=${{mysql.MYSQLPORT}}
SPRING_DATASOURCE_DATABASE=${{mysql.MYSQLDATABASE}}
SPRING_DATASOURCE_USERNAME=${{mysql.MYSQLUSER}}
SPRING_DATASOURCE_PASSWORD=${{mysql.MYSQLPASSWORD}}
APP_CORS_ALLOWED_ORIGINS=https://${{frontend.RAILWAY_PUBLIC_DOMAIN}}
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=yourgmail@gmail.com
SPRING_MAIL_PASSWORD=your_16_char_app_password
APP_MAIL_FROM=yourgmail@gmail.com
```

Notes:

- Railway injects `PORT`, and this backend already respects it
- Railway MySQL exposes `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, and `MYSQLDATABASE`

### Public Domains

After the first deploy:

1. Open the `frontend` service.
2. Go to `Settings` -> `Networking`.
3. Generate a Railway domain.

If you also want direct external backend access for testing:

1. Open the `backend` service.
2. Go to `Settings` -> `Networking`.
3. Generate a Railway domain there too.

The app itself should normally be used through the frontend domain only.

### Health Checks

- backend health path: `/api/health`
- frontend health path: `/`

Set the backend health check in Railway service settings to `/api/health` for cleaner deploys.

### Why Railway Fits This Repo Well

- Railway supports monorepos with per-service root directories
- Railway provides private internal DNS between services
- Railway provides a managed MySQL template with connection variables
- Railway reference variables let one service consume another service's generated values

## Notes

- The backend reads its database connection from environment variables.
- The Docker Compose setup waits for MySQL before starting the backend.
- CORS is enabled in the backend, but when you use the bundled Nginx frontend proxy, frontend and API requests flow through the same origin.
