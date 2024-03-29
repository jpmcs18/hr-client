import ModuleRoute from './models/client-model/ModuleRoute';
import ModuleRight from './models/entities/ModuleRight';
import { SystemModules } from './routes';

export function hasAccess(
  moduleRight: ModuleRight[],
  page: string,
  access: string,
  isAdmin?: boolean
) {
  var module = getPage(page);
  return (
    !!moduleRight
      .filter((x) => x.moduleId === module?.id)
      ?.filter((x) => x.right === access).length || isAdmin
  );
}

export function downloadFile(file: string, fileName: string) {
  let link = document.createElement('a');
  link.href = file;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function addDays(date: Date, days: number): Date {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  var result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function getLastDateOfMonth(date: Date): Date {
  var result = new Date(date);
  result.setDate(1);
  result = addMonths(result, 1);
  result = addDays(result, -1);
  return result;
}

export function getFirstDateOfMonth(date: Date): Date {
  var result = new Date(date);
  result.setDate(1);
  return result;
}

export function getMonthName(date: Date): string {
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format;
  return monthName(date);
}

export function toDate(date?: Date | null): string {
  if (date === undefined || date === null) return '';
  const d = new Date(date);
  return (
    (d.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    d.getDate().toString().padStart(2, '0') +
    '/' +
    d.getFullYear()
  );
}

export function toDateDisplay(date?: Date | null): string {
  if (date === undefined || date === null) return '';
  const d = new Date(date);
  return (
    d.getFullYear() +
    '-' +
    (d.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    d.getDate().toString().padStart(2, '0')
  );
}

export function toTimeDisplay(date?: Date | null): string {
  if (date === undefined || date === null) return '';
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

export function toCommaSeparateAmount(amount?: string): string {
  if (amount === undefined || amount === null) return '';
  return amount.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function toDisplayAmount(amount?: string): string {
  if (amount === undefined || amount === null) return '';
  var result = amount.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  var values = result.split('.');
  return values[0] + (values[1] ?? '.').padEnd(3, '0');
}

export function getPage(page: string): ModuleRoute {
  return SystemModules.filter((x) => x.pageName === page)[0];
}

export function dateToString(date?: Date | undefined): string | undefined {
  return date === undefined ? undefined : new Date(date).toLocaleString();
}
