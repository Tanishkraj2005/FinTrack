# Personal Finance Tracker

A modern, responsive Personal Finance Tracker application built with React, Vite, Tailwind CSS, and Firebase. This application allows users to securely manage their finances, track income and expenses, set budgets, and visualize their financial data through interactive charts.

## Features

- **User Authentication**: Secure Login/Register using Firebase Authentication.
- **Dashboard Overview**: A comprehensive dashboard providing a quick summary of your total balance, income, and expenses.
- **Transaction Management**: Easily add, edit, and categorize your income and expenses.
- **Budgeting System**: Set monthly budgets for different categories and track your spending against them.
- **Interactive Charts**: Visualizations of your financial summaries using Recharts.
- **Dark Mode Toggle**: Built-in support for light and dark themes for a better user experience.
- **Responsive Design**: Fully responsive layout that works seamlessly beautifully across desktops, tablets, and mobile devices.

## Technologies Used

- **Frontend**: React (v19), Vite, Tailwind CSS
- **Routing**: React Router DOM (v7)
- **Database & Auth**: Firebase (Firestore, Authentication)
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js installed on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tanishkraj2005/FinTrack.git
   cd FinTrack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment on Vercel

If you deploy a Single Page Application (like this React + Vite app) on Vercel, client-side routing causes a 404 error when refreshing the page on routes other than the root (`/`). 

This project already includes a `vercel.json` file at the root correctly configured to handle React Router client-side routing on Vercel:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration tells Vercel to route all requests to `index.html`, allowing React Router to handle the URL paths appropriately, making the application function perfectly upon deployment.
