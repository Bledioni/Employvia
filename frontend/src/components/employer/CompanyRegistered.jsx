import react from "react";
import { Link } from "react-router-dom";
import companyregistered from '../employer/style/companyregistered.css';

function CompanyRegistered(){

    return(     
    <div>
        <div className="insert-company-headline">
        <h4>EmployVia</h4>
        <div className="insert-company-headline-setup-progress">
          <p>Setup Progress</p>
          <div className="insert-company-headline-setup-progress-1"></div>
        </div>
      </div>
            
      <div className="company-registered-dashboard">
        <i class="fa-solid fa-check-double"></i>
        <h3>🎉Congratulations, Your profile is 100% complete!</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dicta hic eos mollitia in explicabo iure non tempore maiores accusantium.</p>
        <Link to='/postjob'><button>Post Job</button></Link>
      </div>
    </div>
      
        
    )

}

export default CompanyRegistered;