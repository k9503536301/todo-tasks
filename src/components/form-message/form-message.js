import React from 'react';

import './form-message.css';

export const FormMessage = ({ formErrors, isDataSending, sendingReject }) => {
    if (isDataSending) return (<span className="alert alert-info rounded">
            Данные успешно отправлены!
        </span>);

    if (sendingReject) return (<span className="alert alert-danger rounded">
            Произошла ошибка данные не отправлены.
        </span>);

    return <div>
        {Object.keys(formErrors).map((fieldName, i) => {
            return (formErrors[fieldName].length > 0)
                ?
                (<div key={i} className='row formErrors alert-danger'>
                            {fieldName} {formErrors[fieldName]}
                    </div>)
                : null
            })
        }
    </div>;
};