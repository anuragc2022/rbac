
interface Information {
    name: string;
    designation: string
    salary: string
    email: string
    experience: string
    city: string
  }
  
  export default class User {
    private name: string;
    private designation: string
    private salary: string
    private email: string
    private experience: string
    private city: string
    private isShowComponent1: boolean
    private isShowComponent2: boolean
  
    public constructor(information: Information, isShowSalary: boolean, isShowComponent1: boolean, isShowComponent2: boolean) {
      this.name = information.name;
      this.designation = information.designation;
      this.salary = isShowSalary ? information.salary : "XXXXXXXX";
      this.email = information.email;
      this.experience = information.experience;
      this.city = information.city;
      this.isShowComponent1 = isShowComponent1;
      this.isShowComponent2 = isShowComponent2;
    }
  
    public getComponents(): any {
      let components: any = {};
      if (this.isShowComponent1) {
        components.component1 = {
          name: this.name,
          email: this.email,
          salary: this.salary
        };
      }
      if (this.isShowComponent2) {
        components.component2 = {
          designation: this.designation,
          experience: this.experience,
          city: this.city
        };
      }
      return components;
    };
  }