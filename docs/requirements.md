# BitByBit Academy — Engineering Workspace
## Product Requirements Document (PRD) + UX / Technical Specification
**Version:** 2.0  
**Status:** Working draft aligned to current product direction  
**Owner:** BitByBit Academy  
**Product Type:** Post-login engineering workspace  
**Primary Goal:** Deliver a production-ready workspace that helps students and early-career engineers build real projects, maintain momentum, improve technical identity, and convert work into career signal without overloading the backend or creating LMS-style clutter.

---

# 1. Executive Summary

BitByBit Academy must not behave like a traditional LMS, content feed, or social dashboard. The authenticated product is an **Engineering Workspace**: a focused operational environment where users decide what to build next, work inside project contexts, use practical guides and templates, and improve a professional profile tied to real output.

The experience must feel closer to:
- a premium engineering desktop,
- a calm execution system,
- a technical career operating layer,

than to:
- a course portal,
- a community feed,
- a noisy productivity app.

The guiding product message is:

> "This is where engineers build, organize, improve, and ship."

Every authenticated surface must answer, quickly and clearly:
1. What should I do next?
2. What am I building now?
3. What resources are already available?
4. How does this improve my professional profile?

---

# 2. Product Vision

## 2.1 Vision Statement
Create the most credible engineering workspace for students and early-career builders in Latin America and entirely world (someday): a system that moves users from learning to execution, and from execution to visible professional proof.

## 2.2 Product Thesis
Most educational products optimize for content delivery. BitByBit Academy must optimize for:
- execution,
- technical decision-making,
- project momentum,
- evidence of work,
- profile quality,
- career conversion.

## 2.3 Positioning
BitByBit Academy is not a course marketplace. It is an **engineering execution platform** with educational support built around real output.

## 2.4 Core Promise
After login, the user should immediately understand:
- what is active,
- what to continue,
- what to improve,
- what assets are ready to use,
- what action produces the highest leverage next.

---

# 3. Product Principles

1. **Projects over lessons**  
   Projects are the core object in the product. Knowledge supports execution.

2. **Action over browsing**  
   Workspace surfaces must bias toward doing, not reading.

3. **Signals over self-description**  
   Real work, repos, milestones, consistency, and profile depth matter more than claims.

4. **Momentum over feature volume**  
   Fewer, clearer paths are better than broad but shallow functionality.

5. **Professional identity over gamification**  
   The workspace should strengthen career assets, not manufacture dopamine loops.

6. **Support over noise**  
   Community and guidance must unblock work, not create a social feed.

7. **Premium clarity**  
   The UI must feel calm, serious, minimal, and trustworthy.

8. **Scalable simplicity**  
   Early architecture must support growth to thousands of users without requiring a rewrite of the core domain model.

9. **Graceful degradation**  
   Partial data, incomplete profiles, and missing optional content must never break the UI.

10. **Backend-aware product design**  
    Requirements must fit realistic Firebase/Auth/Firestore constraints, rate limits, and operational complexity.

---

# 4. Target Users

## 4.1 Primary Users
- Engineering students
- CS / software / embedded / IoT learners
- Early-career developers
- Self-taught builders who need structure
- Users building portfolio-worthy technical work

## 4.2 Secondary Users
- Mentors
- Technical reviewers
- Community support members
- Future recruiters or external viewers of public-facing outputs

## 4.3 Core User Motivations
- "I want to build something real."
- "I need structure and direction, not generic motivation."
- "I want work I can show publicly."
- "I want guidance that helps me execute."
- "I want my effort to turn into a stronger technical profile."

---

# 5. Problem Statement

Most education platforms fail post-login because they:
- center passive content,
- provide weak next-step guidance,
- separate learning from output,
- do not convert activity into career assets,
- overload users with flat dashboards and low-signal sections.

The current workspace direction already has strong visual taste and premium UI character. However, the product specification needs stronger operational boundaries in:
- information architecture,
- feature prioritization,
- state logic,
- data design,
- backend load discipline,
- accessibility and UX consistency,
- maintainability at scale.

---

# 6. Product Scope Model

The authenticated product is organized into five product layers.

## 6.1 Identity Layer
Represents who the user is professionally.
- profile completeness
- structured name and account identity
- GitHub-linked identity
- technical headline and bio
- professional assets and proof of work

## 6.2 Execution Layer
The product core.
- projects
- project detail workspaces
- milestones
- templates that start real work
- links to repo / deploy / docs

## 6.3 Knowledge Layer
Practical support for execution.
- guides
- blueprints
- playbooks
- references tied to action

## 6.4 Signal Layer
Converts work into visible value.
- project progress
- project completion
- consistency indicators
- profile depth
- linked technical artifacts

## 6.5 Support Layer
Lightweight human support.
- technical unblock requests
- profile/career feedback entry points
- mentor or community escalation paths

Note:
For the MVP and near-term roadmap, this layer must remain intentionally small and structured. No real-time feed or general-purpose social features are permitted.

---

# 7. Scope and Delivery Strategy

## 7.1 Phase 1: MVP+ (Now)
- Authenticated workspace shell
- Dynamic workspace home
- Profile normalization and profile completion system
- Projects hub
- Project detail page
- Guides hub
- Templates hub
- Lightweight support entry points
- State-based focus engine
- Firebase-backed domain model with strict security rules

## 7.2 Phase 2: Structured Expansion
- Project milestone editing UX
- Guide-to-project linking
- Template-to-project conversion flow
- Better user activity summaries
- Support request tracking
- Public-facing profile outputs

## 7.3 Out of Scope for Current Phase
- General chat
- Group messaging
- large discussion threads
- recruiter portal
- complex multi-role mentor workflows
- real-time collaboration editor
- AI generation of project deliverables
- warehouse-scale analytics stack

---

# 8. Product Goals

## 8.1 Primary Goals
- Increase clarity after login
- Increase meaningful project starts
- Increase return-to-work behavior
- Improve profile completion and quality
- Make guides and templates operational
- Create a premium, credible engineering-product feel

## 8.2 Success Metrics
- Percentage of new users who complete profile normalization
- Percentage of users who create a first project within the first 7 days
- Percentage of returning users who resume an existing active project
- Guide open-to-action conversion rate
- Template-to-project conversion rate
- Project completion rate
- Weekly active authenticated users
- Support request initiation rate for blocked users
- Error-free workspace session rate

## 8.3 Guardrail Metrics
- Firestore reads per active session
- Firestore writes per active session
- Auth errors by provider
- Failed page states after login
- Support entry points opened without resolution path
- Largest contentful paint and interaction responsiveness on workspace entry

---

# 9. Functional Requirements

---

## 9.1 Authentication and Entry

### FR-001: Authenticated Redirect
After successful login or registration, the user must be redirected to the localized workspace route.

Canonical route pattern:
- `/plataforma`
- `/{lang}/plataforma`

The product must not assume `/workspace` unless routing is later standardized.

### FR-002: Session Persistence
The system must preserve authenticated state across reloads and normal browser restarts according to Firebase Auth session behavior.

### FR-003: Verified Email Handling
If the selected auth flow requires verified email before full workspace access, the product must:
- clearly explain the state,
- support resend,
- preserve access to the verification flow,
- avoid dead-end screens.

### FR-004: Provider Linking
If a user attempts to sign in with a social provider for an email already registered with another method, the system must provide a recoverable linking path rather than failing silently.

### FR-005: First-Run Awareness
If the user has no projects and an incomplete profile, the initial workspace state must prioritize setup and first action instead of showing generic dashboard content.

---

## 9.2 Workspace Home

### FR-010: Dynamic Home
The workspace home must render from user state, not from static marketing sections alone.

### FR-011: Hero Context Block
The home view must include:
- a personalized title,
- current state label,
- one primary CTA,
- one secondary CTA,
- one short contextual explanation.

### FR-012: Focus Engine
The home page must compute the next best action from current user state.

Priority order for MVP:
1. Required verification gate
2. Required profile completion gate
3. Continue active project
4. Start first project
5. Explore relevant guide or template

### FR-013: Quick Actions
The home page must expose actionable shortcuts, such as:
- continue project
- open guide
- open template
- improve profile
- request support

### FR-014: Snapshot Block
The home page must display concise real data only. Suggested metrics:
- projects count
- guides count
- templates count
- profile completion
- last active status

### FR-015: No Decorative-Only Sections
Authenticated sections must serve one of three purposes:
- action,
- state summary,
- navigation into a deeper workflow.

Conceptual copy is allowed only when it clarifies an operational decision.

---

## 9.3 Projects Hub

### FR-020: Projects List
The system must support a user-scoped projects list showing:
- title
- short description
- status
- stack tags
- last updated date
- optional repo indicator

### FR-021: Project CRUD
Users must be able to:
- create a project
- update project metadata
- archive a project

Hard delete should not be exposed in the MVP UI. Archive is the preferred operational pattern.

### FR-022: Project Status Model
Allowed statuses:
- `draft`
- `active`
- `paused`
- `completed`
- `archived`

The status model must remain small and semantically clear.

### FR-023: Filter and Search
Users must be able to filter by:
- status
- category
- recency

Stack search is optional for MVP and should be added only if indexing/query cost remains acceptable.

### FR-024: Project Creation Modes
Users must be able to create a project:
- from scratch
- from a template

### FR-025: Single Active Focus Rule
The system may allow multiple active projects in storage, but the UX should highlight one **primary active project** for focus. The home experience must not encourage fragmented parallel work.

---

## 9.4 Project Detail Workspace

### FR-030: Project Detail Route
Each project must have a stable route under the localized project namespace.

Recommended route pattern:
- `/proyectos/:id`
- `/{lang}/proyectos/:id`

If the English route family is introduced later, route translation must preserve stable IDs and canonical linking behavior.

### FR-031: Project Overview
A project detail page must support:
- title
- description
- category
- stack
- status
- goals
- links to repo / deploy / docs
- created date
- updated date

### FR-032: Milestone Support
Projects must support milestone-based progress.

For MVP, milestones should remain lightweight:
- title
- optional description
- status
- order

### FR-033: External Resource Attachments
Supported attachments for MVP:
- GitHub repo URL
- deployment URL
- docs URL
- demo URL

Freeform notes should be supported only if stored in a bounded and structured way. A rich collaborative notes system is out of scope.

### FR-034: Progress Visibility
Each project must show progress using milestone-derived state or an explicitly computed progress field.

### FR-035: Continue Work CTA
Every active project detail page must include one clear action that returns the user to productive progress.

---

## 9.5 Guides Hub

### FR-040: Guides Library
The platform must expose a guide library optimized for practical retrieval, not long-form browsing.

### FR-041: Guide Metadata
Each guide must include:
- title
- category
- difficulty
- short description
- estimated time
- action type

### FR-042: Guide Categories
Initial categories:
- workflow
- backend
- frontend
- architecture
- career
- Git/GitHub
- systems thinking

### FR-043: Guide Detail
Guide detail pages must prioritize:
- scannability
- actionability
- low-friction application

They must not mimic a media article or generic blog page.

### FR-044: Guide Exit Actions
Each guide should connect to at least one next step:
- apply to project
- open a related template
- improve profile
- return to an active project

### FR-045: Guide Progress Tracking
For MVP, full reading analytics are not required. A lightweight "opened" or "used" signal is sufficient if it remains low-cost to store.

---

## 9.6 Templates Hub

### FR-050: Templates Library
The system must expose reusable templates and starter kits.

### FR-051: Template Metadata
Each template must include:
- title
- type
- description
- use case
- tags
- source link

### FR-052: Template Actions
Allowed actions:
- open template
- fork repo
- create project from template

### FR-053: Template Categories
Suggested categories:
- CV
- starter kit
- backend
- frontend
- docs
- repo standards

### FR-054: Template-to-Project Flow
If a user starts from a template, the system should create a project record pre-linked to the template where possible.

---

## 9.7 Profile Lab

### FR-060: Profile as Operational Asset
The profile area must function as a living technical identity, not just account settings.

### FR-061: MVP Profile Fields
For the current backend and UI direction, the profile system should focus on:
- display name
- structured name fields
- email
- birth date
- sex
- country
- GitHub username
- avatar URL sourced from GitHub when applicable
- profile completion

Fields such as headline, bio, skills, CV status, and public proof objects are future-phase additions and should not be assumed as MVP requirements unless implemented in the data model and rules.

### FR-062: Save and Update
Users must be able to update profile fields safely, with validation and clear save states.

### FR-063: Profile Completion
Profile completion must be computed from actual required fields and remain explainable to the user.

### FR-064: Profile Gating
If core profile fields are required for a normalized academy identity, the system may gate deeper workspace actions until those fields are completed.

### FR-065: Identity Integrity
If GitHub is connected, avatar and GitHub identity signals should remain synchronized to that source rather than allowing conflicting manual overrides.

---

## 9.8 Support Layer

### FR-070: Structured Support Entry Points
The workspace must expose lightweight support actions such as:
- ask a technical question
- request career/profile feedback
- request project unblock help

### FR-071: No Social Feed
The support layer must not resemble a timeline or social feed.

### FR-072: Utility-Driven Support
Support entry points must be structured around problem framing and next action, not open-ended posting.

### FR-073: Deferred Implementation Allowed
If support backend workflows are not yet built, the UI may expose entry points as clearly labeled placeholders only if they do not pretend to provide unavailable functionality.

---

## 9.9 Personalization and State Logic

### FR-080: User-State Evaluation
The system must derive personalized state from persisted user and project data.

### FR-081: Focus Rules
Initial focus logic:
- if email verification is required, show verification flow
- else if profile is incomplete, focus profile completion
- else if user has an active project, continue the most recently updated active project
- else if user has no project, prompt project creation
- else recommend a guide or template relevant to the user's state

### FR-082: Intentional Empty States
All empty states must:
- explain the state briefly,
- suggest one clear next action,
- avoid blame or abstract filler.

### FR-083: Stable Priority Logic
Focus rules must be deterministic. The same user state should produce the same top-priority action.

---

# 10. Non-Functional Requirements

## 10.1 Performance
- Workspace entry should feel fast and calm on typical mobile and laptop devices.
- Avoid heavy blocking animations and unnecessary hydration.
- Prefer server-rendered shell plus targeted client hydration.
- Reduce Firestore reads on workspace load.
- Avoid duplicate fetches for the same session state.
- Do not fetch entire collections when summary counters or bounded queries are enough.

## 10.2 Scalability
The architecture must support growth from early beta to thousands of active users by:
- using user-scoped queries,
- avoiding fan-out writes for cosmetic metrics,
- keeping document sizes bounded,
- avoiding unbounded subcollection scans on every page load,
- designing derived metrics so they can be recomputed or cached later.

## 10.3 Maintainability
- Clear separation between page composition, domain logic, and data access
- Reusable UI components
- Centralized validation and state logic
- Localized copy separated from operational logic where practical
- Avoid overloading page files with business rules

## 10.4 Reliability
- Partial data must degrade safely
- Unknown or missing optional fields must not crash rendering
- UI must remain stable under auth race conditions and partially initialized session state
- All write flows must provide recoverable failure states

## 10.5 Accessibility
- Semantic HTML
- keyboard support for all interactive controls
- visible focus states
- sufficient contrast
- labels and instructions for form fields
- screen-reader-friendly status messaging
- motion that respects reduced-motion preferences

## 10.6 Security
- Protect all private user and project data with least-privilege Firestore rules
- Restrict read access to user-owned records unless explicitly public
- Do not trust client-only validation
- Validate provider linking and account ownership
- Avoid exposing internal identifiers or operational metadata unnecessarily

## 10.7 Internationalization
- Spanish-first is acceptable
- architecture must support localized routes and copy from the start
- the system must not assume English-only slugs or hardcoded labels in component logic

## 10.8 Observability
The system should be easy to instrument later for:
- workspace entry
- profile completion
- project creation
- template-to-project conversion
- guide usage
- auth/provider errors

Instrumentation must be optional and should not drive architecture complexity in the MVP.

---

# 11. Information Architecture

## 11.1 Main Route Families

Current route family:
- `/plataforma`
- `/proyectos`
- `/mentores`
- `/login`
- `/unirse`

Recommended authenticated route family target:
- `/plataforma`
- `/plataforma/proyectos` or `/proyectos`
- `/plataforma/guias` or `/guias`
- `/plataforma/templates` or `/templates`
- `/plataforma/perfil` or anchored profile section
- `/plataforma/soporte` or anchored support section

Decision note:
Keep route nesting consistent once chosen. Do not mix flat and nested authenticated route patterns without a strong reason.

## 11.2 Navigation Model
Top-level navigation should reflect the workspace mental model:
- Workspace
- Projects
- Guides
- Templates
- Profile
- Support

## 11.3 MVP Recommendation
For MVP, it is acceptable for Guides, Templates, Profile, and Support to begin as sections within the workspace shell if standalone routes would add complexity without product benefit.

---

# 12. UX Strategy

## 12.1 UX Goal
Reduce ambiguity, preserve momentum, and make the user feel technically respected.

## 12.2 Core UX Rules
1. Every page needs one dominant action.
2. Every major section must justify itself through utility.
3. Authenticated space must not feel like post-landing-page marketing.
4. State must be visible.
5. Empty states must teach and direct.
6. The system must reduce cognitive load, not merely display options.
7. Critical workflows should prefer progressive disclosure over dashboard overload.

## 12.3 IHC / HCI Requirements
- Recognition over recall: users should not need to remember where the next action lives
- Clear system status: save states, verification states, and completion states must be visible
- Consistency and standards: labels, statuses, chips, cards, and CTA hierarchy must remain predictable
- Error prevention: invalid inputs and unsupported auth flows should be guided before failure where possible
- User control and freedom: archive instead of destructive deletion for MVP, clear back/continue paths
- Minimalist design: remove low-signal copy and sections that do not earn their space
- Progressive disclosure: advanced detail should appear only when useful

## 12.4 Desired User Outcomes
The user should feel:
- guided
- focused
- capable
- respected
- supported
- in control of the next step

---

# 13. UI Direction

## 13.1 Visual Tone
- premium
- minimal
- calm
- technical
- serious
- high-trust

## 13.2 Design Language
The product must preserve the current Apple-like design direction:
- restrained surfaces
- soft depth
- clean large-radius panels
- strong spacing rhythm
- elegant typographic hierarchy
- careful motion
- minimal visual noise

This visual language is a product constraint, not a temporary preference.

## 13.3 Interaction Pattern Rules
- One primary CTA per view
- Secondary actions visually subordinate
- Status chips small and scannable
- Cards grouped by workflow, not decoration
- Summaries separated from editable surfaces
- Dense information is acceptable only when hierarchy remains obvious

## 13.4 Content Density Rules
- Short operational copy beats long conceptual copy
- Explanatory text should be capped unless the user is in a guide/detail view
- Sections must avoid repeated slogans or empty inspiration language

## 13.5 Motion
- Subtle transitions only
- No continuous ornamental animation loops in authenticated workflows
- Motion must support orientation, state change, or feedback

## 13.6 Responsive Behavior
- Mobile must preserve hierarchy, not simply stack everything uniformly
- Primary CTA must remain visible without creating sticky clutter
- Forms must remain comfortable to complete on smaller screens

---

# 14. Content Strategy

## 14.1 Tone
Authenticated copy must be:
- direct
- useful
- respectful
- confidence-building
- operational

## 14.2 Avoid
- motivational filler
- repeated landing-page slogans
- vague product language
- long conceptual paragraphs above key actions

## 14.3 Prefer
- "Continue project"
- "Complete profile"
- "Open guide"
- "Start from template"
- "Ask for unblock help"

## 14.4 Microcopy Standard
Short, clear, actionable, and technically literate.

Examples:
- Good: "Continue CNN Visualizer"
- Good: "Complete your profile to unlock the workspace"
- Good: "Connect GitHub to sync your engineering identity"
- Weak: "Your engineering journey continues here"

---

# 15. Data Model Proposal

This section has been revised to better fit scalable Firestore patterns and the current product implementation.

## 15.1 Design Rules
- Prefer user-owned top-level collections with `userId` indexed queries
- Keep hot documents small
- Use subcollections only when they improve query isolation or write patterns
- Derived counters should be optional and recomputable
- Do not store data in documents simply because it is convenient for UI text

## 15.2 Core Collections

### `users/{uid}`
```json
{
  "displayName": "string",
  "name": "string",
  "providerDisplayName": "string",
  "firstName": "string",
  "middleName": "string",
  "lastName": "string",
  "secondLastName": "string",
  "email": "string",
  "birthDate": "YYYY-MM-DD",
  "age": 0,
  "sex": "f | m | o",
  "country": "string",
  "github": "string",
  "avatarUrl": "string",
  "githubConnected": true,
  "profileCompletion": 0,
  "createdAt": "ISO string",
  "lastLoginAt": "ISO string",
  "firstWorkspaceVisitAt": "ISO string",
  "lastWorkspaceVisitAt": "ISO string"
}
```

Notes:
- This should remain aligned with actual Firestore rules and current implementation.
- `age` is legacy/derived and should not become the source of truth if `birthDate` exists.

### `projects/{projectId}`
```json
{
  "userId": "string",
  "title": "string",
  "description": "string",
  "status": "draft | active | paused | completed | archived",
  "category": "string",
  "stack": ["string"],
  "templateId": "string",
  "repoUrl": "string",
  "deployUrl": "string",
  "docsUrl": "string",
  "demoUrl": "string",
  "primaryGoal": "string",
  "progress": 0,
  "createdAt": "ISO string or timestamp",
  "updatedAt": "ISO string or timestamp",
  "archivedAt": "ISO string or timestamp"
}
```

Recommendation:
- Use consistent date storage across a collection. Do not mix ISO strings and Firestore timestamps casually.
- If current implementation already uses strings, keep it consistent until a deliberate migration is planned.

### `projects/{projectId}/milestones/{milestoneId}`
```json
{
  "title": "string",
  "description": "string",
  "status": "todo | in_progress | done",
  "order": 0,
  "createdAt": "ISO string or timestamp",
  "updatedAt": "ISO string or timestamp"
}
```

Rationale:
- Milestones fit well as a project subcollection because reads are naturally scoped to a project detail page.

### `guides/{guideId}`
```json
{
  "title": "string",
  "slug": "string",
  "category": "string",
  "difficulty": "beginner | intermediate | advanced",
  "description": "string",
  "estimatedMinutes": 0,
  "actionType": "read | blueprint | apply",
  "contentRef": "string",
  "published": true,
  "updatedAt": "ISO string or timestamp"
}
```

Recommendation:
- Store guide content outside the hot listing document when content becomes large.

### `templates/{templateId}`
```json
{
  "title": "string",
  "slug": "string",
  "type": "cv | starter_kit | backend | frontend | docs",
  "description": "string",
  "useCase": "string",
  "tags": ["string"],
  "repoUrl": "string",
  "previewUrl": "string",
  "published": true,
  "updatedAt": "ISO string or timestamp"
}
```

### `githubUsernames/{username}`
```json
{
  "uid": "string",
  "username": "string",
  "claimedAt": "ISO string",
  "updatedAt": "ISO string"
}
```

Rationale:
- This collection exists to enforce uniqueness and should remain tightly scoped.

## 15.3 Deferred / Optional Collections

### `userGuideEvents`
Only introduce if guide usage tracking becomes product-critical.

### `supportRequests`
Add only when there is a real workflow and owner for processing requests.

### `signals`
Avoid making this a primary source of truth early.

Recommendation:
Prefer computing small workspace summaries from canonical collections or storing denormalized counters only when query cost is proven to matter.

---

# 16. Backend and Query Constraints

## 16.1 Firestore Discipline
- Workspace load must not require scanning all projects, all guides, and all templates without limits
- Listing queries must be indexable and bounded
- Home summaries should use limited queries or precomputed safe aggregates only when necessary
- Avoid write-heavy analytics counters in MVP

## 16.2 Auth Constraints
- Provider linking must be handled deliberately
- Email verification state must be recoverable
- Social auth must not create duplicate user documents for the same person

## 16.3 Content Constraints
- Large guide bodies should not live in list payloads
- Static content that changes rarely should be shipped statically where possible

---

# 17. Engineering Quality Bar

## 17.1 Frontend
- Preserve existing visual system
- Prefer composition over giant page files
- Minimize hydration
- Keep client scripts resilient to undefined state

## 17.2 Domain Logic
- Business rules should live in reusable utilities or services
- Validation rules must stay aligned with Firestore rules
- State logic must be deterministic and testable

## 17.3 QA Expectations
- Login, registration, provider linking, and workspace entry are critical paths
- Empty, partial, and returning states must be tested
- Mobile and desktop behavior must be validated

---

# 18. Final Product Recommendation

The product should continue evolving as a **premium engineering workspace**, not as a generalized education portal. The right near-term strategy is:
- deepen execution workflows,
- strengthen profile and project state,
- keep support structured,
- maintain premium Apple-like UI coherence,
- and avoid adding backend-heavy or socially noisy features too early.

If a feature does not improve:
- action clarity,
- project momentum,
- professional signal,
- or unblock support,

it should be deprioritized.
