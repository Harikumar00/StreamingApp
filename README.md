# StreamingApp

Stream premium video content, host live watch parties, and manage your catalogue with a modern microservice architecture. The platform now ships with a production-ready admin portal, real-time chat, S3-backed adaptive streaming, and a redesigned cinematic frontend experience.

## Architecture


Developer → GitHub → Jenkins Pipeline → Docker Build
→ Push to AWS ECR → Deploy to AWS EKS → Helm Release
→ MongoDB Atlas → SNS Email Notification

| Service | Port | Description |
| --- | --- | --- |
| `authService` | 3001 | User authentication, registration, JWT issuance |
| `streamingService` | 3002 | Video catalogue, S3 playback endpoints, public APIs |
| `adminService` | 3003 | Dedicated admin microservice for asset management and uploads |
| `chatService` | 3004 | Websocket + REST chat for live watch parties |
| `frontend` | 3000 | React SPA with revamped UI and integrated chat |
| `mongo` | 27017 | Shared MongoDB instance |

All backend services share common database models and utilities through `backend/common`.

## Environment Configuration

Create an `.env` for each service (or export variables before running). All services accept the standard AWS credentials for S3 access.

### Auth Service (`backend/authService/.env`)
```ini
PORT=3001
MONGO_URI=mongodb://localhost:27017/streamingapp
JWT_SECRET=changeme
CLIENT_URLS=http://localhost:3000
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
AWS_S3_BUCKET=
```

### Streaming Service (`backend/streamingService/.env`)
```ini
PORT=3002
MONGO_URI=mongodb://localhost:27017/streamingapp
JWT_SECRET=changeme
CLIENT_URLS=http://localhost:3000
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
AWS_S3_BUCKET=
AWS_CDN_URL=
STREAMING_PUBLIC_URL=http://localhost:3002
```

### Admin Service (`backend/adminService/.env`)
```ini
PORT=3003
MONGO_URI=mongodb://localhost:27017/streamingapp
JWT_SECRET=changeme
CLIENT_URLS=http://localhost:3000
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
AWS_S3_BUCKET=
```

### Chat Service (`backend/chatService/.env`)
```ini
PORT=3004
MONGO_URI=mongodb://localhost:27017/streamingapp
JWT_SECRET=changeme
CLIENT_URLS=http://localhost:3000
```

### Frontend build variables (`frontend/.env` or Docker build args)
```ini
REACT_APP_AUTH_API_URL=http://localhost:3001/api
REACT_APP_STREAMING_API_URL=http://localhost:3002/api
REACT_APP_STREAMING_PUBLIC_URL=http://localhost:3002
REACT_APP_ADMIN_API_URL=http://localhost:3003/api/admin
REACT_APP_CHAT_API_URL=http://localhost:3004/api/chat
REACT_APP_CHAT_SOCKET_URL=http://localhost:3004
```
instance screenshot: 
-  <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 16 15" src="https://github.com/user-attachments/assets/4489b58c-4f22-4289-a129-b27d25420977" />


Jenkins Build Success
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 36 53" src="https://github.com/user-attachments/assets/874a0abd-722e-40ad-9205-e7e94e5dc2e5" />


Jenkins Console ouptput:
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 41 20" src="https://github.com/user-attachments/assets/a1a2206a-ee8f-4285-9d50-973b119bccb9" />
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 41 58" src="https://github.com/user-attachments/assets/0453dc3c-5efa-4d5f-a85c-97e126d8db00" />
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 42 18" src="https://github.com/user-attachments/assets/09ab011c-5b59-4ff7-8c41-47f0a8abc0a7" />
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 42 46" src="https://github.com/user-attachments/assets/f8dfe4e2-784d-492a-9c77-adc63c5d4b90" />



Helm and mongo db connection success:
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 30 19" src="https://github.com/user-attachments/assets/69f11759-19b4-466b-8632-eaac96801533" />



Running pods terminal:
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 23 33" src="https://github.com/user-attachments/assets/684c0480-20c6-433a-aa45-505e51a61ce0" />



Web page:
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 24 44" src="https://github.com/user-attachments/assets/53ce21a6-1be6-4aad-890c-23a54bf56b3f" />
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 38 57" src="https://github.com/user-attachments/assets/e6ccee56-f764-476a-aea5-cf671e70b8d2" />


Kub nodes and aws ECR:
- <img width="1440" height="900" alt="Screenshot 2026-02-22 at 12 33 38" src="https://github.com/user-attachments/assets/e5bac1b4-a249-4903-b733-260f43515fbc" />






