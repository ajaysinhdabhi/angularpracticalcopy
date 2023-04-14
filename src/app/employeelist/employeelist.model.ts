import { FileHandle } from "../_model/file-handle.model";

export class EmployeeModel{
    id:number=0;
    username:any='';
    email:any='';
    phone:any='';
    role:any='';
    password:any='';
    productImages!: FileHandle[];
}