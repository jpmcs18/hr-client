import Module from 'module';
import ModuleAccessRight from './ModuleAccessRight';

export default interface ModuleAccess {
  id: number;
  moduleId: number;
  module: Module | undefined;
  moduleAccessRights: ModuleAccessRight[] | undefined;
}
