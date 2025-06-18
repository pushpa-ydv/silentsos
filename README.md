# SilentSOS

SilentSOS is a full-stack emergency alert system designed to discreetly notify trusted contacts during distress. It sends an email with the user's live location and a short video/audio clip when a secret code is entered.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Email Service**: Nodemailer
- **Location**: Geolocation API
- **Media**: MediaRecorder API

## Features

- Save emergency contacts (Name + Email)
- Secret code trigger (e.g., `911#`)
- Sends:
  - Live Location
  - 5-second recorded video & audio
- Alert via email (as attachments)

## Setup Locally

1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/silentsos.git
   cd silentsos

2. **Install dependencies**:
    cd server
    npm install

    cd ../client
    npm install

3. **Add .env in server/**:
    PORT=5000
    MONGO_URI = your_mongodb_atlas_uri
    EMAIL_USER = your_email@example.com
    EMAIL_PASS = your_email_password

4. **Run app**:
    #In root folder
    npm run dev
