
import swal, {SweetAlertIcon, SweetAlertResult} from 'sweetalert2';

export function pedirConfirmacion(title: string,
                                  text: string,
                                  confirmText: string,
                                  icon: SweetAlertIcon = 'warning'): Promise<SweetAlertResult> {

  return swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar'
  });

}
