### 1. **Clone the repository**

```bash
git clone https://github.com/amangh30/DocuLink
cd DocuLink
```

### 2. **Install dependencies**

You can either use `npm` or `yarn`. Make sure you have one of these installed:

* [Node.js and npm](https://nodejs.org/en/) (npm comes with Node.js)
* [Yarn](https://yarnpkg.com/) (optional)

If you don't have either, install them before proceeding.

* **With npm:*

  ```bash
  npm install
  ```
* **With Yarn:**

  ```bash
  yarn
  ```

### 3. **Set up environment variables**

The `.env.local` file is necessary for the app to function correctly with Pusher. You'll need to obtain Pusher credentials.

* Create the `.env.local` file in the root of the project, and add your Pusher credentials:

```env
NEXT_PUBLIC_PUSHER_KEY=<your-pusher-key>
NEXT_PUBLIC_PUSHER_CLUSTER=<your-pusher-cluster>
PUSHER_APP_ID=<your-pusher-app-id>
PUSHER_SECRET=<your-pusher-secret>
```

Make sure to replace `<your-pusher-key>`, `<your-pusher-cluster>`, etc., with actual values from your Pusher account. If you don’t have a Pusher account, you can sign up at [Pusher](https://pusher.com/) to get these credentials.

> **Note:** If you’re not using Pusher or want to mock this for testing, make sure to adjust the code to handle missing or invalid environment variables.

### 4. **Run the development server**

Once dependencies are installed and the `.env.local` file is configured:

* **With npm:**

  ```bash
  npm run dev
  ```
* **With Yarn:**

  ```bash
  yarn dev
  ```

After this, visit `http://localhost:3000` in your browser to see the app running.

### 5. **Build for production**

When you're ready to deploy the app or test it in production mode:

* **With npm:**

  ```bash
  npm run build
  npm start
  ```
* **With Yarn:**

  ```bash
  yarn build
  yarn start
  ```

---

### Troubleshooting

* **Missing dependencies**: Make sure you don't get errors while running `npm install` or `yarn` (like missing dependencies). If you do, you can try deleting the `node_modules` folder and the `package-lock.json` or `yarn.lock` file and re-running the installation.

* **Pusher credentials issue**: Ensure that the Pusher credentials in `.env.local` are valid. If you're getting an error related to Pusher, double-check the values from your Pusher account.
