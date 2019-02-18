// Examine: 'Examine', // 审核
// Banned: 'Banned', // 禁止
// Normal: 'Normal', // 正常
// 状态列表
export const StatusArr = ['Examine', 'Banned', 'Normal'];

// 权限列表
export enum StatusEnum {}
for (const i in StatusArr) {
  StatusEnum[StatusArr[i]] = StatusArr[i];
}

// 状态列表
export const RoleArr = ['SuperAdmin', 'Admin', 'User'];

// 权限列表
export enum ArrEnum {}
for (const i in RoleArr) {
  ArrEnum[RoleArr[i]] = RoleArr[i];
}
