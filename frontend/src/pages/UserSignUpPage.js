import React from 'react';
import {signup} from '../api/apiCalls';
import Input from '../Components/Input';
import {withTranslation} from 'react-i18next';

class UserSignUpPage extends React.Component{

    state = {
        username: null,
        displayName:null,
        password:null,
        passwordRepeat:null,
        pendingApiCall:false,
        errors : {}
    };

    onChange = event =>{
        const{t} = this.props;
        const{name , value} = event.target; 
        const errors = {...this.state.errors}
        errors[name] = undefined;
        if (name === 'password' || name === 'passwordRepeat') {

            if (name == 'password' && value !== this.state.passwordRepeat) {

                errors.passwordRepeat = t('Password Mismatch');

            }else if(name == 'passwordRepeat' && value !== this.state.password){

                errors.passwordRepeat = t('Password Mismatch');
            }else{

                errors.passwordRepeat = undefined;
            }
        }
        // const value = event.target.value;
        // const name = event.target.name;
        this.setState({
            [name]: value,
            errors
        });
    };

    onClickSignup = async event =>{
        event.preventDefault();

        const{username , displayName ,password} = this.state;

        const body={
            // username: username,
            // displayName: displayName,
            // password: password
            username,
            displayName,
            password
        };
        this.setState({
            pendingApiCall:true
        });

        try{
            const response = await signup(body);
        }catch(error){
            if(error.response.data.validationErrors){
                this.setState({errors : error.response.data.validationErrors});
            }
        }

        this.setState({pendingApiCall:false});

        // signup(body)
        // .then(response =>{
        //     this.setState({pendingApiCall:false});
        // })
        // .catch(error =>{
        //     this.setState({pendingApiCall:false});
        // });
    };





    render(){
        const {t} = this.props;
        const {pendingApiCall , errors}= this.state;
        const {username, displayName, password, passwordRepeat} = errors;

        return(
            <div className ='container'>
                <form>
                    <h1 className='header'>{t('Sign Up')}</h1>

                    <Input name="username" label={t("Username")} error={username} onChange={this.onChange}/>

                    <Input name="displayName" label={t("Display Name")} error={displayName} onChange={this.onChange}/>

                    <Input name="password" label={t("Password")} error={password} onChange={this.onChange} type="Password"/>

                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} onChange={this.onChange} type="Password"/>

                    <div className='text-center'>
                        <button className = 'btn' 
                        onClick={this.onClickSignup}
                        disabled={pendingApiCall || passwordRepeat !== undefined}>
                        {pendingApiCall && <span className ="spinner-border spinner-border-sm"></span>}
                        {t('Sign Up')}
                        </button> 
                    </div>

                    {/* <div className='form-group'>
                        <input name='username' 
                        onChange={this.onChange}
                        type="text" 
                        required className={username ? "form-control is-invalid" : "form-control"}
                        id='Username'/>
                        <label for ='Username' className='form-label' >Username</label>
                        <div className="invalid-feedback">
                            {username}
                        </div>
                    </div> 
                     <div className='form-group'>
                        <input name='displayName'
                         onChange={this.onChange}
                        type="text" 
                        required className={displayName ? "form-control is-invalid" : "form-control"}
                        id='DisplayName'/>
                        <label for ='DisplayName' className='form-label'>Display Name</label>
                        <div className="invalid-feedback">
                            {displayName}
                        </div>
                    </div>
                    <div className='form-group'>
                        <input name='password' type='Password' 
                        onChange={this.onChange} 
                         required className="form-control"
                         id='Password'/>
                        <label for ='Password' className='form-label'>Password</label>
                    </div> 
                    <div className='form-group'>
                        <input name='passwordRepeat' type='Password' onChange={this.onChange} 
                        required class="form-control"
                        id='PasswordRepeat'/>
                        <label for ='PasswordRepeat' className='form-label'>Password Repeat</label>
                    </div> */}
                </form>
            </div>
            
                  
        );
    };
};

const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPage);

export default UserSignUpPageWithTranslation;