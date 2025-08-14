import type { UserProps } from "../types/userProps";

export class UserEntity {
	public idUser?: string;
	public name?: string;
	public email?: string;
	public password?: string;
	public isAdmin?: boolean;
	public createdAt?: Date;
	public updatedAt?: Date;

	constructor(props: Partial<UserProps>) {
		Object.assign(this, props);
	}
}
