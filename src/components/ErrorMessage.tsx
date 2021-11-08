import { FC } from 'react';
import { Icon } from 'semantic-ui-react';
import 'styles/styles.scss';

export const ErrorMessage: FC<{ error?: string }> = ({ error }) => {
    return error ? (
        <>
            <Icon name="warning sign" color="red" />
            <span className="error-message">{error}</span>
        </>
    ) : null;
};
