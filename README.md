# 🎧 Audiophile E-Commerce Platform

Audiophile is a premium, fully-responsive e-commerce web application dedicated to high-fidelity audio equipment, including headphones, speakers, and earphones. It offers a seamless shopping experience from product discovery to secure checkout and order management.

---

## ✨ Key Features

- **Secure Authentication**  
  Complete user flow including Sign Up, Log In, and secure Protected Routes handled via Supabase Auth.

- **Dynamic Product Catalog**  
  Browse high-end audio gear categorized by Headphones, Speakers, and Earphones with detailed product preview and feature pages.

- **Advanced State Management**  
  Global shopping cart functionality powered by Redux Toolkit, persisting user cart data locally across sessions.

- **Optimized Data Fetching**  
  Seamless API interactions, caching, and loading state management using TanStack React Query.

- **Robust Checkout Flow**  
  Comprehensive multi-step checkout form with strict field validation (using React Hook Form) for Billing, Shipping, and Payment details.

- **Order Tracking**  
  Authenticated users have access to a personalized dashboard to view their complete Order History.

- **Admin Dashboard** _(In Progress)_  
  Dedicated administrative access rights for managing store data and user actions.

- **Automated Notifications**  
  Integration with EmailJS to send automated Welcome emails upon registration and Order Confirmation receipts after checkout.

---

## 🛠️ Tech Stack

### 🎨 Frontend Architecture

- **Framework:** React 18 (Vite)
- **Routing:** React Router v6 (using `createBrowserRouter`)
- **Styling:** CSS Modules with custom CSS variables for a maintainable, scoped, and responsive design system

### 📦 State Management & Data

- **Server State:** TanStack React Query
- **Client State:** Redux Toolkit (Cart Management)
- **Form Handling:** React Hook Form

### 🔗 Backend & Integrations

- **BaaS:** Supabase (PostgreSQL Database & Authentication)
- **Email Service:** EmailJS
- **Notifications:** React Hot Toast

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

### 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase Project
- An EmailJS Account

---

### ⚙️ Installation

#### Clone the repository

```bash
git clone https://github.com/your-username/audiophile.git
cd audiophile
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

#### 👨‍💻 Developer

Haseeb Akram
Role: Full Stack / Frontend Developer
