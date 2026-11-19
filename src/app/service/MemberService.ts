import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";

class MemberService {
    private readonly path: string;

    constructor(){
        this.path = serverApi;
    }

    public async getTopUsers(): Promise<Member[]>{
        try{
            const url = this.path + "/member/top-users";
            const users = await axios.get(url);
            console.log("getTopUser: ", users);

            return users.data;
        }catch (err){
            console.log("getTopUsers Error: ", err);
            throw err;
        }
    }

    public async getRestaurnt(): Promise<Member>{
        try{
            const url = this.path + "/member/restaurant";
            const result = await axios.get(url);
            console.log("getTopUser: ", result);

        
            const restaurant: Member = result.data
            return restaurant;
        }catch (err){
            console.log("getTopUsers Error: ", err);
            throw err;
        }
    }
}

export default MemberService;