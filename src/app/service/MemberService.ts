import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/top-users";
      const users = await axios.get(url);
      console.log("getTopUser: ", users);

      return users.data;
    } catch (err) {
      console.log("getTopUsers Error: ", err);
      throw err;
    }
  }

  public async getRestaurnt(): Promise<Member> {
    try {
      const url = this.path + "/member/restaurant";
      const result = await axios.get(url);
      console.log("getTopUser: ", result);


      const restaurant: Member = result.data
      return restaurant;
    } catch (err) {
      console.log("getTopUsers Error: ", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + "/member/signup";
      const result = await axios.post(url, input, {withCredentials: true});
      console.log("SignUp: ", result);


      const member: Member = result.data
      return member;
    } catch (err) {
      console.log("SignUp Error: ", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + "/member/login";
      const result = await axios.post(url, input, {withCredentials: true});
      console.log("Login: ", result);


      const member: Member = result.data
      localStorage.setItem("memberData", JSON.stringify(member))
      return member;
    } catch (err) {
      console.log("Login Error: ", err);
      throw err;
    }
  }

  public async logout(): Promise<boolean>{
    try{
      const url = this.path + "/member/logout";
      const result = await axios.post(url, {}, {withCredentials: true});
      console.log("Login: ", result);
      
      localStorage.removeItem("memberData")
      return result.data.logout;
    } catch (err) {
      console.log("Logout Error: ", err);
      throw err;
    }

  }




}

export default MemberService;