<br />
<div align="center">
  <img src="https://img.icons8.com/color/144/null/wallet--v1.png" alt="Logo" width="100" height="100">

  <h1 align="center">💰 FinTrack</h1>

  <p align="center">
    A Modern, Responsive, and Secure Personal Finance Tracker.
    <br />
    <br />
    <a href="https://github.com/Tanishkraj2005/FinTrack/issues">Report Bug</a>
    ·
    <a href="https://github.com/Tanishkraj2005/FinTrack/issues">Request Feature</a>
  </p>
</div>

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

</div>

---

## 🌟 About The Project

**FinTrack** is a beautifully designed, full-stack Personal Finance Tracker that empowers users to securely manage their finances, keep tabs on their daily expenses, track their monthly income, configure budget limits, and seamlessly visualize financial trends through highly interactive charts. 

Built entirely with the **React 19 ecosystem** powered by **Vite** and styled beautifully with **Tailwind CSS**.

### ✨ Core Features

* 🔐 **Secure Authentication**: Robust Email/Password & **Google Single Sign-On** using Firebase Auth.
* 📊 **Smart Dashboard**: A bird's-eye view of your overall Total Balance, Income, and Expenses.
* 💳 **Transaction Engine**: Add, edit, remove, and categorize both income and outgoing expenses dynamically. 
* 🎯 **Budgeting Goals**: Easily configure monthly budgets for your spending categories & get visualizations matching against your real expenditures!
* 📈 **Interactive Visualizations**: Powerful `Recharts` graph integrations rendering dynamic insights based purely on your data.
* 🌓 **Dark Mode Preference**: Intelligent toggle seamlessly supporting both ultra-clean light interfaces and sleek dark themes.
* 📱 **Mobile First**: 100% responsive grid. Phenomenal viewing on desktop, tablet, and mobile browsers.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple installation steps.

### Prerequisites

Ensure you have Node JS installed globally on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free Firebase account at [Firebase Console](https://console.firebase.google.com/) and initialize a Web App to get your config keys.
2. Clone the repo
   ```sh
   git clone https://github.com/Tanishkraj2005/FinTrack.git
   ```
3. Enter the project directory
   ```sh
   cd FinTrack
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. *(Optional)* Put your Firebase Config inside `src/firebase/firebase.js`.
6. Start up the lightning-fast Vite dev server:
   ```sh
   npm run dev
   ```

---

## 🌐 Deploying to Vercel

This app comes "Vercel-ready" directly out of the box!

Single Page Applications (like React + Vite) traditionally break client-side routing on server refresh (delivering a 404 block) when put into Vercel production. 

This repository has already resolved this by embedding a strict routing `vercel.json` rewrite configuration natively:

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
**This ensures zero headache. Link the repo onto Vercel and it natively works perfectly.**

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
