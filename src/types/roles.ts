// Re-export all role-related types and functions from central types file
export type {
  UserRole,
  User,
  RoleConfig,
  RolePermissions,
} from './index';

export {
  ROLE_CONFIGS,
  getRoleConfig,
  getAllRoles,
  hasPermission,
} from './index';
