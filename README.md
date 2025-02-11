# Second Brain App

Second Brain App is a web application designed to store and organize important links that you want to keep for future use. 
Whether it's a YouTube video, a Twitter post, or any other valuable content, this app acts as your personal digital memory,
ensuring that you can easily access and manage your saved links anytime. Built with modern web technologies,
it provides a seamless and responsive user experience.

## Features

- **Responsive Design**: Optimized for all screen sizes, from mobile to desktop.
- **Content Collection**: Add and store YouTube and Twitter content in your personal brainspace.
- **Share Brain**: Share your curated brainspace with others.
- **User Authentication**: Sign up and sign in to access your personalized brainspace.
- **Content Filtering**: View content categorized by type (YouTube, Twitter, or all).

## Key Components

- **Brainspace.tsx**: Handles the main content view, displays content based on the selected category, and provides modals for adding new content and sharing the brainspace.
- **Button.tsx**: A reusable button component with support for icons and customizable styles.
- **Card.tsx**: Displays individual content items (YouTube videos or Twitter embeds) and includes actions like sharing and deleting content.
- **CreateContentModal.tsx**: Modal for adding new content to the brainspace.
- **ShareWindow.tsx**: Modal for sharing the brainspace.
- **Sidebar.tsx**: Navigation sidebar to filter content by type.
- **Auth.tsx**: Handles user sign-up and sign-in functionality.
- **Dashboard.tsx**: Main layout component combining the sidebar and the brainspace.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sachin904/Second-Brain-App.git
   ```

2. **Navigate to the Frontend Directory**
   ```bash
   cd Second-Brain-App/Second-Brain-FE
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:5173` in your browser.

## Usage

- **Sign Up or Sign In**: Create an account or log in to access your brainspace.
- **Add Content**: Use the "Add Content" button to store YouTube or Twitter links in your brainspace.
- **View Content**: Browse through your content categorized by YouTube, Twitter, or all.
- **Share Brain**: Click "Share Brain" to generate a shareable link to your brainspace.
- **Delete Content**: Remove unwanted items from your brainspace.

## Technologies

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: [Specify backend technologies if available]
- **State Management**: [Specify state management tools if used]
- **API Communication**: Axios

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.



