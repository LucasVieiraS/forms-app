/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { FormGroup } from '@angular/forms';

export function matchValidation(controleNome: string, comparacaoNome: string) {
  return (formGroup: FormGroup) => {
    const controle = formGroup.controls[controleNome];
    const comparacao = formGroup.controls[comparacaoNome];

    if (controle.errors) {
      return;
    }

    if (controle.value !== comparacao.value) {
      comparacao.setErrors({ comparacao: true });
    } else {
      comparacao.setErrors(null);
    }
  };
}
