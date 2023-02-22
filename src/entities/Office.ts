import OfficeDesignation from './OfficeDesignation';

export default interface Office {
  id: number;
  abbreviation: string | undefined;
  description: string | undefined;
  designations: OfficeDesignation[] | undefined;
}
