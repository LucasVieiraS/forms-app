/* eslint-disable eqeqeq */
import { FormControl } from '@angular/forms';

export class CPFValidator {
  static valid = (control: FormControl): any => {
    const cpfString = String(control.value);
    let rev = 0;
    let add = 0;
    if (cpfString.length != 11 ||
      cpfString == '00000000000' ||
      cpfString == '11111111111' ||
      cpfString == '22222222222' ||
      cpfString == '33333333333' ||
      cpfString == '44444444444' ||
      cpfString == '55555555555' ||
      cpfString == '66666666666' ||
      cpfString == '77777777777' ||
      cpfString == '88888888888' ||
      cpfString == '99999999999') {
      return {
        invalido: true
      };
    };

    add = 0;
    for (let i = 1; i <= 9; i++) {
      add += Number(cpfString.substring(i - 1, i)) * (11 - i);
    };
    rev = (add * 10) % 11;

    if (rev == 10 || rev == 11) { rev = 0; }
    if (rev != Number(cpfString.charAt(9))) {
      return {
        invalido: true
      };
    }

    add = 0;
    for (let i = 1; i <= 10; i++) {
      add += Number(cpfString.substring(i - 1, i)) * (12 - i);
    };

    rev = (add * 10) % 11;
    if (rev == 10 || rev == 11) { rev = 0; }
    if (rev != Number(cpfString.charAt(10))) {
      return {
        invalido: true
      };
    }

    return null;
  };
}
