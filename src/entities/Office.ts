import OfficeDesignation from './OfficeDesignation';

export default interface Office {
  abbreviation: string | undefined;
  description: string | undefined;
  designations: OfficeDesignation[] | undefined;
}
