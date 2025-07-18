# SkillLink Development Guide

## Running the Project in VS Code

### Method 1: Current Environment (Recommended)
The project is already running in your current environment. You can:

1. **View the running application**: The dev server should already be running at `http://localhost:5173`
2. **Make changes**: Edit any file in the `src/` directory and see live updates
3. **Stop the server**: Use `Ctrl+C` in the terminal if you need to stop it
4. **Restart the server**: Run `npm run dev` to start it again

### Method 2: Clone to Local VS Code

If you want to run this project locally in VS Code:

#### Step 1: Clone the Repository
```bash
# Create a new directory for your project
mkdir skilllink-marketplace
cd skilllink-marketplace

# Initialize git and copy the files
git init
```

#### Step 2: Copy Project Files
Copy all the project files from your current environment to your local directory:
- `src/` folder with all components
- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `tailwind.config.js`
- `index.html`
- All other configuration files

#### Step 3: Install Dependencies
```bash
npm install
```

#### Step 4: Start Development Server
```bash
npm run dev
```

#### Step 5: Open in VS Code
```bash
code .
```

## VS Code Extensions (Recommended)

Install these extensions for the best development experience:

### Essential Extensions
- **ES7+ React/Redux/React-Native snippets** - Provides React snippets
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **TypeScript Importer** - Auto import TypeScript modules
- **Prettier - Code formatter** - Code formatting
- **ESLint** - Code linting

### Helpful Extensions
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Bracket Pair Colorizer** - Color matching brackets
- **GitLens** - Enhanced Git capabilities
- **Thunder Client** - API testing (alternative to Postman)
- **Live Server** - For static file serving

## VS Code Configuration

Create these files in your project root for optimal VS Code experience:

### .vscode/settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    "tw`([^`]*)",
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["classnames\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### .vscode/extensions.json
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json"
  ]
}
```

## Development Workflow

### 1. File Structure
```
skilllink/
├── src/
│   ├── components/          # React components
│   │   ├── Auth/           # Authentication components
│   │   └── Dashboard/      # Dashboard components
│   ├── store/              # Zustand stores
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

### 2. Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### 3. Making Changes
1. **Components**: Edit files in `src/components/`
2. **Styling**: Use Tailwind CSS classes
3. **State**: Modify Zustand stores in `src/store/`
4. **Types**: Update TypeScript types in `src/types/`

### 4. Hot Reload
The development server supports hot reload - changes will automatically reflect in the browser.

## Debugging in VS Code

### 1. Browser Debugging
- Use browser developer tools (F12)
- React Developer Tools extension for Chrome/Firefox

### 2. VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

## Project Features

### Current Implementation
- ✅ User Authentication (Client/Freelancer roles)
- ✅ Job Posting and Browsing
- ✅ Bidding System
- ✅ User Dashboards
- ✅ Profile Management
- ✅ Responsive Design
- ✅ Mock Data System

### Demo Credentials
- **Client**: john@example.com (any password)
- **Freelancer**: sarah@example.com (any password)

## Next Steps for Full-Stack Development

To extend this into a full-stack application:

1. **Backend Setup**
   - Set up Node.js/Express server
   - Configure PostgreSQL database
   - Implement Prisma ORM

2. **Authentication**
   - Replace mock auth with JWT
   - Add OAuth integration

3. **Real-time Features**
   - Implement Socket.io for chat
   - Add real-time notifications

4. **Payment Integration**
   - Set up Stripe Connect
   - Implement escrow system

5. **File Upload**
   - Configure Cloudinary/S3
   - Add portfolio image uploads

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure you're using Node.js 18+
4. Check that the development server is running on the correct port

Happy coding! 🚀