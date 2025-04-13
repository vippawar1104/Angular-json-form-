# Angular JSON Forms Project

A dynamic form-building application using Angular, JSON Forms, and Tailwind CSS.

## Features

- Dynamic form generation using jsonforms.io library
- Custom form renderers
- Responsive design for mobile and desktop
- Real-time form validation
- Interactive form elements
- Dark mode support
- Custom styling with Tailwind CSS
- Employee data management
- Skills tracking
- Employment details management

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v15 or higher)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd angular-json-forms-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# Terminal 1: Start Tailwind CSS build process
npm run tailwind:build

# Terminal 2: Start Angular development server
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── custom.autocomplete.ts    # Custom autocomplete renderer
│   │   ├── data.control.ts           # Data display component
│   │   └── lang.control.ts           # Language selector component
│   ├── schema.ts                     # Form schema definition
│   ├── uischema.ts                   # UI layout configuration
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.css
├── assets/
└── styles.css                        # Global styles
```

## JSON Structure

### Schema Configuration
The form structure is defined in `schema.ts`. Example:

```typescript
export const employeeSchema = {
  type: "object",
  properties: {
    personalInfo: {
      type: "object",
      properties: {
        firstName: { type: "string", minLength: 2 },
        lastName: { type: "string", minLength: 2 },
        email: { type: "string", format: "email" },
        phone: { type: "string", pattern: "^\\+?[1-9]\\d{1,14}$" }
      },
      required: ["firstName", "lastName", "email", "phone"]
    },
    employmentDetails: {
      type: "object",
      properties: {
        position: { type: "string", enum: ["Developer", "Designer", "Manager"] },
        department: { type: "string", enum: ["IT", "HR", "Finance"] },
        employeeId: { type: "string", pattern: "^EMP\\d{4}$" },
        startDate: { type: "string", format: "date" },
        salary: { type: "number", minimum: 0 }
      },
      required: ["position", "department", "startDate"]
    },
    skills: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          level: { type: "string", enum: ["Beginner", "Intermediate", "Advanced"] },
          yearsOfExperience: { type: "number", minimum: 0 }
        },
        required: ["name", "level"]
      }
    }
  },
  required: ["personalInfo", "employmentDetails", "skills"]
};
```

### UI Schema Configuration
The UI layout is defined in `uischema.ts`. Example:

```typescript
export const employeeUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Group",
      label: "Personal Information",
      elements: [
        {
          type: "HorizontalLayout",
          elements: [
            { type: "Control", scope: "#/properties/personalInfo/properties/firstName" },
            { type: "Control", scope: "#/properties/personalInfo/properties/lastName" }
          ]
        },
        { type: "Control", scope: "#/properties/personalInfo/properties/email" },
        { type: "Control", scope: "#/properties/personalInfo/properties/phone" }
      ]
    },
    {
      type: "Group",
      label: "Employment Details",
      elements: [
        { type: "Control", scope: "#/properties/employmentDetails/properties/position" },
        { type: "Control", scope: "#/properties/employmentDetails/properties/department" },
        { type: "Control", scope: "#/properties/employmentDetails/properties/employeeId" },
        { type: "Control", scope: "#/properties/employmentDetails/properties/startDate" },
        { type: "Control", scope: "#/properties/employmentDetails/properties/salary" }
      ]
    },
    {
      type: "Group",
      label: "Skills",
      elements: [
        {
          type: "Control",
          scope: "#/properties/skills",
          options: {
            detail: {
              type: "VerticalLayout",
              elements: [
                { type: "Control", scope: "#/properties/name" },
                { type: "Control", scope: "#/properties/level" },
                { type: "Control", scope: "#/properties/yearsOfExperience" }
              ]
            }
          }
        }
      ]
    }
  ]
};
```

## Custom Renderers

The application includes custom renderers for:
- Autocomplete fields
- Data display components
- Language selection controls

## Form Validations

- Required field validation
- Email format validation
- Date range validation
- Custom pattern validation for IDs
- Length restrictions for text fields
- Numeric range validation

## Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible layouts using Tailwind CSS
- Proper spacing and alignment
- Touch-friendly inputs
- Readable text at all screen sizes

## Assumptions

1. The application requires modern browser support
2. Users have basic form interaction knowledge
3. Form data is handled client-side
4. Internet connection is required for fonts and icons

## Future Improvements

1. Add form data persistence
2. Implement more custom renderers
3. Add form submission handling
4. Enhance accessibility features
5. Add unit and e2e tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
