const baseAuthCookieOption = {
    HttpOnly: true,
    SameSite: "none",
    secure: true
}

export const UserRoleEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member",
}

export const AvailableUserRole = Object.values(UserRoleEnum)

export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done",
}

export const AvailableTaskStatuses = Object.values(TaskStatusEnum)


export const AccessCookieOptions = {
    ...baseAuthCookieOption,
    path: "/"
}

export const RefreshCookieOptions = {
    ...baseAuthCookieOption,
    path: "/api/v1/auth/refresh-token"
}