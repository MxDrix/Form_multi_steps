import React from 'react';
import ReactDOM from 'react-dom';
import { FormErrors } from './FormErrors';
import './index.css';

class Registration extends React.Component{
    constructor(){
        super();
        this.state = this.getInitialState();
        this.handleChange = this.handleChange.bind(this);
    };
    getInitialState = () => {
        const initialState = {            
                step: 1,
                civilite     : '',
                nom     :  '',
                prenom    : '',
                email : '',
                tel      : '',
                framework   : '',
                save: [],                
                formErrors: {email: '', tel: ''},
                emailValid: false,
                telValid: false,
                succes: false              
        };  
        return initialState;
    };

    next = () => {
        this.setState({
            step : this.state.step + 1
        })
    };
    previous = () => {
        this.setState({
            step : this.state.step - 1
        })
    };
    saveAndContinue = (e)  => {
        
        if(this.state.step === 2){
            this.saveValues(this.state);
            this.next();
        }
        if(this.state.step === 1){
            if(this.state.email === "" || this.state.nom === "" || this.state.prenom === "" || this.state.civilite === "" || this.state.tel === ""){
                this.setState({
                    error: "Merci de remplir les champs "
                });
            }else{
                this.setState({
                    error: ""
                });
                this.next();
            }
        }
    };
    saveValues = (fields) => {
        this.setState({ 
            save: [...this.state.save, fields] 
        });
    };
    save = () => {
        function create(data) {
            let options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            let baseUrl = "http://localhost:3001/inscrits";
            return fetch(baseUrl, options)
                .then((response) => response.json);
        }
          create( {id:null, inscrit: {
            civilite     : this.state.civilite,
            nom     :  this.state.nom,
            prenom    : this.state.prenom,
            email : this.state.email,
            tel      : this.state.tel,
            framework   : this.state.framework,
          } } );  
          this.setState({
              succes: true
          });
          this.next();
    };
    cancel = () => {        
        this.setState(this.getInitialState());
    };      
    handleChange = (e) => {         

        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let telValid = this.state.telValid;
    
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'tel':
            telValid = value.length > 9;
            fieldValidationErrors.tel = telValid ? '': ' est trop court';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        telValid: telValid
                      }, this.validateForm);
      }    
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
};
    FirstStep = () =>  {
        return ( 
            <div className="form_container">
            <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
            </div>
                <div className="container_block">
                    <label>Civilité</label> 
                    <select name="civilite" value={this.state.civilite} onChange={this.handleChange}>
                        <option value="">--</option>
                        <option value="Monsieur">Monsieur</option>
                        <option value="Madame">Madame</option>
                        <option value="Autre">Autre</option>
                    </select>  
                </div>
                <div className="container_block">
                    <label>Prenom</label> 
                    <input type="text" name="prenom" value={ this.state.prenom }  onChange={this.handleChange} required />  
                </div>
                <div className="container_block">
                    <label>Nom</label> 
                    <input type="text" name="nom"  value={ this.state.nom } onChange={this.handleChange} required />  
                </div>
                <div className={`container_block ${this.errorClass(this.state.formErrors.email)}`}>
                    <label>Email</label>
                    <input type="email" name="email" value={ this.state.email } onChange={this.handleChange}/>  
                </div>
                <div className={`container_block ${this.errorClass(this.state.formErrors.tel)}`}>
                    <label>Tèl</label>
                    <input type="number" id="tel" name="tel" pattern="[0-9]*" inputMode="numeric" value={ this.state.tel } onChange={this.handleChange} pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$" />   
                </div>
                <div className="container_block">
                    <button onClick={this.saveAndContinue}>Continuer</button>
                </div>
                <div className="errorMessage" >{ this.state.error }</div>
            </div>
        )
    };
    SecondStep = () => {
        return (
            <div className="form_container">
                <div className="container_block">
                    <label>Framework préféré </label>
                </div>
                <div className="container_block">
                    <label>Vue</label><input type="radio" name="framework" defaultValue={ this.state.framework } value="Vue" onChange={this.handleChange}/>
                </div>
                <div className="container_block">
                    <label>Angular</label><input type="radio" name="framework" defaultValue={ this.state.framework } value="Angular" onChange={this.handleChange}/>
                </div>
                <div className="container_block">   
                    <label>Symfony</label><input type="radio" name="framework" defaultValue={ this.state.framework } value="Symfony" onChange={this.handleChange}/> 
                </div>  
                <div className="container_block hide">   
                    <label>Autre</label><input type="type" name="framework" defaultValue={ this.state.framework } value={ this.state.framework } onChange={this.handleChange}/> 
                </div>  
                <div className="container_block">
                    <button onClick={ this.previous }>Précédent</button>
                    <button onClick={ this.saveAndContinue }>Continuer</button>
                </div>
            </div>       
        )
    };
    ThirdStep = (save) => {
        return (
            <div>
                <div className="content">
                    {    
                        save.map(function(name, index){
                            return (
                                <div>
                                    <li>Civilité : {name.civilite}</li>
                                    <li>Nom : name.nom}</li>
                                    <li>Prenom : {name.prenom}</li>
                                    <li>Email : {name.email}</li>
                                    <li>Tel : {name.tel}</li>
                                    <li>Framework : {name.framework}</li>     
                                </div>                       
                            );
                        })      
                    }
                </div>
                    <button onClick={ this.save }>Enregistrer</button>
                    <button onClick={ this.previous }>Précédent</button>
                    <button onClick={ this.cancel }>Annuler</button>
            </div>
        )
    };
    FourthSteph = () => {
        return (
            <div className="content">
                Congratulation, inscription effectué avec succes !
            </div>
        )
    };
    render = () => {
        switch (this.state.step) {
            case 1:
                return this.FirstStep()
            case 2:
                return this.SecondStep()
            case 3:
                return this.ThirdStep(this.state.save)
            case 4:
                return this.FourthSteph()
            default:
                return this.FirstStep()
        }
    };
    
};

ReactDOM.render(<Registration />, document.getElementById("root"));