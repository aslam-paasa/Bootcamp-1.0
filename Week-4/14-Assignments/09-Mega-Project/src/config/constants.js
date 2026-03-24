/**
 * Constants:
 * - Create a constants file that contains all the constants for the project
 * - They are same as the environment variables, but are not sensitive.
 * - Use the constants in the project 
*/

/**
 * 1. Create a constant for the user roles:
 *    - Admin
 *    - Project Admin
 *    - Member
 * 
 * 2. Available User Roles:
 *    - Pass the constants to the frontend
 *    - User can iterate over the constants and display the roles in the 
 *      dropdown for the user to select the role
*/

export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member",
}

export const AvailableUserRoles = Object.values(UserRolesEnum);


/**
 * 1. Create a constant for the task statuses:
 *    - TODO
 *    - IN_PROGRESS
 *    - DONE
 * 
 * 2. Available Task Statuses:
 *    - Pass the constants to the frontend
 *    - User can iterate over the constants and display the statuses in the 
 *      dropdown for the user to select the status
 */
export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done",
}

export const AvailableTaskStatuses = Object.values(TaskStatusEnum);


