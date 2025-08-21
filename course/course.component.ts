import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Course } from '../../model/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetailsComponent } from "../course-details/course-details.component";

interface Department {
  id: string;
}

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardComponent, CourseDetailsComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit, AfterViewInit {
  @ViewChild('exampleModal') exampleModalRef!: ElementRef;

  modalInstance: any;
  isListPage = true;
  isEditMode = false;

  courses: Course = {
    id: '',
    title: '',
    deptid: '',
    credits: 0,
  };

  departmentList: Department[] = [
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
    // Optional: could load any route parameters if needed
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
    this.courses = {
      id: '',
      title: '',
      deptid: '',
      credits: 0,
    };
    this.modalInstance.show();
  }

  onEdit(id: string): void {
    const storedCourses: Course[] = JSON.parse(
      localStorage.getItem('courses') || '[]'
    );
    const course = storedCourses.find((c) => c.id === id);
    if (course) {
      this.courses = { ...course };
      this.isEditMode = true;
      this.modalInstance.show();
    }
  }

  filterdeptcourse(): void {
    console.log('filterdeptcourse work');
    this.router.navigate(['/course-filter']);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      let courses: Course[] = JSON.parse(
        localStorage.getItem('courses') || '[]'
      );

      if (this.isEditMode) {
        const index = courses.findIndex((c) => c.id === this.courses.id);
        if (index !== -1) {
          courses[index] = { ...this.courses };
        }
      } else {
        courses.push({ ...this.courses });
      }

      localStorage.setItem('courses', JSON.stringify(courses));
      alert('Course saved!');
      this.modalInstance.hide();
      form.resetForm();
    }
  }
}
