import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng';

// funcion que devuelve el mensaje de un objeto error de una respuesta http
export function getError(error): string {
  error = error.error;
  if (error.detail) {
    return error.detail;
  } else {
    for (const prop in error) {
      if (true === Array.isArray(error[prop])) {
        return error[prop][0];
      } else {
        return error[prop];
      }
    }
    return error;
  }
}

// clase para mostrar errores con toastr
export class ErrorWithToastr {

  constructor(
    private toastr: ToastrService,
    private afterShowErrorCallback: () => void = null,
    private showInConsole: boolean = true,
  ) {}

  public showError(error): void {
    if (true === this.showInConsole) {
      console.error(error);
    }
    this.toastr.error(getError(error));
    if (this.afterShowErrorCallback) {
      this.afterShowErrorCallback();
    }
  }

}

// clase para errores con MessageService
export class ErrorWithMessages {

  constructor(
    private messageService: MessageService,
    private afterShowErrorCallback: () => void = null,
    private showInConsole: boolean = true,
  ) {}

  public showError(error): void {
    if (true === this.showInConsole) {
      console.error(error);
    }
    this.messageService.clear();
    this.messageService.add({severity: 'error', summary: undefined, detail: getError(error)});
    if (this.afterShowErrorCallback) {
      this.afterShowErrorCallback();
    }
  }

}
