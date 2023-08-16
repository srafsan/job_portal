export interface IJobs {
  id: number;
  name: string;
  description: string;
  salary: number;
  location: string;
  experience: number;
  deadline: string;
  post_by: string;
}

export interface IInputs {
  name: string;
  description: string;
  salary: string;
  location: string;
  experience: number;
  deadline: Date;
  image: FileList;
}

export interface IUpdateModal {
  open: boolean;
  handleClose: () => void;
  job?: IJobs;
}