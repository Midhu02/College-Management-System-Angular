import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  currentStep = 1;
  registrationForm: FormGroup;

  departmentList = [
    { id: 'Computer Science' },
    { id: 'Electronics' },
    { id: 'Mechanical' },
    { id: 'Civil' },
    { id: 'Artificial Intelligence and Data Science' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.buildForm();
  }

  // ✅ Split out form builder logic for clarity
  buildForm(): FormGroup {
    return this.fb.group({
      personal: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
      academic: this.fb.group({
        department: ['', Validators.required],
        year: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      }),
      credentials: this.fb.group(
        {
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validators: this.passwordsMatch }
      ),
    });
  }

  // ✅ Getters for each form group
  get personal() {
    return this.registrationForm.get('personal') as FormGroup;
  }

  get academic() {
    return this.registrationForm.get('academic') as FormGroup;
  }

  get credentials() {
    return this.registrationForm.get('credentials') as FormGroup;
  }

  getStepGroup(): FormGroup {
    if (this.currentStep === 1) return this.personal;
    if (this.currentStep === 2) return this.academic;
    return this.credentials;
  }

  nextStep(): void {
    const currentGroup = this.getStepGroup();
    if (currentGroup.valid) {
      this.currentStep++;
    } else {
      currentGroup.markAllAsTouched();
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const existingData = JSON.parse(
        localStorage.getItem('registrationData') || '[]'
      );
      existingData.push(formData);
      localStorage.setItem('registrationData', JSON.stringify(existingData));

      alert('Form submitted successfully!');
      console.log('Submitted:', formData);

      // Reset form
      this.registrationForm.reset();
      this.registrationForm = this.buildForm(); // re-initialize validators
      this.currentStep = 1;
      this.router.navigate(['/login'])
      
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  // ✅ Typed validator function
  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
