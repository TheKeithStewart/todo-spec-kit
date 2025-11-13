<!--
Sync Impact Report:
Version: 1.0.0 (Initial constitution)
Date: 2025-11-13

ADDED SECTIONS:
- Core Principles (5 principles)
  1. Cross-Platform First
  2. Test-Driven Development with Playwright
  3. Design System & Component Library
  4. Documentation First
  5. Responsive Design
- Quality Standards (Testing & Documentation Requirements)
- Development Workflow (Feature Development Process, Code Review, Complexity Justification)
- Governance (Amendment Process, Version Control, Compliance)

TEMPLATES UPDATED:
✅ plan-template.md
   - Added Constitution Check section with specific gates for all 5 principles
   - Checklist items for cross-platform testing, Playwright tests, design system, documentation, responsive design

✅ spec-template.md
   - Added Cross-Platform Requirements section (CPR-001 through CPR-005)
   - Added Design System Requirements section (DSR-001 through DSR-004)
   - Added Documentation Requirements section (DOC-001 through DOC-004)
   - Added Testing Success Criteria section (TSC-001 through TSC-004)

✅ tasks-template.md
   - Changed tests from OPTIONAL to MANDATORY per constitution
   - Added Playwright E2E test tasks for desktop (1920x1080), tablet (768x1024), mobile (375x667) viewports
   - Added design system component tasks
   - Added responsive design verification tasks
   - Added component documentation tasks
   - Updated task IDs to accommodate additional testing requirements

✅ Command files (.claude/commands/*.md)
   - No agent-specific references found
   - No updates required

FOLLOW-UP ACTIONS:
- Establish design system foundation (colors, typography, spacing tokens) in first feature
- Create component documentation template with props, examples, and accessibility guidelines
- Set up Playwright test infrastructure with viewport configurations
- Configure CI/CD pipeline to run Playwright tests on all three viewport sizes
- Create accessibility testing checklist for code reviews
-->

# Todo Spec Kit Constitution

## Core Principles

### I. Cross-Platform First

The application MUST work seamlessly on desktop web, mobile, and tablet devices.

**Rules**:
- Every feature MUST be tested on desktop, mobile, and tablet viewports
- Touch and mouse interactions MUST both be supported
- Performance targets MUST be met across all device types
- Platform-specific issues are blocking bugs

**Rationale**: Users expect consistent experiences across devices. Building cross-platform support from the start prevents costly retrofitting and ensures feature parity.

### II. Test-Driven Development with Playwright (NON-NEGOTIABLE)

All features MUST be tested with Playwright end-to-end tests before implementation is considered complete.

**Rules**:
- Tests MUST be written BEFORE implementation (Red-Green-Refactor)
- Every user story MUST have corresponding Playwright tests
- Tests MUST cover all three platform types: desktop, mobile, and tablet viewports
- Tests MUST pass on all platforms before code review
- Integration and contract tests are encouraged but Playwright E2E tests are mandatory

**Rationale**: Playwright tests validate real user workflows across devices. Test-first development catches integration issues early and serves as living documentation. Cross-platform testing prevents device-specific regressions.

### III. Design System & Component Library

All UI elements MUST come from a documented, reusable component library based on a design system.

**Rules**:
- Design system MUST define colors, typography, spacing, and interaction patterns
- Components MUST be self-contained, independently testable, and documented
- New UI elements MUST reuse existing components; new components require justification
- Component API changes MUST follow semantic versioning
- Each component MUST include usage examples and accessibility guidelines

**Rationale**: A design system ensures consistency, speeds development, and simplifies maintenance. Component reuse reduces code duplication and makes testing more effective.

### IV. Documentation First

Every feature, component, and API MUST be documented before implementation begins.

**Rules**:
- Features MUST have specifications (spec.md) defining user stories and requirements
- Components MUST have usage documentation with examples
- APIs MUST have contract documentation with request/response examples
- README and quickstart guides MUST be updated for new functionality
- Documentation MUST be reviewed alongside code

**Rationale**: Documentation clarifies intent, reduces miscommunication, and makes onboarding faster. Writing documentation first forces clear thinking about design decisions.

### V. Responsive Design

All interfaces MUST adapt gracefully to different screen sizes and orientations.

**Rules**:
- Layouts MUST use responsive design patterns (fluid grids, flexible images, media queries)
- Touch targets MUST meet minimum size requirements (44x44px) on touch devices
- Text MUST be readable without zooming on mobile devices
- Navigation MUST adapt appropriately for mobile (e.g., hamburger menus, bottom navigation)
- Responsive behavior MUST be tested in Playwright across viewport sizes

**Rationale**: Responsive design is foundational to cross-platform support. Fixed layouts create poor mobile experiences and increase maintenance burden.

## Quality Standards

### Testing Requirements

**Coverage Mandates**:
- **Playwright E2E tests**: Required for all user stories
  - Desktop viewport (1920x1080 or 1280x720)
  - Tablet viewport (768x1024)
  - Mobile viewport (375x667 or 390x844)
- **Component tests**: Required for all design system components
- **Integration tests**: Required for API contracts and service interactions
- **Unit tests**: Encouraged for complex business logic

**Test Quality**:
- Tests MUST be deterministic (no flaky tests allowed in main branch)
- Tests MUST run in CI/CD pipeline
- Tests MUST use accessibility checks (ARIA roles, semantic HTML)
- Tests MUST validate error states and edge cases

### Documentation Requirements

**Mandatory Documentation**:
- `/specs/[feature]/spec.md` - User stories, requirements, success criteria
- `/specs/[feature]/plan.md` - Technical approach, architecture decisions
- Component README files with props, usage examples, and accessibility notes
- API contract documents for backend endpoints

**Documentation Quality**:
- Code examples MUST be executable and tested
- Diagrams encouraged for complex workflows or architectures
- Breaking changes MUST be documented in CHANGELOG

## Development Workflow

### Feature Development Process

1. **Specification**: Create spec.md with prioritized user stories
2. **Planning**: Generate plan.md with architecture decisions and constitution compliance check
3. **Design System Check**: Identify needed components; document new components
4. **Test Writing**: Write Playwright tests for all user stories (Red phase)
5. **Implementation**: Build feature to pass tests (Green phase)
6. **Refactoring**: Optimize and document (Refactor phase)
7. **Review**: Code review includes code, tests, and documentation
8. **Cross-Platform Validation**: Verify on desktop, tablet, mobile before merge

### Code Review Requirements

All pull requests MUST include:
- Passing Playwright tests on all three platform types
- Updated/new documentation
- Design system compliance verification
- No accessibility violations
- Performance benchmarks if applicable

### Complexity Justification

Any deviation from these principles MUST be documented in plan.md with:
- What principle is being violated
- Why the violation is necessary
- What simpler alternatives were considered and rejected

## Governance

### Amendment Process

Constitution amendments require:
1. Proposal document outlining changes and rationale
2. Review by project maintainers
3. Documentation of migration plan for existing features
4. Update of version number per semantic versioning rules

### Version Control

**MAJOR** (X.0.0): Backward incompatible changes (removing principles, changing mandatory requirements)
**MINOR** (x.Y.0): New principles, expanded guidance, new mandatory sections
**PATCH** (x.y.Z): Clarifications, typo fixes, non-semantic improvements

### Compliance

- All pull requests MUST verify constitution compliance in plan.md
- Quarterly audits should review adherence to principles
- Violations must be tracked and remediated or justified

### Runtime Guidance

For day-to-day development guidance (tool usage, code style, debugging tips), refer to project-specific guides in `/docs` or `.claude/` directories. This constitution defines **what** principles govern the project; runtime guides explain **how** to follow them.

**Version**: 1.0.0 | **Ratified**: 2025-11-13 | **Last Amended**: 2025-11-13
