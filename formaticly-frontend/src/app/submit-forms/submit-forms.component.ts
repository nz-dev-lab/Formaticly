import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { z } from 'zod';
import { NgIf } from '@angular/common';

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type FeedbackSchemaShape = {
  name?: string;
  email?: string;
  message?: string;
};

@Component({
  selector: 'app-submit-forms',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './submit-forms.component.html',
  styleUrls: ['./submit-forms.component.css'],
})
export class SubmitFormsComponent {
  public Object = Object;
  form: FormGroup;
  errors: FeedbackSchemaShape = {};
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      message: [''],
    });

    this.form.valueChanges.subscribe((value) => {
      this.validate(value);
    });
  }

  validate(value: any) {
    const result = feedbackSchema.safeParse(value);
    if (result.success) {
      this.errors = {};
    } else {
      this.errors = {};
      for (const issue of result.error.issues) {
        this.errors[issue.path[0] as keyof FeedbackSchemaShape] = issue.message;
      }
    }
  }

  async onSubmit() {
    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const value = this.form.value;
    const result = feedbackSchema.safeParse(value);

    if (!result.success) {
      this.validate(value);
      this.submitting = false;
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 1000));
      this.successMessage = 'Thank you for your feedback!';
      this.form.reset({
        name: '',
        email: '',
        message: '',
      });
      this.errors = {};

    } catch {
      this.errorMessage = 'Something went wrong. Please try again.';
    } finally {
      this.submitting = false;
    }
  }
}
