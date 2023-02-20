import ModuleRight from './ModuleRight';

export default interface Module {
  id: number;
  pageName: string | undefined;
  moduleRights: ModuleRight[] | undefined;
}
