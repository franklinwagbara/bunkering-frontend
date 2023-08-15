export interface IApplicationProcess {
  id: number;
  facilityTypeId: number;
  applicationTypeId: number;
  triggeredByRole: string;
  action: string;
  targetRole: string;
  status: string;
  rate: string;
  isArchived: boolean;
  permitStageId?: number;
  permitStageName?: string;
  branchId?: number;
  branchName?: string;
  office?: string;
}
