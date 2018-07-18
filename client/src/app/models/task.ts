export class Task {
    Id: string;
    Name: string;
    Description: string;
    projectId: number;
    InitialDate: string;
    FinalDate: string;
    Status: string;
    ProjectId: string;
    EmployeeId: string;
    ServiceId: string;
    MaterialId: string;
    EquipmentId: string;
    ForgeObjs: [{
        DbId: String,
        ExternalId: String,
        Name: String
      }] 
}