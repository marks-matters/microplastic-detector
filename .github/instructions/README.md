# Microplastic Detector AI Instructions

This directory contains modular AI instruction files for the microplastic detector project. Each file focuses on a specific aspect of the project to help AI agents work effectively with the codebase.

## Instruction Files

```
.github/instructions/
├── README.md                           # This file
├── architecture-overview.md           # Big picture architecture and workflow
├── api-contracts.md                   # Critical API contracts that must not be broken
├── development-workflows.md           # Development commands and testing procedures
├── coding-conventions.md              # Code style and organizational patterns
├── environment-setup.md               # Platform-specific setup and dependencies
├── frontend-guidelines.md             # React/Vite app specific guidance
├── documentation-sync.md              # Documentation maintenance procedures
└── file-pointers.md                   # Quick reference to key files and directories
```

## How to Use These Instructions

Each file is designed to be:
- **Focused**: Covers one specific aspect of the project
- **Self-contained**: Can be understood independently
- **Actionable**: Provides concrete guidance for AI agents
- **Maintainable**: Easy to update when the project evolves

## Integration

These instructions work together with:
- `.cursor/rules/` - Automated documentation maintenance rules
- `README.md` - User-facing project documentation
- Project structure and conventions

## Maintenance

When updating the project:
1. Update relevant instruction files
2. Check cross-references between files
3. Ensure consistency with main README.md
4. Update this overview if the file structure changes
