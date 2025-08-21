import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../model/department.model';
import { DepartmentDetailsComponent } from "../department-details/department-details.component";

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [DashboardComponent, CommonModule, FormsModule, DepartmentDetailsComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit, AfterViewInit {
  @ViewChild('exampleModal') exampleModalRef!: ElementRef;

  isListPage = true;
  isEditMode = false;
  modalInstance: any;

  departments: Department = {
    id: '',
    deptname: '',
    hod: '',
  };

  departmentList: { id: string }[] = [
    { id: 'Computer Science' },
    { id: 'Electronics' },
    { id: 'Mechanical' },
    { id: 'Civil' },
    { id: 'Artificial Intelligence and Data Science' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const departments: Department[] = JSON.parse(
        localStorage.getItem('departments') || '[]'
      );
      const existingDept = departments.find((d) => d.id === id);
      if (existingDept) {
        this.departments = { ...existingDept };
        this.isEditMode = true;
      }
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const bootstrap = await import('bootstrap');
      this.modalInstance = new bootstrap.Modal(
        this.exampleModalRef.nativeElement
      );
    }
  }

  openModal(): void {
    this.isEditMode = false;
    this.departments = {
      id: '',
      deptname: '',
      hod: '',
    };
    this.modalInstance.show();
  }

  onEditdept(id: string): void {
    const storedDepartments: Department[] = JSON.parse(
      localStorage.getItem('departments') || '[]'
    );
    const department = storedDepartments.find((d) => d.id === id);
    if (department) {
      this.departments = { ...department };
      this.isEditMode = true;
      this.modalInstance.show();
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      let departments: Department[] = JSON.parse(
        localStorage.getItem('departments') || '[]'
      );

      if (this.isEditMode) {
        const index = departments.findIndex(
          (d) => d.id === this.departments.id
        );
        if (index !== -1) {
          departments[index] = { ...this.departments };
        }
      } else {
        departments.push({ ...this.departments });
      }

      localStorage.setItem('departments', JSON.stringify(departments));
      alert('Department saved!');
      this.modalInstance.hide();
      form.resetForm();
    }
  }
}
