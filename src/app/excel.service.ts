import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  toTitleCase(str: any): string {
    const finalStr = str
      .split(' ')
      .map((word: string) => {
        if (word.length > 2) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }

        return word.toLowerCase();
      })
      .join(' ');
    return finalStr;
  }

  readExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);

        const emails = json.map((row: any) => ({
          district: row['Distrito'],
          email: row['E-mail'],
          city: this.toTitleCase(row['MUNICÍPIO']),
          presidentName: row['Nome  Presidente'],
          address: row['MORADA'],
          postalCode: row['CÓDIGO POSTAL'],
          phoneNumber: row['Telefone '],
        }));

        resolve(emails);
      };

      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
}
