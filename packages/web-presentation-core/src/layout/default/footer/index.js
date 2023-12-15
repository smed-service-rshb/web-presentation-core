import React from 'react';
import './styles.css'

const footer = () => {
    return (
        <div className="footer">
            <div className="footer-content black">
                <div className="copyright">&copy; {(new Date().getFullYear() === 2018) ? 2018 : "2018-" + new Date().getFullYear()} ООО «РСХБ-Страхование жизни»
                </div>
                <div className="footer-center">
                    <div><span className="footer-title">Поддержка сотрудников:</span> 8
                        (800) 770 77 88
                    </div>
                </div>
                <div className="footer-center">
                    <div>
                        <span key="footer-email-element-title" className="footer-title">Продуктовая поддержка: </span>
                        <a key="footer-email-element-value" className="footer-link green"
                           href="mailto:life@rshb-am.ru">life@rshb-am.ru</a>
                    </div>
                    <div>
                        <span key="footer-email-element-title" className="footer-title">Техническая поддержка: </span>
                        <a key="footer-email-element-value" className="footer-link green"
                           href="mailto:foshelp@rshb.life">foshelp@rshb.life</a>
                    </div>
                </div>
                <div className="address"><span className="footer-title">Адрес:</span> 119034, г. Москва,
                    Гагаринский пер., д.3.
                </div>
            </div>
        </div>
    )
};

export default footer