import * as React from 'react';
import styles from './GiftRegistrationSearchbyCountry.module.scss';
import { IGiftRegistrationSearchbyCountryProps } from './IGiftRegistrationSearchbyCountryProps';
import { Dropdown,IDropdownStyles,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";

import Service from './Service1';

import {Stack,IStackStyles,StackItem,IStackTokens} from 'office-ui-fabric-react'; 

import {IconButton} from '@fluentui/react';

import { Checkbox} from 'office-ui-fabric-react/lib/Checkbox'; 

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const stackTokens1 = { childrenGap: 80 };

const stackButtonStyles: Partial<IStackStyles> = { root: { Width: 20 } };

const stackButtonStylesview: Partial<IStackStyles> = { root: { Width: 10 } };

const sectionStackTokens: IStackTokens = { childrenGap: 10 };

const TestsectionStackTokens: IStackTokens = { childrenGap: 20 };

const drpRecorGet:IDropdownOption[]=[ { key: "Select", text: "Select"}, { key: "Received", text: "Received"},  { key: "Given", text: "Given" }];  

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };

let Userreqemail = '';

let CountryNameSelected='';

let ItemInfo1='';

let MyCountryNameVal='';


export interface IGiftRegistartionCountry
{
  
  MyCountryName:any;
  CountryItems:any;
  MyRequesType:any;
  UserLoginName:any;


  recivedlistItems: any[];
  FlasgRecievedData:boolean;
  TotalrecivedPages:number;
  NofItemsPerPage:number;
  TempListItems: any[];

  TotalPages: number;
  flag:boolean;

  YourNameRecieved:string;
  YourTitleRecieved:string;
  CountryReciveved:string;

  FromNameReceived:string;
  IsgiverPRPReceived:string;
  FromCompanyReceived:string;
  FromTitleReceived:String;
  FromAddressReceived:string;

  ValueofgiftReceived:string;
  CurrencyReceived:string;
  DescriptionofGiftReceieved:string;

  Recevingpart:string;
  dtgiftrecieved:any;
  Businesspurposeofgiftreceived:string;
  addcommentsrecived:string;

  AttachmentFiles:any;

  //Given

  GivenlistItems:any[];
  FlagGivenData:boolean;
  TotalGivenPages:number;

  YourNameGiven:string;
  YourTitleGiven:string;
  CountryGiven:string;
  TempListItemsGiven:any[];

  Givename:any;
  MyYesnoGiven:any;
  GivenCompany:any;
  GivenTitle:any;
  GivenAddress:any;

  ValueofGiftgiven:any;
  MyCurrencyvalueGiven:any;
  descofgitgiven:any;
  Givingparty:any;
  dtgiftgiven:any;

  businesspurposegiftgiven:any;
  addcommentsgiven:any;
  GiftRegistryIDGiven:any;
  GiftRegistryIDRecevied:any;

  TempListItemsRecived:any[];

  AllListItems:any[];

  RiskReviewerGiven:any;
  RiskReviewGiven:any;
  RiskApprovesignGiven:any;
  SignoffGiven:any;

  RiskReviewerRecived:any;
  RiskReviewRecived:any;
  RiskApprovesignRecived:any;
  SignoffRecived:any;
  Mycheckbox:boolean;

  //End

}




export default class GiftRegistrationSearchbyCountry extends React.Component<IGiftRegistrationSearchbyCountryProps, IGiftRegistartionCountry> {
  
  public _service: any;
  public GlobalService1: any;
  protected ppl:any;

  public constructor(props:IGiftRegistrationSearchbyCountryProps) {

    super(props);

    this.state={
     
      MyCountryName:"",
      CountryItems:[],
      MyRequesType:"",
      UserLoginName:"",

      recivedlistItems:[],
      FlasgRecievedData:false,
      TotalrecivedPages:null,
      NofItemsPerPage:10,
      TempListItems:[],

      TotalPages: null,
      flag:false,

      YourNameRecieved:"",
      YourTitleRecieved:"",
      CountryReciveved:"",

      FromNameReceived:"",
      IsgiverPRPReceived:"",
      FromCompanyReceived:"",
      FromTitleReceived:"",
      FromAddressReceived:"",

      ValueofgiftReceived:"",
      CurrencyReceived:"",
      DescriptionofGiftReceieved:"",

      Recevingpart:"",
      dtgiftrecieved:"",
      Businesspurposeofgiftreceived:"",
      addcommentsrecived:"",
      AttachmentFiles:[],

      GivenlistItems:[],
      FlagGivenData:false,
      TotalGivenPages:null,

      YourNameGiven:"",
      YourTitleGiven:"",
      CountryGiven:"",
      TempListItemsGiven:[],

      Givename:"",
      MyYesnoGiven:"",
      GivenCompany:"",
      GivenTitle:"",
      GivenAddress:"",

      ValueofGiftgiven:"",
      MyCurrencyvalueGiven:"",
      descofgitgiven:"",
      Givingparty:"",
      dtgiftgiven:"",
      businesspurposegiftgiven:"",
      addcommentsgiven:"",
      GiftRegistryIDGiven:"",
      GiftRegistryIDRecevied:"",
      TempListItemsRecived:[],
      AllListItems:[],
    
      RiskReviewerGiven:"",
      RiskReviewGiven:"",
      RiskApprovesignGiven:"",
      SignoffGiven:"",
    
      RiskReviewerRecived:"",
      RiskReviewRecived:"",
      RiskApprovesignRecived:"",
      SignoffRecived:"",
      Mycheckbox:true
    



     };

     
     this._service = new Service(this.props.url, this.props.context);

     this.getUserDetails();

     console.log(ItemInfo1);
     
    
    }

    public onBackbuttonClick() {
  
      this.setState({ flag: false });
      
    //  this.GetCountries1(Userreqemail);

    //  //this.setState({MyCountryName:MyCountryNameVal});

    //  this.setState({ MyCountryName:'Select' });
  
    }

    private async getUserDetails()
    {
      let result= await this._service.getCurrentUser();
  
      Userreqemail = result.Email;
      
      this.setState({UserLoginName:result.Email});

      //this.GetAllCountries(Userreqemail);

      this.GetCountries1(Userreqemail);
  
    }

    public async GetCountries1(UserreqEmail:string)
    {

    var data = await this._service.GetReqCountries(UserreqEmail);

    var AllCountries: any = [];

    var myCountryLocal: any = [];

    let countrylevel = data[0].Title;

    
    let arr = countrylevel.split(',')

    for ( var count=0; count<arr.length;count++) {
      AllCountries.push({ key: arr[count], text: arr[count] });
    }

    console.log(AllCountries);

    AllCountries.map((item:any) => {
      let Itemexsits = false;

      if (myCountryLocal != null) {
        if (myCountryLocal && myCountryLocal.length > 0) {

          myCountryLocal.map((ditem:any) => {
            if (ditem.key === item.key) 
            {

              Itemexsits = true;
            }

          });
        }

        if (!Itemexsits) {

          myCountryLocal.push({ key: item.key, text: item.text });
        }

      }
    });


    this.setState({ CountryItems: myCountryLocal });

    
    }

   

    private hadleRequesType(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

      
    
      this.setState({ MyRequesType:item.key });

      if(item.key=='Received')
      {

        this.getRecivedCountryDetails(CountryNameSelected);
   

      }

      else if(item.key=='Given')
      {

        this.getGivenCountryDetails(CountryNameSelected);

      }

      else 
      {

        alert('Please select RequestType')
        
      }
  
      
    }


    private changeCountry(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

      if(item.key=='Select')
      {

        alert('Please select Country Name')
      }

      else
      {

    this.setState({ MyCountryName:item.key });

    CountryNameSelected=item.text;

    this.setState({ MyRequesType:'Select' });

     
      }

    
    
  }

  public async GetRecievedRecordsByID(ievent:any, itemId:number) 
  {

   let  ItemInfo1 = await this._service.getItemByIDRecived(itemId);

    if (ItemInfo1.Title != '') {
  
    this.setState({ flag: true });

    this.setState({YourNameRecieved:ItemInfo1.YourName});
    this.setState({YourTitleRecieved:ItemInfo1.YourTitle});
    this.setState({CountryReciveved:ItemInfo1.CountryName});

     MyCountryNameVal=ItemInfo1.CountryId;

     console.log(MyCountryNameVal);

      //region2
      this.setState({FromNameReceived:ItemInfo1.FromName});
      this.setState({IsgiverPRPReceived: ItemInfo1.IsGiveraPEP})
      this.setState({FromCompanyReceived:ItemInfo1.FromCompany});
      this.setState({FromTitleReceived:ItemInfo1.FromTitle});
      this.setState({FromAddressReceived:ItemInfo1.FromAddress});

      //End

      //region3

      this.setState({ValueofgiftReceived:ItemInfo1.ValueofGift});
      this.setState({CurrencyReceived: ItemInfo1.Currency})
      this.setState({DescriptionofGiftReceieved:ItemInfo1.DescriptionofGift});

      //End

    this.setState({Recevingpart:ItemInfo1.ReceivingParty});
     let strdoj= ItemInfo1.DateGiftWasReceived.split('T');
     strdoj[0].replace("-","/");
    let mainstr=strdoj[0].replace("-","/");
    //let strToDate = new Date(mainstr);
    this.setState({dtgiftrecieved:mainstr})

    this.setState({Businesspurposeofgiftreceived:ItemInfo1.BusinessPurposeofGift});
    this.setState({addcommentsrecived:ItemInfo1.AdditionalCommentsforGift});
    this.setState({addcommentsrecived:ItemInfo1.GiftRegistryID});
    this.setState({GiftRegistryIDRecevied:ItemInfo1.GiftRegistryID});

    this.setState({AttachmentFiles:ItemInfo1.AttachmentFiles})

    this.setState({AttachmentFiles:ItemInfo1.AttachmentFiles})

    //Received
    
    this.setState({RiskReviewRecived:ItemInfo1.RiskReviewPolicy});
    this.setState({SignoffRecived:ItemInfo1.SignOff.EMail});

    this.setState({RiskReviewerRecived:ItemInfo1.RiskReviewer.EMail});

    //End

    }

    console.log(ItemInfo1);

  }

  public async GetGivenRecordsByID(ievent:any, itemId:number) 
  {

   let  ItemInfo1 = await this._service.getItemByIDGiven(itemId);

    if (ItemInfo1.Title != '') {
  
    this.setState({ flag: true });

    this.setState({YourNameGiven:ItemInfo1.YourName});
    this.setState({YourTitleGiven:ItemInfo1.YourTitle});
    this.setState({CountryGiven:ItemInfo1.CountryName});

    //   //region2
    
       this.setState({Givename:ItemInfo1.Name});
      //Problem
      this.setState({MyYesnoGiven:ItemInfo1.EntertainmentgiventoPEP});
      this.setState({GivenCompany:ItemInfo1.Company});
      this.setState({GivenTitle:ItemInfo1.TitleforGivenGift});
      this.setState({GivenAddress:ItemInfo1.Address});

    //   //End

    //   //region3

    this.setState({ValueofGiftgiven:ItemInfo1.ValueofGift});
    this.setState({MyCurrencyvalueGiven:ItemInfo1.Currency});
    this.setState({descofgitgiven:ItemInfo1.DescriptionofGift});
    this.setState({Givingparty:ItemInfo1.GivingParty});

   let strdoj= ItemInfo1.DateGiftWasGiven.split('T');
   strdoj[0].replace("-","/");
   let mainstr=strdoj[0].replace("-","/");
   this.setState({dtgiftgiven:mainstr})

   this.setState({GiftRegistryIDGiven:ItemInfo1.GiftRegistryID});
    

    //END

    this.setState({businesspurposegiftgiven:ItemInfo1.BusinessPurposeofGift});

    this.setState({addcommentsgiven:ItemInfo1.AdditionalCommentsforGift});
    
    this.setState({AttachmentFiles:ItemInfo1.AttachmentFiles})

    this.setState({RiskReviewGiven:ItemInfo1.RiskReviewPolicy});
    this.setState({SignoffGiven:ItemInfo1.SignOff.EMail});

    this.setState({RiskReviewerGiven:ItemInfo1.RiskReviewer.EMail});
    
    }

    console.log(ItemInfo1);

  }


  public async getRecivedCountryDetails(MyCountryName:string)
  {


    let ItemInfo = await this._service.GetByCountryRecievedDetails(MyCountryName);

    console.log(ItemInfo);

    this.setState({ recivedlistItems: ItemInfo });

    this.setState({ TotalrecivedPages: Math.ceil(this.state.recivedlistItems.length / this.state.NofItemsPerPage) });

    if (ItemInfo.length == 0) {
  
      this.setState({ FlasgRecievedData: true });

      this.setState({ FlagGivenData: false });

    }

    else 
    {

      this.setState({ FlasgRecievedData: false });

      this.setState({ FlagGivenData: false });
    }

    if (ItemInfo.length > 10) {
  
      
      let TempArray2 = [];

      for (let count = 0; count < this.state.NofItemsPerPage; count++) {
        TempArray2.push(ItemInfo[count]);

      }

      this.setState({ TempListItems: TempArray2 });



    }

    else {

      //this.setState({ FlasgRecievedData: false });
      this.setState({ TempListItems: ItemInfo });
    }


  }

  public async getGivenCountryDetails(MyCountryName:string)
  {


    let ItemInfo = await this._service.GetByCountryGivenDetails(MyCountryName);

    console.log(ItemInfo);

    this.setState({ GivenlistItems: ItemInfo });

    this.setState({ TotalGivenPages: Math.ceil(this.state.GivenlistItems.length / this.state.NofItemsPerPage) });

    if (ItemInfo.length == 0) {
  
      this.setState({ FlagGivenData: true });

      this.setState({ FlasgRecievedData: false });

    }

    else
    {

      this.setState({ FlagGivenData: false });

      this.setState({ FlasgRecievedData: false });

    }

    if (ItemInfo.length > 10) {

      
  
      let TempArray2 = [];

      for (let count = 0; count < this.state.NofItemsPerPage; count++) {
        TempArray2.push(ItemInfo[count]);

      }

      this.setState({ TempListItemsGiven: TempArray2 });

    }

    else {

      //this.setState({ FlagGivenData: false });

      this.setState({ TempListItemsGiven: ItemInfo });
    }

  }


  public async getAllCountryDetails(MyCountryName:string)
  {


    let ItemInfoGiven = await this._service.GetByCountryGivenDetails(MyCountryName);

    let ItemInfoReceived = await this._service.GetByCountryRecievedDetails(MyCountryName);

    console.log(ItemInfoGiven);

    console.log(ItemInfoReceived);


    this.setState({ GivenlistItems: ItemInfoGiven });

    this.setState({ recivedlistItems: ItemInfoReceived });

    let TempArray3=[];

    for(let count=0;count<this.state.GivenlistItems.length;count++)
      {
        TempArray3.push(this.state.GivenlistItems[count]);
  
      }

      for(let count=0;count<this.state.recivedlistItems.length;count++)
      {
        TempArray3.push(this.state.recivedlistItems[count]);
  
      }

      this.setState({AllListItems:TempArray3});


    this.setState({ TotalGivenPages: Math.ceil(this.state.GivenlistItems.length / this.state.NofItemsPerPage) });

    this.setState({ TotalrecivedPages: Math.ceil(this.state.recivedlistItems.length / this.state.NofItemsPerPage) });



    if (ItemInfoGiven.length == 0) {
  
      this.setState({ FlagGivenData: true });

    }

    if(ItemInfoReceived.length == 0)
    {

      this.setState({ FlasgRecievedData: true });
    }

    if (ItemInfoReceived.length > 10) {
  
      let TempArray2 = [];

      for (let count = 0; count < this.state.NofItemsPerPage; count++) {
        TempArray2.push(ItemInfoReceived[count]);

      }

      this.setState({ TempListItemsRecived: TempArray2 });

    }

    else {

      this.setState({ TempListItemsRecived: ItemInfoReceived });
    }

    if (ItemInfoGiven.length > 10) {
  
      let TempArray2 = [];

      for (let count = 0; count < this.state.NofItemsPerPage; count++) {
        TempArray2.push(ItemInfoGiven[count]);

      }

      this.setState({ TempListItemsGiven: TempArray2 });

    }

    else {

      this.setState({ TempListItemsGiven: ItemInfoReceived });
    }



  }

  private _getPage(page: number) {
  
    console.log('Page:', page);

    let TempArray2 = [];

    let listItems = this.state.recivedlistItems;

    for (let count = (page - 1) * this.state.NofItemsPerPage; count < listItems.length && count < (this.state.NofItemsPerPage * page); count++) {

      TempArray2.push(listItems[count]);

    }

    this.setState({ TempListItems: TempArray2 });

    //this.setState({ flag: true });



  }


  public render(): React.ReactElement<IGiftRegistrationSearchbyCountryProps> {
  

    return (

      
  
<Stack tokens={stackTokens} styles={stackStyles} >

{/* Only two dropdowns */}

{this.state.flag==false &&

<Stack>
<StackItem className={styles.coststyle}>

<b><label className={styles.labelsFonts}>Select Country <label className={styles.recolorss}>*</label></label></b><br/><br/>  

  <Dropdown
    placeholder="Select  Country"
    options={this.state.CountryItems}
    className={styles.onlyFont}
    selectedKey={this.state.MyCountryName ? this.state.MyCountryName : undefined}
    onChange={this.changeCountry.bind(this)}
    styles={dropdownStyles}
  />
</StackItem>
<br></br>

<StackItem>
<b><label className={styles.labelsFonts}>Request Type <label className={styles.recolorss}>*</label></label></b><br/><br/>  
<Dropdown className={styles.onlyFont}
  placeholder="Select  RequesType"
  options={drpRecorGet}
  styles={dropdownStyles}
  selectedKey={this.state.MyRequesType ? this.state.MyRequesType : undefined} onChange={this.hadleRequesType.bind(this)}/><br></br>
</StackItem>
</Stack>
 }

{/* #region Recieved records not found */}

{this.state.recivedlistItems.length == 0&& this.state.FlasgRecievedData == true&& this.state.MyRequesType=='Received' &&
  
  <Stack className={styles.myBackcolor}>

    <Stack horizontal tokens={sectionStackTokens}>
      <StackItem className={styles.teams}>
        <b>Records Not found with the Above Criteria</b>
      </StackItem>
    </Stack>
  </Stack>
}
{/* #endregion

#region FirstScreen Recieved Values */}

{/* {this.state.FlasgRecievedData == false && this.state.flag == false && this.state.MyRequesType=='Received'&&  this.state.TempListItems.map((item, index) => (
  
<Stack className={styles.myBackcolor}>

     <Stack horizontal tokens={sectionStackTokens} className={styles.myBackcolor}>
      <StackItem className={styles.msTeams} >
      {item.GiftRegistryID == null ? 'N/A' : item.GiftRegistryID}
      </StackItem>
      <StackItem>
      
      {<PrimaryButton text="View" onClick={(event) => {this.GetRecievedRecordsByID(event, item.ID) }} styles={stackButtonStyles} className={styles.button} value={item.ID} />}
      </StackItem>
      </Stack>

    <br />
    

    <Stack horizontal tokens={sectionStackTokens}>
      <StackItem className={styles.welcomeImage}>
        <b> Your Name</b>
      </StackItem>
      <StackItem className={styles.welcomeImage}>
      <b>Your Title</b>
      </StackItem>
      <StackItem className={styles.welcomeImage}>
      <b>Country</b>
      </StackItem>
      </Stack>

                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                {item.YourName == null ? 'N/A' : item.YourName}
                </StackItem>
                <StackItem className={styles.commonstyle}>
                {item.YourTitle == null ? 'N/A' : item.YourTitle}
                </StackItem>
                <StackItem className={styles.commonstyle}>
                {item.CountryName == null ? 'N/A' : item.CountryName}
                </StackItem>
                </Stack>

                </Stack>

)
)
}

{/* #endregion */}


{this.state.FlasgRecievedData == false && this.state.flag == false && this.state.MyRequesType=='Received'&&  this.state.TempListItems.map((item, index) => (
  
<Stack className={styles.blockcolor}>

    <Stack horizontal tokens={TestsectionStackTokens}>
      <StackItem className={styles.testStackItem}>
      {item.GiftRegistryID == null ? 'N/A' : item.GiftRegistryID}
      </StackItem>
      <StackItem>
      
      {<PrimaryButton text="View" onClick={(event) => {this.GetRecievedRecordsByID(event, item.ID) }} styles={stackButtonStylesview} className={styles.viewbutton} value={item.ID} />}
      </StackItem>
    </Stack>

    <br />
    
    <Stack horizontal tokens={TestsectionStackTokens}>
    <StackItem className={styles.welcomeImageTest}>
        <b> Your Name</b>
      </StackItem>
      <StackItem className={styles.welcomeImageTest}>
      <b>Your Title</b>
      </StackItem>
      <StackItem className={styles.welcomeImageTest}>
      <b>Country</b>
      </StackItem>
      </Stack>

  <Stack horizontal tokens={TestsectionStackTokens}>
                <StackItem className={styles.commonstyleTest}>
                {item.YourName == null ? 'N/A' : item.YourName}
                </StackItem>
                <StackItem className={styles.commonstyleTest}>
                {item.YourTitle == null ? 'N/A' : item.YourTitle}
                </StackItem>
                <StackItem className={styles.commonstyleTest}>
                {item.CountryName == null ? 'N/A' : item.CountryName}
                </StackItem>
  </Stack>

</Stack>

)
)
}

{this.state.recivedlistItems.length > 10 && this.state.flag == false && this.state.MyRequesType=='Received' &&
  
  <div className={styles.pagealign}> 
  <Pagination 
    currentPage={0}
    totalPages={this.state.TotalrecivedPages}
    onChange={(page) => this._getPage(page)}
    limiter={3} // Optional - default value 3
    limiterIcon={"More"} // Optional
  />

</div>

}

{/* #endregion





#region Backbuttonwith allSections RecivedValues */}

{this.state.flag == true && this.state.recivedlistItems.length > 0 && this.state.MyRequesType=='Received' &&

<Stack>
<Stack>

<Stack horizontal tokens={sectionStackTokens}>
        <StackItem>
       <IconButton iconProps={{ iconName: "Back" }} styles={stackButtonStyles} className={styles.button} title="Back" ariaLabel="Back" onClick={(event) => { this.onBackbuttonClick() }} />
        </StackItem>
         </Stack>
         <br></br>
        </Stack>

<Stack horizontal tokens={stackTokens1}>

<StackItem className={styles.coststylediv1} >

<b>{this.state.GiftRegistryIDRecevied}</b>

<br></br>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Gift Registry</label></b><br></br><br></br>

</div>

<div className={styles.testcssborder}>  

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Gift Register Identification</label></b><br></br><br></br>

</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Your Name</label></b><br/><br/>
{this.state.YourNameRecieved}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Your Title</label></b><br/><br/>  
{this.state.YourTitleRecieved}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Property Country</label></b><br/><br/>  
{this.state.MyCountryName}
</div>

</div>
<br></br><br></br><br></br>

<div className={styles.testcssborder}> 
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Was the Gift / Entertainment Received or Given on Behalf of Capco</label></b><br/><br/>  
Capco Received the Gift/Entertainment
</div>
</div>

</StackItem>
</Stack>



<div className={styles.Divsection}>

<b><label className={styles.HeadLable}>Recieved Gift / Entertainment for Capco</label></b>

</div>

<Stack horizontal tokens={stackTokens1}>

<StackItem className={styles.coststylediv} >

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Identify who gave the gift</label></b><br/>  

</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Name</label></b><br/><br/>
{this.state.FromNameReceived}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Is Giver a PEP (Politically Exposed Person)</label></b><br/><br/>  
{this.state.IsgiverPRPReceived}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Company (Politically Exposed Person)</label></b><br/><br/>  
{this.state.FromCompanyReceived}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Title (Politically Exposed Person)</label></b><br/><br/>  
{this.state.FromTitleReceived}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Address (Politically Exposed Person)</label></b><br/><br/>  
{this.state.FromAddressReceived}
</div>

</StackItem>

<StackItem className={styles.coststylediv} >

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Description of Gift / Entertainment</label></b><br/>  

</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Value of the Gift</label></b><br/><br/>
{this.state.ValueofgiftReceived}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Currency</label></b><br/><br/>
{this.state.CurrencyReceived}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Description</label></b><br/><br/>
{this.state.DescriptionofGiftReceieved}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Receiving Party</label></b><br/><br/>
{this.state.Recevingpart}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Date Gift Was Received</label></b><br/><br/>
{this.state.dtgiftrecieved}
</div>


</StackItem>
<StackItem className={styles.coststylediv} >
<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Define Gift / Entertainment</label></b><br/>  
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Business Purpose of Gift</label></b><br/><br/>
{this.state.Businesspurposeofgiftreceived}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Additional Comments</label></b><br/><br/>
{this.state.addcommentsrecived}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Attachments</label></b><br/><br/>
{this.state.AttachmentFiles.length>0 && this.state.AttachmentFiles.map((item:any,index:any) =>( 
    <div><a href={item.ServerRelativeUrl} target="_blank">{item.FileName} </a></div>
   ))}
</div>


</StackItem>
</Stack>
<br></br>
<Stack horizontal tokens={stackTokens1}>

 <StackItem className={styles.coststylediv1} >

<b><label className={styles.HeadLable}>Risk Team Review</label></b><br></br>

<div className={styles.testcssborder}>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Risk Review</label></b><br/><br/>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Risk Reviewer</label></b><br/><br/>
{this.state.RiskReviewerRecived}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Risk Review (Does this meet policy standards)</label></b><br/><br/>  
{this.state.RiskReviewRecived}
</div>


</div>

</StackItem>

<br></br><br></br><br></br>
<StackItem className={styles.coststylediv1}>

<div className={styles.testcssborder}>
<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Gift/Entertainment</label></b><br/>  

</div>

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Risk Approver Signature</label></b><br></br><br></br>
<Checkbox label="(I have reviewed the submitted Gift/Entertainment)" checked={this.state.Mycheckbox}  value={'(I have reviewed the submitted Gift/Entertainment'}/><br></br>
</div>
<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Risk Approver Signature</label></b><br></br><br></br>
{this.state.SignoffRecived}
</div>
</div>


</StackItem>
</Stack>

</Stack>
}

{/* #endregion */}


{/* #region Given records not found */}

{this.state.GivenlistItems.length == 0&& this.state.FlagGivenData == true&& this.state.MyRequesType=='Given' &&
  
  <Stack className={styles.myBackcolor}>

    <Stack horizontal tokens={sectionStackTokens}>
      <StackItem className={styles.teams}>
        <b>Records Not found with the Above Criteria Given</b>
      </StackItem>
    </Stack>
  </Stack>
}

{/* #endregion */}

{/* #region FirstScreen Given Values */} 

{this.state.FlagGivenData == false && this.state.flag == false && this.state.MyRequesType=='Given' && this.state.TempListItemsGiven.map((item, index) => (
  
<Stack className={styles.blockcolor}>

      <Stack horizontal tokens={TestsectionStackTokens}>
      <StackItem className={styles.testStackItem}>
      {item.GiftRegistryID == null ? 'N/A' : item.GiftRegistryID}
      </StackItem>
      <StackItem>
      
      {<PrimaryButton text="View" onClick={(event) => {this.GetGivenRecordsByID(event, item.ID) }} styles={stackButtonStyles} className={styles.viewbutton} value={item.ID} />}
      </StackItem>
      </Stack>

    <br />
    

    <Stack horizontal tokens={TestsectionStackTokens}>
    <StackItem className={styles.welcomeImageTest}>
        <b> Your Name</b>
      </StackItem>
      <StackItem className={styles.welcomeImageTest}>
      <b>Your Title</b>
      </StackItem>
      <StackItem className={styles.welcomeImageTest}>
      <b>Country</b>
      </StackItem>
      </Stack>

               <Stack horizontal tokens={TestsectionStackTokens}>
               <StackItem className={styles.commonstyleTest}>
                {item.YourName == null ? 'N/A' : item.YourName}
                </StackItem>
                <StackItem className={styles.commonstyleTest}>
                {item.YourTitle == null ? 'N/A' : item.YourTitle}
                </StackItem>
                <StackItem className={styles.commonstyleTest}>
                {item.CountryName == null ? 'N/A' : item.CountryName}
                </StackItem>
                </Stack>

</Stack>

)
)
}

{this.state.GivenlistItems.length > 10 && this.state.flag == false && this.state.MyRequesType=='Given' &&
  
  <Pagination
    currentPage={0}
    totalPages={this.state.TotalGivenPages}
    onChange={(page) => this._getPage(page)}
    limiter={3} // Optional - default value 3
    limiterIcon={"More"} // Optional
  />

}

{/* {/* #endregion */}


{/* #region Backbuttonwith allSections GivenValues  */}
{this.state.flag == true && this.state.GivenlistItems.length > 0 && this.state.MyRequesType=='Given' &&

<Stack>
<Stack>
  
<Stack horizontal tokens={sectionStackTokens}>
        <StackItem>
       <IconButton iconProps={{ iconName: "Back" }} styles={stackButtonStyles} className={styles.button} title="Back" ariaLabel="Back" onClick={(event) => { this.onBackbuttonClick() }} />
        </StackItem>
         </Stack>
         <br></br>
        </Stack>

<Stack horizontal tokens={stackTokens1}>

<StackItem className={styles.coststylediv1} >

<b>{this.state.GiftRegistryIDGiven}</b>

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Gift Registry</label></b><br></br><br></br>

</div>


<div className={styles.testcssborder}>  

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Gift Register Identification</label></b><br></br><br></br>

</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Your Name</label></b><br/><br/>
{this.state.YourNameGiven}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Your Title</label></b><br/><br/>  
{this.state.YourTitleGiven}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Property Country</label></b><br/><br/>  
{this.state.GivenCompany}
</div>
</div>
<br></br><br></br>

<div className={styles.testcssborder}> 
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Was the Gift / Entertainment Received or Given on Behalf of Capco</label></b><br/><br/>  
Capco Given the Gift/Entertainment
</div>
</div>

</StackItem>
</Stack>



<div className={styles.Divsection}>

<b><label className={styles.HeadLable}>Given Gift / Entertainment for Capco</label></b>

</div>

<Stack horizontal tokens={stackTokens1}>

<StackItem className={styles.coststylediv} >

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Identify who gave the gift</label></b><br/>  

</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Name</label></b><br/><br/>

{this.state.Givename}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Gift / Entertainment given to PEP ( Politically Exposed Person ) </label></b><br/><br/>  
{this.state.ValueofGiftgiven}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Company</label></b><br/><br/>  
{this.state.GivenCompany}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Title (Politically Exposed Person)</label></b><br/><br/>  
{this.state.GivenTitle}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}> Address</label></b><br/><br/>  
{this.state.GivenAddress}
</div>

</StackItem>

<StackItem className={styles.coststylediv} >

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Description of Gift / Entertainment</label></b><br/>  

</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Value of the Gift</label></b><br/><br/>
{this.state.ValueofGiftgiven}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Currency</label></b><br/><br/>
{this.state.MyCurrencyvalueGiven}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Description</label></b><br/><br/>
{this.state.descofgitgiven}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Giving Party</label></b><br/><br/>
{this.state.Givingparty}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Date Gift Was Given</label></b><br/><br/>
{this.state.dtgiftgiven}
</div>


</StackItem>
<StackItem className={styles.coststylediv} >
<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Define Gift / Entertainment</label></b><br/>  
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Business Purpose of Gift</label></b><br/><br/>
{this.state.businesspurposegiftgiven}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Additional Comments</label></b><br/><br/>
{this.state.addcommentsgiven}
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Attachments</label></b><br/><br/>
{this.state.AttachmentFiles.length>0 && this.state.AttachmentFiles.map((item:any,index:any) =>( 
    <div><a href={item.ServerRelativeUrl} target="_blank">{item.FileName} </a></div>
   ))}
</div>


</StackItem>
</Stack>

<br></br><br></br>

<Stack horizontal tokens={stackTokens1}>

 <StackItem className={styles.coststylediv1} >

<b><label className={styles.HeadLable}>Risk Team Review</label></b><br></br>

<div className={styles.testcssborder}>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Risk Review</label></b><br/><br/>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Risk Reviewer</label></b><br/><br/>
{this.state.RiskReviewerGiven}
</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Risk Review (Does this meet policy standards)</label></b><br/><br/>  
{this.state.RiskReviewGiven}
</div>


</div>

</StackItem>

<br></br>
<StackItem className={styles.coststylediv1}>

<div className={styles.testcssborder}>
<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Gift/Entertainment</label></b><br/>  

</div>

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Risk Approver Signature</label></b><br></br><br></br>
<Checkbox label="(I have reviewed the submitted Gift/Entertainment)" checked={this.state.Mycheckbox}  value={'(I have reviewed the submitted Gift/Entertainment'}/><br></br>
</div>
<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Risk Approver Signature</label></b><br></br><br></br>
{this.state.SignoffGiven}
</div>

</div>

</StackItem>
</Stack>


</Stack>
}


{/* #endRegion */}

{/* //AllItems

{this.state.AllListItems.length == 0&& this.state.FlasgRecievedData == true &&this.state.FlagGivenData == true && this.state.MyRequesType=='All' &&
  
  <Stack className={styles.myBackcolor}>

    <Stack horizontal tokens={sectionStackTokens}>
      <StackItem className={styles.teams}>
        <b>Records Not found with the Above Criteria for All</b>
      </StackItem>
    </Stack>
  </Stack>
}

//End */}


</Stack>


      
    );
  
  }

}

