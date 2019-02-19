// Examine: 'Examine', // 审核
// Banned: 'Banned', // 禁止
// Normal: 'Normal', // 正常
// 状态列表
export const StatusArr = ['Examine', 'Banned', 'Normal'];

// 状态
export enum StatusEnum {
  Examine = 'Examine', // 审核
  Banned = 'Banned', // 禁止
  Normal = 'Normal', // 正常
}

// 状态列表
export const RoleArr = ['SuperAdmin', 'Admin', 'Supplier', 'User'];

// 权限列表
export enum RoleEnum {
  SuperAdmin = 'SuperAdmin', // 超级管理员
  Admin = 'Admin', // 管理员
  Supplier = 'Supplier', // 机构
  User = 'User', // 普通用户
}
