# Documentation Standards Rules

This directory contains automated rules for maintaining documentation consistency and project organization standards.

## Rule Files

### Core Organization Rules
- **`file-organization.mdc`**: File naming conventions, directory structure standards, and project organization guidelines
- **`documentation-triggers.mdc`**: Broad triggers for documentation updates when workspace changes occur
- **`readme-consistency.mdc`**: Specific rules for keeping README.md accurate with project structure
- **`ai-instructions-consistency.mdc`**: Rules for maintaining AI guidance consistency with code changes
- **`documentation-meta-update.mdc`**: Meta-rules for updating documentation standards themselves

## How These Rules Work

1. **Automatic Detection**: Rules monitor file changes across the workspace using pattern matching
2. **Smart Suggestions**: When relevant changes are detected, the system suggests specific documentation updates
3. **Priority-Based**: Different types of changes have appropriate priority levels (high for API changes, medium for meta-changes)
4. **Comprehensive Coverage**: Rules cover API changes, dependencies, structure changes, tests, and meta-documentation

## Rule Categories

### File Organization (`file-organization.mdc`)
- Enforces consistent file naming (kebab-case)
- Directory structure standards (snake_case)
- Logical file placement and organization

### Documentation Maintenance
- **`documentation-triggers.mdc`**: General documentation update triggers
- **`readme-consistency.mdc`**: README-specific consistency checks
- **`ai-instructions-consistency.mdc`**: AI guidance accuracy maintenance
- **`documentation-meta-update.mdc`**: Self-referential rule updates

## Integration Points

These rules are referenced in:
- `README.md` - Contributing and Documentation sections
- `.github/instructions/microplastic-detector.instructions.md` - Documentation synchronization section
- Project development workflows and CI/CD processes

## Adding New Rules

When adding new rules:
1. Create a new `.mdc` file with descriptive name
2. Follow the established pattern format
3. Update this README to document the new rule
4. Test the rule with relevant file changes
5. Update references in main documentation files
