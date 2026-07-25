# OrangeHRM Dashboard Test Plan

## Purpose
This test plan covers the OrangeHRM dashboard page at `https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index`.
It focuses on the post-login dashboard landing experience, page-level widgets, navigation, and key interactive elements visible on the dashboard.

## Scope
Included:
- Successful login and dashboard landing
- Dashboard page header and URL verification
- Quick Launch widget
- My Actions widget
- Employees on Leave Today widget
- Time at Work widget
- Buzz Latest Posts widget
- Employee distribution charts
- Top bar user menu and logout
- Left navigation access to high-level modules

Excluded:
- Deep PIM, Admin, or User Management flows beyond the dashboard entry points
- API-only tests for backend endpoints
- Mobile and responsive layout coverage (unless explicitly added later)

## Assumptions
- `BASE_URL`, `USER_NAME`, and `PASSWORD` are configured in environment variables or the test environment.
- The demo site uses a valid login and navigates to `/web/index.php/dashboard/index` on success.
- The dashboard displays dynamic widgets and may show "no data" placeholders for empty content.

## Precondition
- Start from the login page: `BASE_URL/web/index.php/auth/login`
- Authenticate with valid credentials
- Wait for URL `BASE_URL/web/index.php/dashboard/index`
- Confirm dashboard landing heading text is `Dashboard`

## Test Cases

### 1. Dashboard landing and header
- Verify login succeeds with valid credentials.
- Verify the browser navigates to `/web/index.php/dashboard/index`.
- Verify the heading text `Dashboard` is visible.
- Verify the page title contains `OrangeHRM`.

### 2. Quick Launch widget
- Verify the "Quick Launch" widget is visible.
- Verify the widget contains expected quick-launch actions or cards.
- Verify at least one quick launch action is clickable and navigates to the correct module.

### 3. My Actions widget
- Verify the "My Actions" widget is visible.
- Verify it displays pending items such as leave requests, timesheets, performance evaluations, and candidate interviews.
- Verify clicking a pending action navigates to the corresponding page.
- Verify an empty state is handled gracefully when no pending actions exist.

### 4. Employees on Leave Today widget
- Verify the "Employees on Leave Today" widget is visible.
- Verify the widget displays a table or list when leave record data is present.
- Verify the empty state text is shown if no employees are on leave.
- Verify the header text or table columns are correct.

### 5. Time at Work widget
- Verify the "Time at Work" widget is visible.
- Verify current day/week summary values are displayed.
- Verify the widget shows the current timezone or time offset format when available.

### 6. Buzz Latest Posts widget
- Verify the "Buzz Latest Posts" widget is visible.
- Verify the widget loads a list of posts or shows a no-posts placeholder.
- Verify the feed refresh or view link behavior if available.

### 7. Employee distribution charts
- Verify the "Employee Distribution by Sub Unit" chart is visible.
- Verify the "Employee Distribution by Location" chart is visible.
- Verify the charts render without errors and display legend items or segment labels.
- Validate the presence of an "Unassigned" category if applicable.

### 8. Top bar user dropdown and logout
- Verify the top bar contains a user/profile menu.
- Verify support, about, and logout menu items exist.
- Verify clicking logout returns the user to the login page.

### 9. Left navigation and module entry points
- Verify the left navigation menu displays dashboard-linked modules such as PIM and Admin.
- Verify clicking the PIM menu item opens the PIM module.
- Verify clicking the Admin or other available module links opens the corresponding section from the dashboard.

### 10. Fallback and empty-state behavior
- Validate that widgets show meaningful empty state messages when no data is present.
- Verify the page still loads successfully if one or more dashboard widgets have no data.

## Implementation Notes
- Use Playwright test fixtures and page objects.
- Existing page objects include `LoginPage`, `DashBoardPage`, and navigation helpers.
- Extend `DashBoardPage` to add locators for:
  - Quick Launch title and action cards
  - My Actions container
  - Employees on Leave Today list/table
  - Time at Work widget content
  - Buzz Latest Posts widget
  - Employee distribution charts
  - User dropdown menu and logout link
- Use `page.waitForURL` to verify `/dashboard/index`.
- Use `expect` with text and visibility assertions for the dashboard widgets.

## Recommended Test Suite Organization
- `tests/ui-tests/dashboard-module.spec.ts` for dashboard-specific coverage
- Tag smoke-level tests with `@smoke` or `@sanity`
- Keep authentication in the existing `global.setup.ts` fixture and use storage state for browser projects

## Risks and Notes
- The dashboard is highly dynamic, so widget data may differ between test runs.
- Use stable selectors based on accessible names, role attributes, and visible text rather than brittle CSS classes.
- If the demo site requires a specific demo account, ensure those credentials are set in environment variables before running.
