import { LeaveRequest, LeaveReasons } from './../models';
import { TokenService } from './../services/token.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import {finalize,switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  leaveForm!: FormGroup;
  leaveSummary: any = {};
  leaveReasons: LeaveReasons[] = [];
  token: string = '';
  createReqMessage = '';

  // isLoadingSummary = false;
  // isLoadingCreate = false;
  // isLoadingReset = false;

  leaveTo: FormControl<Date | null> = new FormControl(null, [
    Validators.required,
  ]);
  leaveFrom: FormControl<Date | null> = new FormControl(null, [
    Validators.required,
  ]);
  leaveReason: FormControl<string | null> = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      leaveFrom: this.leaveFrom,
      leaveTo: this.leaveTo,
      leaveReason: this.leaveReason,
    });
    this.getSummaryData();
  }

  getSummaryData() {
    this.apiService
      .getLeaveSummary()
      .pipe()
      .subscribe({
        next: (response) => {
          this.leaveSummary = response?.response?.leave;
          this.leaveReasons = response?.response?.config?.leaveReasons;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onCreateLeaveRequest() {
    if (this.leaveForm.valid) {
      const req: LeaveRequest = {
        leaveFrom: this.leaveFrom.value,
        leaveTo: this.leaveTo.value,
        leaveReason: this.leaveReason.value,
      };
      this.apiService
        .getLeaveRequest(req)
        .pipe()
        .subscribe({
          next:(response) =>{
            console.log(response);
            this.getSummaryData();
            this.createReqMessage = response.message;
          },
          error: (response) => {
            console.log(response);
            this.createReqMessage = response.message;
          }
        })
    }
  }

  resetData() {
    this.apiService
      .getOriginalData()
      .pipe()
      .subscribe({
        next:(response) => {
          this.getSummaryData()
          console.log(response)
          this.createReqMessage = ''
          this.leaveForm.reset()
        }
      })
  }

  logout() {
    this.tokenService.removeTokenFromLocalStorage();
    this.router.navigate(['/login']);
  }
}
