/**
 * Error boudnary to catch JS UI errors
 *
 * @author Sebastian Kasiński
 */

import React from 'react';
import logger from '@src/utils/crashlytics';

import ErrorBoundaryView from './errorBoundaryView/ErrorBoundaryView';
import {loggErrorWithScope} from '@sentryLogger/sentryLogger';

interface IProps {
    children: React.ReactNode;
    onError?: Function;
}

interface IState {
    error: Error | null;
    errorInfo: {componentStack: string} | undefined;
    hasError?: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
    state: IState = {
        error: null,
        errorInfo: undefined,
        hasError: false,
    };

    static getDerivedStateFromError(error: Error) {
        return {error, hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: {componentStack: string}) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
            hasError: true,
        });
        logger.log('[ErrorBoundary]');
        logger.recordError(error);
        loggErrorWithScope(
            error,
            '[ErrorBoundary]',
            {
                name: 'errorInfo',
                context: errorInfo,
            },
            true,
        );

        if (this.props.onError && typeof this.props.onError === 'function') {
            this.props.onError.call(this, error, errorInfo.componentStack);
        }
    }

    resetError = () => {
        this.setState({
            error: null,
            errorInfo: undefined,
            hasError: false,
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorBoundaryView
                    error={this.state.error}
                    resetError={this.resetError}
                />
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
