import { ReflectMetadata } from '@nestjs/common';

export const ROLES_DEFINITION = '__roles_definition__';

export const Roles = (...roles: string[]) =>
  ReflectMetadata(ROLES_DEFINITION, roles);
