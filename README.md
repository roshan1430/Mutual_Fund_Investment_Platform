
# Mutual Fund Investment Platform

This project uses:

- React + Vite for the frontend
- Spring Boot for the backend API
- MySQL for the database
- Docker + Docker Compose for full-stack deployment

## Repository structure

- `frontend/` contains the React + Vite app
- `backend/` contains the Spring Boot API
- `docker-compose.yml` at the repo root runs the full stack

## Local development

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

## Full-stack deployment with Docker

This repo is already set up for containerized deployment.

### 1. Create your environment file

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

### 2. Build and start everything

```bash
docker compose up --build -d
```

Services:

- Frontend: `http://localhost` or `http://your-server-ip`
- Backend API: `http://localhost:8080/api`
- MySQL: port `3306`

The frontend is served by Nginx and automatically proxies `/api` requests to the Spring Boot backend.

### 3. Check logs if something fails

```bash
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f db
```

### 4. Stop the stack

```bash
docker compose down
```

To also remove the database volume:

```bash
docker compose down -v
```

## Deploying on a VPS or cloud VM

This is the simplest production path for this project:

1. Install Docker and Docker Compose on the server.
2. Clone the repo on the server.
3. Create the root `.env` file with strong passwords.
4. Run `docker compose up --build -d`.
5. Open ports `80` and `8080` in the firewall if needed.
6. Point your domain to the server IP.

For production, it is better to place Nginx, Caddy, or a cloud load balancer in front of the app and terminate HTTPS there.

## Deploying with a managed MySQL database

If you use Railway, Render, AWS RDS, Azure Database for MySQL, or another managed MySQL service:

1. Create the database externally.
2. Replace `SPRING_DATASOURCE_URL` with the managed database host.
3. Set `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD` to the managed DB credentials.
4. Remove the `db` service from `docker-compose.yml` if you no longer want a local MySQL container.

Example:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/mutual_fund_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password
```

## Notes

- The backend reads its database connection from environment variables.
- The Docker Compose setup waits for MySQL before starting the backend.
- CORS is enabled in the backend, but when you use the bundled Nginx frontend proxy, frontend and API requests already flow through the same origin.

