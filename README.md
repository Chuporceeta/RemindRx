# RemindRx

The main branch is automatically deployed on updates, and is hosted at https://remindrx-1c8dd.web.app/

When fetching from origin (or cloning for the first time), run ```npm install``` from the main directory to install any new dependencies

To launch the frontend locally and view edits live, run ```npm run dev``` from the main directory

To deploy the entire app locally, see https://firebase.google.com/docs/hosting/test-preview-deploy

Kanban Board: https://github.com/users/Chuporceeta/projects/1

## Resources

### Frontend

React Components: https://react.fluentui.dev/?path=/

Styling: https://tailwindcss.com/

Vite: https://v3.vitejs.dev/guide/

[Wireframes.pdf](https://github.com/user-attachments/files/17336499/Wireframes.pdf)

---------------

### Backend

Database: https://firebase.google.com/docs/firestore

Backend Framework: https://firebase.google.com/docs/functions

Hosting: https://firebase.google.com/docs/hosting

Authentication: https://firebase.google.com/docs/auth

#### Basic Database Structure:
- Users (Collection)
    - uid (Document)
      - firstName
      - lastName
      - FCMTokens (Array): [token1, token2, ...]
      - Medications (Subcollection)
        - medid (Document)
          - name
          - dosage
          - reminderType
          - reminderTime
        - medid...
        - ...
   - uid...
   - ...
