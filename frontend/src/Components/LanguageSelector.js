import React from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from "../api/apiCalls";

const  LanguageSelector = (props) => {

    const onChangeLanguage = language => {
        const {i18n} = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
    return (
        <div className='container'>
            <img src="./turkey.png" 
            alt='Turkish Flag' 
            onClick={() => onChangeLanguage('tr')}
            ></img>
            <img src="./united-states.png"
             alt='USA Flag' 
             onClick={() => onChangeLanguage('en')}
             ></img>
        </div>
    );
};

const LanguageSelectorWithTranslation = withTranslation()(LanguageSelector);
export default LanguageSelectorWithTranslation;
// export default withTranslation()(LanguageSelector);