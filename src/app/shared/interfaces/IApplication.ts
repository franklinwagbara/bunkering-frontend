import { IAppHistory } from './IAppHistory';
import { IApplicationForm } from './IApplicationForm';
import { IExtraPayment } from './IExtraPayment';
import { IInspectionForm } from './IInspectionForm';
import { ISchedule } from './ISchedule';

export interface IApplication {
  id: number;
  addedDate: Date;
  appHistory: IAppHistory[];
  appReference: string;
  appType: string;
  applicationforms: IApplicationForm[];
  category: string;
  categoryCode: string;
  categoryId: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  currentDesk: string;
  currentUser: string;
  extraPayments: IExtraPayment[];
  facilityAddress: string;
  facilityName: string;
  gpsCordinates: string;
  inspectionForm: IInspectionForm[];
  permitType: string;
  rrr: string;
  schedules: ISchedule[];
  submittedDate: string;
  lgaId: number;
  location: string;
  phaseName: string;
  phaseStageId: number;
  stateId: number;
  status: boolean;
}
