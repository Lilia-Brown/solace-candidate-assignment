## Summary

This take-home project demonstrates my approach to working within an existing codebase and debugging issues under a fixed time constraint. I focused on delivering clean, maintainable code that balances functionality and clarity, while also creating readable pull requests and commit history. I prioritized core functionality, usability, and structure to reflect how I contribute within a real-world team environment.

## Technical Improvements
- Make updates to the table:
  - Format phone numbers
  - Handle empty cells
- Add better accessibility for screen readers

## Future Enhancements & UX Improvements
- Consult with actual users to understand if the layout of the page is what they expect when they come to this page
  - Understand if there are additional features they would like added
  - Understand if there are any assumptions we made that they don't actually like using that should be rethought and refactored
- Consult with a Designer to understand how a wide table might look better on a mobile device and update the table to reflect this design
- For a large database, update the pagination to be on the back end, only requesting a certain amount of records to decrease the load time of the page
  - Update this page to have a "Loading" state on initial load
- Add filters to allow the user to show results based on desired values for certain columns

## Notes
The Pull Requests included are all built off each others' branches to make sure they would all work if merged into the project seamlessly.
Ideally, we won't be branching so far, but I didn't want there to be merge conflicts if pulling them in separately
