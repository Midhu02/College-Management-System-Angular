import { Component, EventEmitter, Output } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentDetailsComponent } from "../student-details/student-details.component";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [DashboardComponent, CommonModule, FormsModule, StudentDetailsComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  isListPage = true;
  showModal = false;
  isEditMode = false;
  modalInstance: any;
  students: any[] = [];
  constructor(private router: Router) {}
  @Output() editStudent = new EventEmitter<string>();

  studentFormModel = {
    id: '',
    name: '',
    email: '',
    departmentId: '',
    enrollmentYear: new Date().getFullYear(),
  };

  departmentList = [
    { id: 'Computer Science' },
    { id: 'Electronics' },
    { id: 'Mechanical' },
    { id: 'Civil' },
    { id: 'AI & DS' },
  ];

  openModal() {
    this.showModal = true;
    this.isEditMode = false;
    this.resetForm();
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEditMode) {
        const index = this.students.findIndex(
          (s) => s.id === this.studentFormModel.id
        );
        if (index !== -1) {
          this.students[index] = { ...this.studentFormModel };
        }
      } else {
        this.students.push({ ...this.studentFormModel });
      }

      localStorage.setItem('students', JSON.stringify(this.students));
      alert(this.isEditMode ? 'Student Updated!' : 'Student Created!');
      this.closeModal();
      this.resetForm();
    }
  }

  filterdept() {
    this.router.navigate(['/filter']);
  }

  resetForm() {
    this.studentFormModel = {
      id: '',
      name: '',
      email: '',
      departmentId: '',
      enrollmentYear: new Date().getFullYear(),
    };
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    const data = localStorage.getItem('students');
    this.students = data ? JSON.parse(data) : [];
  }

  onEdit(id: string) {
    const student = this.students.find((s) => s.id === id);
    if (student) {
      this.studentFormModel = { ...student };
      this.isEditMode = true;
      this.showModal = true;
    }
  }

  onDelete(studentId: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.students = this.students.filter((s) => s.id !== studentId);
      localStorage.setItem('students', JSON.stringify(this.students));
    }
  }
}
