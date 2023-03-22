export interface LeaveRequest {
  leaveFrom: Date | null;
  leaveTo: Date | null;
  leaveReason: string | null;
}

export interface LeaveReasons {
  reason : string
}
