export interface IApplicationProcess {
  id: number;
  permitStageId: number;
  permitStageName: string;
  branchId: number;
  branchName: string;
  office: string;
  triggeredByRole: string;
  action: string;
  targetRole: string;
  status: string;
  rate: string;
  isArchived: boolean;
}
