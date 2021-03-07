interface ICreateUserDTO {
  name: string;
  email: string;
  birthday: Date;
  gender: string;
  avatarUrl?: string;
  password: string;
}

export default ICreateUserDTO;
