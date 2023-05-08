import ModuleHead from './ModuleHead';
import ModuleRight from './ModuleRight';

export default interface Module {
  id: number;
  description: string | undefined;
  moduleHeadId: number | undefined;
  view: string | undefined;

  moduleRights: ModuleRight[] | undefined;
  moduleHead: ModuleHead | undefined;

  isCheck?: boolean | undefined;
}
