# Will You Go On a Date With Me?

This is a small, interactive web application designed to ask someone out on a date in a cute and engaging way. The user is presented with a series of questions to plan the date, including location, time, food, and drinks. The final selections are then sent as an email invitation.

## Features

- Interactive and animated UI with a cute cat theme.
- Step-by-step process to plan a date.
- Dark mode support.
- Email notification with the date details.
- Securely handles credentials using a `.env` file.

## Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm) installed on your system.
- A Gmail account to send the invitation from. You will need to generate an "App Password" for it.

## Setup & Configuration

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MinhQuang-02/date.git
    cd date
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the root of the project directory and add the following lines. This file will store the credentials for the email account that sends the invitation.

    ```env
    GMAIL_USER=your_email@gmail.com
    GMAIL_PASS=your_gmail_app_password
    MAIL_TO=recipient_email@example.com
    ```

    -   `GMAIL_USER`: The Gmail address you want to send the email from.
    -   `GMAIL_PASS`: An **App Password** for your Gmail account. Due to Google's security policies, you cannot use your regular password. To generate an App Password, you need to have 2-Step Verification enabled on your Google account. You can follow [Google's guide to create one](https://support.google.com/accounts/answer/185833).
    -   `MAIL_TO`: The email address where the date invitation will be sent.

## Running the Application

1.  **Start the server:**
    ```bash
    npm start
    ```

2.  **Open the application:**
    Once the server is running, you will see a message in your terminal:
    `Server is running on http://localhost:3000`

    Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to use the application.
