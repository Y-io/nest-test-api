const objToArr = json => {
  const arr: string[] = [];
  for (const i in json) {
    arr.push(json[i]);
  }
  return arr;
};

// 状态
export const StatusObj = {
  Examine: 'Examine', // 审核
  Banned: 'Banned', // 禁止
  Normal: 'Normal', // 正常
};

// 状态列表
export const StatusArr = objToArr(StatusObj);

// 权限列表
export const RoleObj = {
  SuperAdmin: 'SuperAdmin', // 超级管理员
  User: 'User', // 普通用户
};

export const RoleArr = objToArr(RoleObj);
