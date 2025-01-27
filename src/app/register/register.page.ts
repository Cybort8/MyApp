import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  formErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' }
    ],
    password_confirmation: [
      { type: 'required', message: 'La confirmación de contraseña es obligatoria' },
      { type: 'mismatch', message: 'Las contraseñas no coinciden' }
    ],
    name: [
      { type: 'required', message: 'El nombre es obligatorio' }
    ],
    username: [
      { type: 'required', message: 'El nombre de usuario es obligatorio' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    // Definición del formulario con validaciones
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      password_confirmation: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      last_name: new FormControl(''), // Campo opcional
      username: new FormControl('', Validators.required)
    }, {
      // Validador personalizado para confirmar contraseñas
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {}

  // Método para verificar que las contraseñas coincidan
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  registerUser() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.authService.register(registerData).then(res => {
        console.log(res);
        this.errorMessage = '';
        this.navCtrl.navigateForward('/login');
      }).catch(err => {
        console.log(err);
        this.errorMessage = typeof err === 'string' ? err : 'Error al registrar el usuario';
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
