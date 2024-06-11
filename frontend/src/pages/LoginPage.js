import React, { Component } from 'react'
import Input from '../Components/Input';
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";

class LoginPage extends Component {
    state = {
        username : null,
        password : null

    };

    onChange = event =>{
        const {name, value} = event.target;
        this.setState({
            [name] : value,
        })
    };

    onClickLogin = event =>{
        event.preventDefault();
        const {username, password} = this.state;
        const creds = {
            username,
            password
        }
        login(creds)
    }



  render() {
    const {t} = this.props;
    return (
      <div className='container'>
        <form>
            <h1 className='header'>{t('Login')}</h1>
            <Input  label = {t('Username')} name="username" onChange={this.onChange}/>
            <Input  label = {t('Password')} name="password" type = 'password' onChange={this.onChange}/>

            <div className='text-center'>
                <button className='btn '
                onClick={this.onClickLogin}>
                    {t('Login')}
                </button> 
            </div>

        </form>
      </div>
    )
  }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
export default LoginPageWithTranslation;
