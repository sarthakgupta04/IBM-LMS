# Loan Management System (LMS)

## Project Overview

The Loan Management System (LMS) is a comprehensive web application that manages the loan process from request submission to approval or rejection. It caters to three types of users: **Customers**, **Agents**, and **Admins**, each with distinct roles and responsibilities within the system.

## Features

- **User Registration & Authentication**:
  - Customers and Agents can sign up.
  - Agents must be approved by an Admin before they can access the system.
  - Passwords are securely encrypted before storage.
- **Role-Based Access Control**:
  - **Admins** can approve/reject loan requests, manage agents, and view all user accounts.
  - **Agents** can request loans on behalf of customers, view loan details, and edit unapproved loans.
  - **Customers** can request loans and view their loan status.
- **Loan Management**:
  - Loan requests include details such as principle amount, interest rate, repayment months, EMI, and status.
  - Loan interest rates are dynamically calculated based on the principal amount.
  - Loan statuses include "NEW", "APPROVED", and "REJECTED".
  - Only Admins can approve or reject loans.
  - A history of loan edits is maintained.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js and JWT (JSON Web Tokens)
- **Deployment**: Docker

## Key Components

### Models

1. **User**: Stores user information, including their role (Admin, Agent, or Customer), password, and approval status.
2. **Loan**: Contains loan-specific details, including principle amount, interest rate, EMI, repayment period, and status. Also maintains a history of edits for auditing purposes.

### Routes

- **User Routes**:

  - `/users/signup`: Sign up a new user (Customer/Agent).
  - `/users/login`: Log in an existing user.
  - `/users/listUsers`: List all users (Admin-only).
  - `/users/agentRequestList`: List all pending agent approvals (Admin-only).
  - `/users/approveAgent`: Approve an agent (Admin-only).
  - `/users/updatePassword`: Update the user's password.

- **Loan Routes**:
  - `/loan/newLoan`: Request a new loan.
  - `/loan/approveLoan`: Approve a loan (Admin-only).
  - `/loan/rejectLoan`: Reject a loan (Admin-only).
  - `/loan/editLoan`: Edit a loan (Agent-only).
  - `/loan/allLoans`: View all loans (Admin & Agent).
  - `/loan/loansbyFilter`: Filter loans by status.

## Setup Instructions

### Local Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sarthakgupta04/IBM-LoanManagementService
   ```
