import type { EnterpriseProps } from "../types/enterpriseProps";

export class EnterpriseEntity {
  public idEnterprise?: string;
  public nameEnterprise!: string;
  public companyName?: string;
  public cnpj!: string;
  public address!: string;
  public contactName?: string;
  public contactEmail?: string;
  public contactPhone?: string;
  public wasteType!: string;
  public scheduleFrequency?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Partial<EnterpriseProps>) {
    Object.assign(this, props);
  }
}
