import Swal from 'sweetalert2'

const errorModal = (title) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: title,
      })
}

const checkOutModal = (mode) => {  
      Swal.fire({
        title: 'Are you sure to logout?',
        text: "Thanks for your time",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#244B35',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            if(mode === 'keypair'){
                localStorage.removeItem('kp')
            } else if(mode === 'wallet'){
              localStorage.removeItem('wp')
            }
          window.location.href = '/'
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          
        }
      })
}

const successModal = (title) => {
    Swal.fire({
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
          window.location.reload()
      })
}

const switchModal = (title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: title
      })
}

const confirmModalError = (title, pathname) => {
    Swal.fire({
        // title: 'Are you sure?',
        text: title,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#26e97e',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
            
            window.location.href = pathname
        }
      })
}

const confirmModal = (title, mode, keyPair) => {
    Swal.fire({
        // title: 'Are you sure?',
        text: title,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#26e97e',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
            if(mode === 'keypair'){
                localStorage.setItem('kp', keyPair)
            }
            if(mode === 'wallet'){
                localStorage.removeItem('kp')
            }
            window.location.href = `/artchive?mode=${mode}`
        }
      })
}

export {errorModal, confirmModal, successModal, switchModal, checkOutModal, confirmModalError}
