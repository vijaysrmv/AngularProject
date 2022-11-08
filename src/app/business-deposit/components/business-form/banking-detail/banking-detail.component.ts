import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
interface BankingDeatils {
  id:number;
  facilityType: string;
  loanNo: string;
  existinglimit: string;
  tenure: string;
  bankFinancial:string;
  maturityDate:string;
  accountclassification:string;
}

@Component({
  selector: 'app-banking-detail',
  templateUrl: './banking-detail.component.html',
  styleUrls: ['./banking-detail.component.scss']
})
export class BankingDetailComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  users: BankingDeatils[] = [];
  facilityType: string="";
  loanNo: string="";
  existinglimit: string="";
  tenure: string="";
  bankFinancial:string="";
  maturityDate:string="";
  accountclassification:string="";
  selectedUser: any;

  ngOnInit() {
  }

  identificationType:any[] = ['CERTIFICATE OF INCORPORATION', 'CERTIFICATE OF INCUMBENCY', 'COMMERCIAL REGISTRATION NUMBER', 'DRIVING LICENSE', 'EMIRATES ID', 'GOOD STANDING CERTIFICATE', 'KHULASAT - AL - QAID', 'LABOUR CARD', 'NATIONAL ID', 'PASSPORT', 'TRADE LICENSE', 'VAT', 'VISA']

	accountClassification12=["Standard", "Sub-Standard", "Doubtful", "Loss"]
  inputElementArray:any[]=[

		
		{
			name:"Loan No.",id:"loanNo",type:"text",key:"loanNo"
		},
		{
			name:"Existing Limit Amount",id:"existinglimit",type:"text",key:"existinglimit"
		},
		
		{
			name:"Tenor (Months)",id:"tenure",type:"text",key:"tenure"
		},
		{
			name:"Bank / Financial Institution Name",id:"bankFinancial",type:"text",key:"bankFinancial"
		},
		{
			name:"Maturity Date",id:"maturityDate",type:"date",key:"maturityDate"
		},


	]

  deleteUser(selectedUserId: any) {
    debugger
    const index = this.users.findIndex(x => x.id == selectedUserId)
    this.users.splice(index, 1)
  }

  open(content: any) {
    console.log(content)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
  }

  close(closeModal: any) {
    this.setAllValues();
    closeModal.dismiss('Cross click');
  }

  setAllValues() {
    this.facilityType = ""
    this.loanNo = ""
    this.existinglimit = ""
    this.tenure = ""
    this.bankFinancial=""
    this.maturityDate=""
    this.accountclassification=""

  }

  addStudent(values: any) {
    if(this.users.length!=0)
    {
    const size = this.users.length - 1;
    values.id = this.users[size].id + 1;
    }
    else{
      values.id=1;
    }
    console.log(this.users)
    this.users.push(values);
    console.log(this.users)
    this.setAllValues();
  }

  editUser(selectedUser: any, content: any) {
    this.selectedUser = selectedUser
    console.log(selectedUser)
    
    console.log(content);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.facilityType = selectedUser.facilityType;
    this.loanNo = selectedUser.loanNo;
    this.existinglimit = selectedUser.existinglimit;
    this.tenure = selectedUser.tenure;
    this.bankFinancial= selectedUser.bankFinancial;
    this.maturityDate= selectedUser.maturityDate;
    this.accountclassification= selectedUser.accountclassification;
   
   
    
  }

  updateStudentInTable(values: any) {
    this.users.forEach(x => {
      if (x.id == this.selectedUser.id) {
        x.facilityType = values.facilityType
        x.loanNo = values.loanNo
        x.existinglimit = values.existinglimit
        x.tenure =values.tenure
        x.bankFinancial =values.bankFinancial
        x.maturityDate = values.maturityDate
        x.accountclassification = values.accountclassification

      }
    });
    this.setAllValues();
  }

  onSubmit(f: NgForm) {
    const formValues = f.value;
    console.log(formValues)
    if (this.selectedUser) {
      this.updateStudentInTable(formValues)
    }
    else {
      this.addStudent(formValues)
    }
    this.modalService.dismissAll(); //dismiss the modal
  }

}
