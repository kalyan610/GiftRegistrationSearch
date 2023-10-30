import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/attachments";
import "@pnp/sp/files";


export default class Service {

    public mysitecontext: any;

    public constructor(siteUrl: string, Sitecontext: any) {
        this.mysitecontext = Sitecontext;


        sp.setup({
            sp: {
                baseUrl: siteUrl

            },
        });

    }


     public async getEnvironment():Promise<any>
     {
     
     return await sp.web.lists.getByTitle("Environment").items.select('Title','ID').expand().get().then(function (data:any) {
      
     return data;
     
     });
    }     

    public async getCurrentUser(): Promise<any> {
        try {
            return await sp.web.currentUser.get().then(result => {
                return result;
            });
        } catch (error) {
            console.log(error);
        }
      }
   
    public async GetReqCountries(MyLoginUser:String):Promise<any>
    {


    let filtercondition: any = " (Reviewer eq '" + MyLoginUser + "')" ;
 
     return await sp.web.lists.getByTitle("ReviewerswithBusinessUnit").items.select('Title','ID').expand().filter(filtercondition).get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }



public async GetByCountryRecievedDetails(SelContryName: string):Promise<any>
{

 let filtercondition: any = "(CountryName eq '" + SelContryName + "')";

 return await  sp.web.lists.getByTitle("Gift Registry Submissions Received").items.select("*").filter(filtercondition).get().then(function (data) {

 return data;

 });

}

public async GetByCountryGivenDetails(SelContryName: string):Promise<any>
{

 let filtercondition: any = "(CountryName eq '" + SelContryName + "')";

 return await  sp.web.lists.getByTitle("Gift Registry Submissions Given").items.select("*").filter(filtercondition).get().then(function (data) {

 return data;

 });

}
   
   
public async getItemByIDRecived(ItemID: any): Promise<any> {
    try {

const selectedList = 'Gift Registry Submissions Received';
const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*,Attachments,AttachmentFiles,SignOff/EMail,RiskReviewer/EMail").expand("AttachmentFiles,SignOff,RiskReviewer").filter("ID eq '" + ItemID + "'").get();
        return Item[0];
    } catch (error) {
        console.log(error);
    }
}

public async getItemByIDGiven(ItemID: any): Promise<any> {
    try {

const selectedList = 'Gift Registry Submissions Given';
const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*,Attachments,AttachmentFiles,SignOff/EMail,RiskReviewer/EMail").expand("AttachmentFiles,SignOff,RiskReviewer").filter("ID eq '" + ItemID + "'").get();
        return Item[0];
    } catch (error) {
        console.log(error);
    }
}
  
  
    
}