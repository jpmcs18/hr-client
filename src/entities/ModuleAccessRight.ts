import ModuleRight from './ModuleRight';

export default interface ModuleAccessRight {
  id: number;
  moduleAccessId: number | undefined;
  moduleRightId: number | undefined;
  moduleRight: ModuleRight | undefined;
}
