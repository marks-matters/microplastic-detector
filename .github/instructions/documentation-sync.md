---
description: Documentation maintenance procedures and synchronization requirements
applyTo: "**"
---

# Documentation Synchronization

Purpose: Ensure documentation stays accurate and synchronized when the codebase changes.

## Files to Keep Synchronized

### Primary Documentation
- **`README.md`**: User-facing documentation with API signatures, setup instructions, and examples
- **`.github/instructions/`**: AI guidance files with contracts, workflows, and technical details
- **`.cursor/rules/`**: Automated documentation maintenance rules and triggers

### Secondary Documentation
- **`app/guidelines/Guidelines.md`**: Frontend-specific development guidelines
- **`protocols/microplastics-detection-protocol.md`**: Scientific methodology documentation
- **Inline code comments**: Function documentation and algorithm explanations

## Critical Update Triggers

### 🔴 High Priority (Update Immediately)
**Function signature changes** in core modules:
- `software/analyze_microplastics.py`
- `software/capture_image.py`
- `software/main.py`

**Actions Required:**
1. Update README code examples
2. Update API contracts in `.github/instructions/api-contracts.md`
3. Update development workflows if command usage changes
4. Verify test documentation matches new signatures

### 🟡 Medium Priority (Update Within Sprint)
**New dependencies** in:
- `software/requirements.txt`
- `app/package.json`

**Actions Required:**
1. Update setup instructions in README
2. Update environment setup documentation
3. Check platform-specific installation notes

**New features or modules:**
**Actions Required:**
1. Document in README usage section
2. Update AI workflows in `.github/instructions/`
3. Add to architecture overview if significant

### 🟢 Low Priority (Update When Convenient)
**Directory structure changes:**
**Actions Required:**
1. Update README structure listing
2. Update file pointers in AI instructions
3. Update .cursor/rules file patterns

**Test structure changes:**
**Actions Required:**
1. Update testing documentation in README
2. Update development workflows
3. Verify test file references in AI instructions

## Synchronization Checklist

### For API Changes
- [ ] Update function signature in README examples
- [ ] Update parameter tables and descriptions
- [ ] Update return value documentation
- [ ] Update API contracts section in AI instructions
- [ ] Update error handling documentation
- [ ] Verify validation rules are documented
- [ ] Update test documentation if test patterns change

### For New Dependencies
- [ ] Update installation instructions in README
- [ ] Update requirements sections
- [ ] Add platform-specific notes if needed
- [ ] Update environment setup documentation
- [ ] Check for conflicts with existing dependencies
- [ ] Update Docker/container configurations if applicable

### For Workflow Changes
- [ ] Update development command examples
- [ ] Update testing procedures
- [ ] Update AI development workflows section
- [ ] Verify script examples still work
- [ ] Update troubleshooting guides

### For File Structure Changes
- [ ] Update directory tree in README
- [ ] Update file pointers in AI instructions
- [ ] Update import examples
- [ ] Update .cursor/rules patterns
- [ ] Check relative path references

## Documentation Standards

### Code Examples
- Always use current, working examples
- Include expected output when helpful
- Show error cases and handling
- Use consistent formatting and style

### Cross-References
- Link between related documentation sections
- Maintain consistent terminology
- Update all references when renaming components
- Verify links are not broken

### Version Compatibility
- Note Python version requirements
- Document platform-specific differences
- Update compatibility matrices
- Test instructions on supported platforms

## Automation

### .cursor/rules Integration
The `.cursor/rules/` directory contains automated triggers for:
- API signature changes
- Dependency updates
- File structure modifications
- Documentation consistency checks

### Validation Scripts
Consider implementing:
```bash
# Check documentation consistency
./scripts/validate-docs.sh

# Test all code examples in documentation
./scripts/test-examples.sh

# Verify cross-references
./scripts/check-links.sh
```

## Review Process

### Before Committing
1. Review all documentation affected by code changes
2. Test code examples in documentation
3. Verify cross-references are accurate
4. Check for outdated screenshots or diagrams

### Pull Request Checklist
- [ ] Documentation updated for code changes
- [ ] Examples tested and working
- [ ] Cross-references verified
- [ ] Terminology consistent across files
- [ ] No broken links or references
