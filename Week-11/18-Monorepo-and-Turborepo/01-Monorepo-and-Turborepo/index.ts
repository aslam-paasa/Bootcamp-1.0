/**
 * What are monorepos?
 * > As the name suggests, a single repository (on github let's say) that
 *   holds all your frontend, backend, devops code.
 * > If all the code is in single place and any new developer joins, he just
 *   have to run one docker command to start everything in one go that include
 *   (frontend, backend, database, etc.)
 * > Small Companies like startups & Open Source projects use monorepos, 
 *   but large companies use multiple repos.
*/

/**
 * Advantages of Monorepos:
 * 1. Easy Onboarding for New Developers:
 *    > Instead of running multiple commands for different repos:
 *      - git clone company-frontend
 *      - git clone company-backend
 *      - git clone company-mobile
 *    > Just one command:
 *      - git clone company-monorepo
 *      - docker-compose up
 *    > Everything starts: frontend + backend + database + etc.
 * 2. Code Sharing Made Simple:
 *    > Common Code used in both frontend and backend: 
 *      - packages/utils/helpers.js
 *        export function formatDate(date) {
 *          return new Date(date).toLocaleDateString();
 *        }
 *    > Frontend code using the shared code: 
 *      - apps/frontend/src/components/UserCard.js
 *        import { formatDate } from '@company/utils';
 *    > Backend code using the shared code: 
 *      - apps/backend/src/controllers/userController.js  
 *        import { formatDate } from '@company/utils';
 * 3. Consistent Tooling:
 *    > Single ESLint configuration
 *    > One Prettier Setup
 *    > Unified Testing Framework
 *    > Shared TypeScript Config
 * 4. Atomic Changes:
 *    > Change both frontend and backend in one commit:
 *      git commit -m "feat: add user profile
 *      - Update frontend profile page
 *      - Add backend profile API
 *      - Update shared types"
*/

/**
 * Disadvantages of Monorepos:
 * 1. Build Times:
 *    > Changing one file might trigger builds for all projects
 *    > Sol: Smart build tools like Turborepo
 * 2. Repository Size:
 *    > Large Repo can slow to clone
 *    > Sol: Git Shallow Clone, Sparse Checkout
 * 3. Access Control:
 *    > Harder to restrict access to specific parts
 *    > Sol: Proper folder structure and tooling
*/

/**
 * Common folder structure in monorepos:
 * > If we go to monorepo, we might notice common folder structure like:
 *   a. apps 
 *   b. packages
 * > Example:
 *   my-monorepo/
 *   ├── apps/
 *   │   ├── frontend/          # React app
 *   │   ├── backend/           # Node.js API
 *   │   └── mobile/            # React Native app
 *   ├── packages/
 *   │   ├── ui/               # Shared UI components
 *   │   ├── utils/            # Common utilities
 *   │   └── database/         # Database configuration
 *   ├── docker-compose.yml    # Start everything at once
 *   └── package.json
 * 
 * > Few repos that use monorepos are:
 *   1. https://github.com/code100x/daily-code
 *   2. https://github.com/calcom/cal.com
*/

/**
 * Do you need to know them very well as a full stack engineer?
 * > Not exactly. Most of the times they are setup in the project already
 *   by the 'devtools' guy and you just need to follow the right practices.
 * > Good to know how to set one up from scratch though.
*/

/**
 * Why Monorepos? Why not simple folders?
 * > Why can't I just store services (backend, frontend, etc) in various
 *   top level folders?
 * > You can, and you should if your:
 *   1. Services are highly decoupled (don't share any code)
 *   2. Services don't depend on each other
 * > For eg - A codebase which has a Golang Services and a JS Service.
 *    +-------------+
 *    | +---------+ |
 *    | | go-code | |
 *    | +---------+ |
 *    | +---------+ |
 *    | | js-code | |
 *    | +---------+ |
 *    +-------------+
 * 
 * Why monorepos?
 * 1. Shared Code Reuse
 * 2. Enhanced Collaboration
 * 3. Optimized Builds and CI/CD: Tools like Turborepo offer smart caching
 *    and task execution strategies that can siginificantly reduce build
 *    and testing times.
 * 4. Centralized Tooling and Configuration: Managing build tools, linters,
 *    formatters, and other configurations is simpler in a monorepo because
 *    you can have a single set of tools for the entire project.
 * 
 *    +------------------------+
 *    | +--------------------+ |
 *    | |   react-frontend   | +-----------+
 *    | +--------------------+ |           |
 *    | +--------------------+ |           |     +-------------------------+
 *    | |    node-backend    | +-----------+-----| Common Code/Shared Code |
 *    | +--------------------+ |           |     +-------------------------+
 *    | +--------------------+ |           |        function sum() { ... }
 *    | | cloudflare-backend | +-----------+
 *    | +--------------------+ |
 *    | +--------------------+ |
 *    | | eslint-for-project | |
 *    | +--------------------+ |
 *    | +--------------------+ |
 *    | | code that deploys  | |
 *    | | app to aws es2/s3  | |
 *    | +--------------------+ |
 *    +------------------------+
 * 
*/

/**
 * Common monorepo framework in Node.js:
 * 1. Lerna: https://learns.js.org/ 
 * 2. nx   : https://github.com/nrwl/nx
 * 3. Turborepo: https://turbo.build/  (Not exactly a monorepo framework)
 * 4. Yarn/npm workspaces:
 *    https://classic.yarnpkg.com/lang/en/docs/workspaces/
 * 
 * > Turborepo is not exactly a monorepo framework, but a layer on top of it,
 *   whereas lerna, nx, yarn/npm workspaces are monorepo frameworks.
 * > We can use turborepo on top of any monorepo framework to get more 
 *   benefits. And this is a common way to use turborepo.
 * > We'll be going through turborepo since it's the most relevant one today
 *   and provides more things (like build optimizations) that others don't.
*/

/**
 * History of Turborepo:
 * 1. Created by Jared Palmer
 * 2. In December 2021 acquired by Vercel
 * 3. Mild speculation/came from a random source
 * 4. They've built a bunch of products, Turborepo is the most used one
*/


/**
 * Build System vs Build System Orchestrator vs Monorepo Framework:
 * 1. Build System (Easiest):
 *    > Build systems directly transform your code into something that can run.
 *    > Think of a kitchen appliance:
 *      a. Blender: Takes ingredients and makes a smoothie
 *      b. Oven   : Takes dough and makes bread
 *    > For JavaScript and TypeScript projects, this process can include:
 *      a. transpilation(converting TS to JS), 
 *      b. bundling (combining multiple files into fewer files),
 *      c. Minification (reducing file size), etc,
 *    > A build system might also handle running tests, linting, and
 *      deploying applications.
 *    > Example:
 *      - Vite       // Bundles your React code
 *      - Webpack    // Bundles and optimizes
 *      - tsc        // Compiles TypeScript to JavaScript
 *      - esbuild    // Fast JavaScript bundler
 *      - Next.js    // Builds React applications
 * 
 * 2. Build System Orchestrator:
 *    > Orchestrators coordinate multiple build systems to work together 
 *      efficiently.
 *    > Think of a restaurant kitchen manager:
 *      a. Doesn't cook the food directly
 *      b. Tells chefs what to cook and when
 *      c. Makes sure everything is ready at the same time
 *    > Example: turbo.json - The "kitchen manager" instructions
 *      {
 *        "pipeline": {
 *          "build": {
 *            "dependsOn": ["^build"],  => 1. Build dependencies first
 *            "outputs": ["dist/**"]    => 2. Cache the results
 *          },
 *          "dev": {
 *            "cache": false            => 3. Don't cache dev server
 *          },
 *          "test": {
 *            "dependsOn": ["build"]    => 4. Test after building
 *          }
 *        }
 *      }
 *    > What Turporepo does:
 *      - TurboRepo acts more like a build system orchestrator rather than a
 *        direct build system itself.
 *      - It doesn't directly perform tasks like transpilation, bundling,
 *        minification, or running tests.
 *      - Instead, TurboRepo allows you to define tasks in your monorepo that
 *        call other tools (which are the actual build system) to perform
 *        these actions.
 *      - These tools can include anything from tsc, vite, etc.
 * 
 *        # Without Turborepo:
 *          - cd apps/frontend && npm run build  # Takes 30 seconds
 *          - cd apps/backend && npm run build   # Takes 20 seconds
 *          - Total: 50 seconds
 *      
 *        # With Turborepo:
 *          - turbo run build
 *          - Runs in parallel, caches results
 *          - Total: 30 seconds (much faster!)
 * 
 *    > We can use build orchestrator on top of any build system to get more
 *      benefits. And this is a common way to use turborepo.
 * 
 * 3. Monorepo Framework:
 *    > Frameworks that manage multiple packages in one repository.
 *    > This includes dependency management between packages, workspace
 *      configuration.
 *    > Example: package.json with yarn/npm workspaces (simplest)
 *      {
 *        "name": "my-monorepo",
 *        "workspaces": [
 *          "packages/*",
 *          "apps/*"
 *        ]
 *      }
 *    > What it does:
 *      a. Links packages together automatically
 *      b. Manages dependencies across projects
 *      c. Simple and built-in
 *    > How do they work together:
 *      my-monorepo/
 *      ├── turbo.json                 # Turborepo (orchestrator)
 *      ├── package.json               # Yarn workspaces (monorepo framework)
 *      ├── apps/
 *      │   ├── web/
 *      │   │   ├── package.json      # Uses Next.js (build system)
 *      │   │   └── vite.config.ts    # Vite configuration
 *      │   └── api/
 *      │       ├── package.json      # Uses tsc (build system)
 *      │       └── tsconfig.json
 *      └── packages/
 *          └── shared/
 *              ├── package.json
 *              └── tsconfig.json
 * 
 *    > Complete Flow:
 *      a. Yarn workspaces link apps/web -> packages/shared
 *      b. Turborepo coordinates the build order
 *      c. Next.js/Vite/tsc actually build the code
 * 
 * 
 * Remember:
 * a. Build System: Do the actual work (Vite, Webpack, tsc)
 * b. Monorepo Framework: Manage multiple packages (Workspaces, Lerna, NX)
 * c. Build Orchestrator: Coordinate the work (Turborepo)
*/

/**
 * Turborepo as a Build Orchestrator:
 * > Turborepo is a 'build system orchestrator' who:
 *   a. knows what depends on what
 *   b. Assigns work to the right people at the right time
 *   c. Remembers previous work to avoid duplication
 *   d. Makes sure everything finishes as fast as possible
 * 
 * > The key feature of TurboRepo is its ability to manage and optimize the
 *   execution of these tasks across your monorepo. It does this through:
 *   1. Caching: TurboRepo caches the outputs of the tasks, so if you run
 *      a task and then run it again without changing any of the inputs
 *      (source files, dependencies, configuration), TurboRepo can skip the
 *      actual execution and provide the output from the cache. This can
 *      significantly speed up build times, especially in continuous
 *      integration environments.
 * 
 *      Example: turbo.json
 *      {
 *        "pipeline": {
 *          "build": {
 *            "outputs": ["dist/**", ".next/**"]  => What to cache
 *          },
 *          "test": {
 *            "outputs": []  => Don't cache test results
 *          }
 *        }
 *      }
 * 
 *      # First build - does all the work
 *        - turbo run build
 *          ✅ Builds frontend (30 seconds)
 *          ✅ Builds backend (20 seconds)  
 *          ✅ Creates cache files
 *      
 *      # Second build - uses cache for unchanged code
 *        - turbo run build
 *          ⚡ Frontend: Cache hit! (0.5 seconds)
 *          ⚡ Backend: Cache hit! (0.5 seconds)
 *          Total: 1 second instead of 50 seconds!
 * 
 *   2. Parallelization: It can run independent tasks in parallel, making
 *      efficient use of your machine's resources. This reduces the overall
 *      time needed to complete all tasks in your project.
 * 
 *      # Without Turborepo:
 *        - cd apps/frontend && npm run build  # ⏳ 30 seconds
 *        - cd apps/backend && npm run build   # ⏳ 20 seconds  
 *        - cd apps/mobile && npm run build    # ⏳ 25 seconds
 *        - Total: 75 seconds (one after another)
 *      
 *      # With Turborepo:
 *        - turbo run build
 *          🎯 All three run simultaneously!
 *          Total: 30 seconds (only as long as the slowest one)
 * 
 *   3. Dependency Graph Awareness: TurboRepo understands the dependency 
 *      graph of the monorepo. This means it knows which packages depend on
 *      each other and can ensure tasks are run in correct order.
 * 
 *      Example: turbo.json
 *      {
 *        "pipeline": {
 *          "build": {
 *          "dependsOn": ["^build"]  => Magic symbol!
 *          },
 *          "dev": {
 *          "dependsOn": []  => No dependencies for dev
 *          }
 *        }
 *      }
 * 
 *      What ^build means?
 *      > Project structure:
 *        my-monorepo/
 *        ├── packages/
 *        │   └── shared/     # ← This must build FIRST
 *        └── apps/
 *            ├── web/        # ← Depends on shared
 *            └── admin/      # ← Depends on shared
 *        
 *      > With ^build:
 *        - turbo run build
 *          1. First: builds shared package
 *          2. Then: builds web AND admin IN PARALLEL
 * 
 * Note: Turborepo turns your monorepo from a 'slow, complicated build system'
 *       into 'fast, efficient development machine!'. 
*/

/**
 * Let's initialize a simple Turborepo project:
 * 1. Initialize a Turborepo: npx create-turbo@latest
 * 2. Select 'npm workspaces' as the monorepo framework
 *    > If it is taking a long time for you, you can close this starter
 *      from https://github.com/100xdevs-cohort-2/week-16-1 and run
 *      npm install inside the root folder
 *    > By the end, you will notice a folder structure that looks like this:
 *      week-16-1/
 *      ├── apps/          # Application (frontend, backend, etc.)
 *      │   ├── docs/ 
 *      │   └── web/ 
 *      ├── packages/      # Library Packages 
 *      │   ├── eslint-config/
 *      │   └── typescript-config/
 *      │   └── ui/
 *      ├── turbo.json     # Turborepo configuration
 *      └── package.json   # Npm workspaces configuration
 *    > These are the default folders that Turborepo creates for you.
 *      
 * Note: A package is something which can be shared between applications
 *       and cannot run independently.
 *       For eg: eslint-config, typescript-config, ui, etc.
*/

/**
 * Explaining the Folder Structure:
 * > simple-monorepo/
 *   ├── package.json          # Root: Manages the whole monorepo
 *   ├── apps/                 # End User Apps (websites/core backend, etc)
 *   │   ├── docs/               > Documentation Website for all projects docs
 *   │   └── web/                > Web Application: Next.js website
 *   └── packages/             # Helper packages 
 *       └── ui/                 > Shareable UI components
 *       └── typescript-config/  > Shareable TS Configuration
 *       └── eslint-config/      > Shareable ESLint Configuration
 * 
 * Note: docs & web application, both are using all the three packages:
 *       ui, typescript-config, eslint-config.
*/

/**
 * Let's try to run the project:
 * > In the root folder, run: npm run dev
 * > You will notice two websites running on:
 *   a. localhost:3000
 *   b. localhost:3001
 * > This means we have a single 'repo' which has multiple projects which
 *   share code from packages/ui
*/

/**
 * Exploring root package.json:
 * > Monorepo = One folder, multiple projects, shared code
 *   a. Root: The controller that runs everything 
 *      {
 *        "scripts": {
 *          "dev": "turbo dev"     // Controls process
 *          "build": "turbo build" // Controls process
 *        },
 *        "devDependencies": {
 *          "turbo": "^2.4.2",        // Build coordinator
 *          "typescript": "^5.0.0"    // Development tool
 *        }
 *      }
 *      > Here, 'turbo build' is not a build command, but a build
 *        orchestrator command that will build all the apps in parallel.
 *      > turbo build goes into all packages and apps and runs npm run build
 *        inside them (provided they have it in their package.json and it
 *        will run build command if it exists i.e. build: "next build" etc.).
 * 
 *  b. Starting Development: 
 *     > Root calls 'turbo dev'
 *     > Turbo starts all apps in parallel
 *       - apps/web starts on port 3000
 *       - apps/docs starts on port 3001
 *     > All apps can use code from packages/
 * 
 *  c. Building for Production:
 *     > Root calls 'turbo build'
 *     > Turbo builds packages/ first (shared code)
 *     > Then builds all apps that need that shared code
 *     > Outputs ready-to-deploy files for each app:
 *       - apps/web/dist
 *       - apps/docs/dist
*/

/**
 * Exploring packages/ui:
 * 1. Packages: Helps multiple apps share code like:
 *    - eslint-config                 : Use to lint/format the code
 *    - typescript-config             : Use to compile the code
 *    - common ui in multiple apps    : Used by both frontend and backend
 *    - shared utils in multiple apps : Used by both frontend and backend
 * 
 *   {
 *     "name": "@repo/ui",         # Name of package (e.g. @100x/ui)
 *   }
 * 
*/

/** 
 * Flow of a Monorepo:

 *   2. File Relationships:

 *      b. Apps: 
 *         - Your actual products (website, admin, mobile)
 *         - Ex: Apps/web/package.json: Web Application
 *               {
 *                 "name": "web",
 *                 "dependencies": {
 *                   "react": "^18.2.0",         => What the app needs
 *                   "@shared/ui": "workspace:*" => Local Shared package
 *               }
 *               "scripts": {
 *                 "dev": "next dev",           => How to run this app in dev
 *                 "build": "next build",       => How to build this app
 *               }
 *         
 *         Ex: Package package.json: Shared Code
 *             {
 *               "name": "shared-ui",       // Name of the package
 *               "main": "./index.ts",      // Entry point
 *               "types": "./index.ts"      // TypeScript definitions
 *             }
 * 
 * By following this folder structure, you can easily share common code 
 * between multiple frontend and backend projects. And that is why we use
 * monorepo.
*/