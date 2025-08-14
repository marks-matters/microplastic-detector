---
description: File Organization and Structure Standards
globs: 
alwaysApply: false
---
# File Organization and Structure Standards

Enforceable rules for file organization, naming, and project structure.

<rule>
name: file_organization_standards
description: Enforce file organization and structure standards
filters:
  # Match all files for organization checks
  - type: file_extension
    pattern: ".*"
  # Match file creation events
  - type: event
    pattern: "file_create"

actions:
  - type: suggest
    message: |
      File Organization Guidelines:

      1. **File Naming**:
         - Use kebab-case for all file names
         - Use descriptive names that indicate purpose
         - Avoid generic names like "file.js" or "data.json"
         - Use consistent naming across the project

      2. **Directory Structure**:
         - Use snake_case for directory names
         - Keep related files together in appropriate directories
         - Separate concerns: UI components, business logic, data models, utilities
         - Group files by feature or functionality

      3. **Project Organization**:
         - Follow established project structure patterns
         - Place configuration files in appropriate locations
         - Organize documentation in dedicated directories
         - Keep build artifacts separate from source code

      4. **File Placement**:
         - Place components in component directories
         - Keep utilities in utility directories
         - Organize tests alongside source files or in test directories
         - Maintain clear separation between different types of files

examples:
  - input: |
      # Bad: Poor file organization
      src/
      ├── file1.js
      ├── file2.js
      ├── data.json
      └── utils.js

      # Good: Well-organized structure
      src/
      ├── components/
      │   ├── user-profile.jsx
      │   └── navigation-bar.jsx
      ├── utils/
      │   ├── date-helpers.js
      │   └── validation-helpers.js
      ├── data/
      │   └── user-config.json
      └── services/
          └── api-client.js
    output: "Organize files into logical directories with descriptive names"

metadata:
  priority: high
  version: 1.0
</rule>
