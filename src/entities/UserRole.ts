import ModuleAccess from './ModuleAccess';

export default interface UserRole {
  id: number;
  description: string | undefined;
  ModuleAccesses: ModuleAccess | undefined;
}
