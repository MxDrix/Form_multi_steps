import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Registration extends React.Component{
    constructor(){
        super();
        this.state = {
            step: 1
        }
    }
    next = () => {
        this.setState({
            step : this.state.step + 1
        })
    }
    previous = () => {
        this.setState({
            step : this.state.step - 1
        })
    }
    fieldValue = { 
        civilite     : '',
        nom     :  '',
        prenom    : '',
        email : '',
        tel      : '',
        framework   : ''
    }
    
    saveAndContinue = (e)  => {
        e.preventDefault()   
        // Get values via this.refs
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        });
        const value = this.saveValues(this.state)
        console.log(this.state);
        this.next()
    }
    showValue = () => {
        return (
            <div>
                this.state.value
            </div>
            );
    }
    saveValues = (fields) => {
        return function() {
            var fieldValues = Object.assign({}, fieldValues, fields);
        };
    }
    save = () => {

    }
    cancel = () => {        
        this.setState({
            step : 1,
            civilite     : '',
            nom     :  '',
            prenom    : '',
            email : '',
            tel      : '',
            framework   : ''
        });
    }
      
    handleChange = (e) => {
        const name = e.target.name
        this.setState({
        [name]: e.target.value
        });
    };
    FirstStep = () =>  {
        return ( 
            <div class="form_container">
                <div class="container_block">
                    <label>Civilité</label> 
                    <select name="civilite" onChange={this.handleChange} defaultValue="Monsieur">
                        <option value="Monsieur">Monsieur</option>
                        <option value="Madame">Madame</option>
                        <option value="Autre">Autre</option>
                    </select>  
                </div>
                <div class="container_block">
                    <label>Prenom</label> 
                    <input type="text" name="prenom" defaultValue={ this.fieldValue.prenom }  onChange={this.handleChange} required />  
                </div>
                <div class="container_block">
                    <label>Nom</label> 
                    <input type="text" name="nom"  defaultValue={ this.fieldValue.nom } onChange={this.handleChange} required />  
                </div>
                <div class="container_block">
                    <label>Email</label>
                    <input type="email" name="email" defaultValue={ this.fieldValue.email } onChange={this.handleChange}/>  
                </div>
                <div class="container_block">
                    <label>Tèl</label>
                    <input type="tel" id="tel" name="tel" defaultValue={ this.fieldValue.tel } onChange={this.handleChange} pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$" />   
                </div>
                <div class="container_block">
                    <button onClick={this.saveAndContinue}>Continuer</button>
                </div>
            </div>
        )
    };
    SecondStep = () => {
        return (
            <div class="form_container">
                <div class="container_block">
                    <label>Framework préféré </label>
                </div>
                <div class="container_block">
                    <label>Vue</label><input type="radio" name="framework" defaultValue={ this.fieldValue.framework } value="Vue" onChange={this.handleChange}/>
                </div>
                <div class="container_block">
                    <label>Angular</label><input type="radio" name="framework" defaultValue={ this.fieldValue.framework } value="Angular" onChange={this.handleChange}/>
                </div>
                <div class="container_block">   
                    <label>Symfony</label><input type="radio" name="framework" defaultValue={ this.fieldValue.framework } value="Symfony" onChange={this.handleChange}/> 
                </div>  
                <div class="container_block hide">   
                    <label>Autre</label><input type="type" name="framework" defaultValue={ this.fieldValue.framework } value={ this.fieldValue.framework } onChange={this.handleChange}/> 
                </div>  
                <div class="container_block">
                    <button onClick={ this.previous }>Précédent</button>
                    <button onClick={ this.saveAndContinue }>Continuer</button>
                </div>
            </div>       
        )
    };
    ThirdStep = () => {
        return (
            <div>
                <div>
                {
                    this.state.fieldValues
                }
                </div>
                    <button onClick={ this.save }>Enregistrer</button>
                    <button onClick={ this.previous }>Précédent</button>
                    <button onClick={ this.cancel }>Annuler</button>
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
                return this.ThirdStep()
            default:
                return this.FirstStep()
        }
    };
    
}
// 1- civilité (select)
// 2- prénom (text), obligatoire
// 3- nom (text), obligatoire
// 4- email (text, format email), obligatoire
// 5- tél (text, format : +33 _ __ __ __ __), non obligatoire
// 6- bouton "suivant"

// Etape 2: questions
//    Framework préféré ? radio Vue, Angular, Symfony, ...
//    Autre : textearea
//    bouton "suivant", "précédent"


// Etape 3 : Récapitulatif
//    afficher les infos saisies
//    bouton "enregistrer", "précédent", "annuler"


ReactDOM.render(<Registration />, document.getElementById("root"));