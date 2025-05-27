# ExamPaper - Exam Generation Platform

A modern web application for educators to create, manage, and generate customized exam papers with an intuitive user interface.

## Features

- **Question Bank Management**: Create and organize questions by subject, topic, and difficulty
- **Custom Paper Generation**: Generate exam papers based on specific criteria and requirements
- **Template System**: Save and reuse paper templates for consistent formatting
- **Preview & Export**: Preview papers before generation and export in multiple formats
- **Responsive Design**: Works seamlessly across desktop and tablet devices

## Pages

1. **Home**: Overview of the platform features and quick access to paper generation
2. **Question Bank**: Interface for managing and organizing exam questions
3. **Generate Paper**: Wizard for creating customized exam papers
4. **Papers**: Library of previously generated papers
5. **Not Found**: Custom 404 page

## Tech Stack

- React 18+
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Vite for development and building

## Getting Started

```bash
# Clone the repository
git clone https://github.com/nish340/examPaperGenrator.git
# Navigate to the project directory
cd examPaper

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

- `/src/components`: UI components including navigation and form elements
- `/src/pages`: Main application pages
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions and helpers

## Deployment

Build the application for production:

```bash
npm run build
```

The build output will be in the `dist` directory, ready to be deployed to your preferred hosting service.

## Future Enhancements

- Question import/export functionality
- AI-assisted question generation
- Collaborative editing features
- Student assessment integration

## Author

Nishchay Sharma

## License

MIT
