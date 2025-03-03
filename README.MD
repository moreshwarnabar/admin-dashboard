# Admin Dashboard

This project is an admin dashboard built with Refine, a React framework for building internal tools, admin panels, dashboards, and B2B applications. It leverages NestJS Query for data fetching and Ant Design for the UI.

## Features

-   **Dashboard:** Provides an overview of key metrics, upcoming events, and recent activities.
-   **Company Management:** CRUD operations for managing companies, including listing, creating, and editing company details and associated contacts.
-   **Task Management:** Kanban board for managing tasks, including creating, assigning, and tracking tasks through different stages.
-   **User Authentication:** Secure login, registration, and password recovery functionality.
-   **Account Settings:** Allows users to manage their account information.
-   **GraphQL API Integration:** Utilizes GraphQL queries and mutations for efficient data fetching and manipulation.
-   **Real-time Updates:** Leverages GraphQL subscriptions for real-time data updates on the dashboard and task board.

## Technologies Used

-   **Refine:** A React framework for building admin panels and B2B apps.
-   **React:** A JavaScript library for building user interfaces.
-   **Ant Design:** A React UI library.
-   **NestJS Query:** Data provider for Refine, allowing seamless integration with NestJS-based APIs.
-   **GraphQL:** A query language for your API.
-   **TypeScript:** A typed superset of JavaScript.
-   **Vite:** A build tool that provides a fast and optimized development experience.
-   **graphql-codegen:** Generates TypeScript types from GraphQL schema.
-   **dnd-kit:** A toolkit for building drag-and-drop interfaces.
-   **graphql-ws:** A GraphQL WebSocket client.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn package manager

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd moreshwarnabar-admin-dashboard
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install
    ```

### Development

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev
    ```

    This command will start the application in development mode with hot-reloading.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

1.  Build the application for production:

    ```bash
    npm run build # or yarn build
    ```

    This command will create an optimized build of the application in the `dist` directory.

### Running in Production

1.  Serve the production build:

    ```bash
    npm run preview # or yarn preview or refine start
    ```

    This command will start a production server that serves the static files from the `dist` directory.

### Docker

This project includes a `Dockerfile` for containerization using Docker.

1.  Build the Docker image:

    ```bash
    docker build -t moreshwarnabar-admin-dashboard .
    ```

2.  Run the Docker container:

    ```bash
    docker run -p 3000:3000 moreshwarnabar-admin-dashboard
    ```

    The application will be accessible at `http://localhost:3000`.

## Configuration

-   **GraphQL Endpoint:** The GraphQL API endpoint is configured in `src/providers/data/index.tsx`.
-   **Authentication:** Authentication logic is implemented in `src/providers/auth.ts`.  Demo credentials are provided for ease of testing.
-   **Refine Resources:** Resource configurations are defined in `src/config/resources.tsx`.

## GraphQL Code Generation

This project uses `graphql-codegen` to generate TypeScript types from the GraphQL schema.

-   To generate types, run:

    ```bash
    npm run codegen # or yarn codegen
    ```

    This command will generate types in `src/graphql/schema.types.ts` and `src/graphql/types.ts`.  Ensure your GraphQL schema URL is properly configured in `graphql.config.ts`.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License

MIT
