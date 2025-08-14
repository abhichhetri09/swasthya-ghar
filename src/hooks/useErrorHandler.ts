import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from './useTranslation';

export interface ErrorInfo {
  message: string;
  code?: string;
  type?: 'network' | 'validation' | 'permission' | 'server' | 'general' | 'notFound';
  details?: any;
}

export interface ErrorHandlerOptions {
  showAlert?: boolean;
  logToConsole?: boolean;
  throwError?: boolean;
  onError?: (error: ErrorInfo) => void;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    showAlert = true,
    logToConsole = __DEV__,
    throwError = false,
    onError,
  } = options;

  const handleError = useCallback((error: Error | string | ErrorInfo, context?: string) => {
    let errorInfo: ErrorInfo;

    if (typeof error === 'string') {
      errorInfo = {
        message: error,
        type: 'general',
      };
    } else if (error instanceof Error) {
      errorInfo = {
        message: error.message,
        type: 'general',
        details: error.stack,
      };
    } else {
      errorInfo = error;
    }

    // Add context if provided
    if (context) {
      errorInfo.message = `[${context}] ${errorInfo.message}`;
    }

    // Log to console in development
    if (logToConsole) {
      console.error('Error handled by useErrorHandler:', errorInfo);
    }

    // Add to errors state
    setErrors(prev => [...prev, errorInfo]);

    // Show alert if enabled
    if (showAlert) {
      Alert.alert(
        t('error'),
        errorInfo.message,
        [{ text: t('ok'), style: 'default' }]
      );
    }

    // Call custom error handler
    if (onError) {
      onError(errorInfo);
    }

    // Throw error if enabled
    if (throwError) {
      throw new Error(errorInfo.message);
    }

    return errorInfo;
  }, [showAlert, logToConsole, throwError, onError, t]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const clearError = useCallback((index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    setIsLoading(true);
    try {
      const result = await asyncFn();
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      handleError(error as Error, context);
      return null;
    }
  }, [handleError]);

  const handleNetworkError = useCallback((error: any, context?: string) => {
    let errorInfo: ErrorInfo;

    if (error.code === 'NETWORK_ERROR' || error.message?.includes('network')) {
      errorInfo = {
        message: t('errorScreen.network.message'),
        code: 'NETWORK_ERROR',
        type: 'network',
      };
    } else if (error.status === 404) {
      errorInfo = {
        message: t('errorScreen.notFound.message'),
        code: '404',
        type: 'notFound',
      };
    } else if (error.status >= 500) {
      errorInfo = {
        message: t('errorScreen.server.message'),
        code: error.status?.toString(),
        type: 'server',
      };
    } else if (error.status === 403) {
      errorInfo = {
        message: t('errorScreen.permission.message'),
        code: '403',
        type: 'permission',
      };
    } else {
      errorInfo = {
        message: error.message || t('errorScreen.general.message'),
        code: error.status?.toString(),
        type: 'general',
      };
    }

    handleError(errorInfo, context);
  }, [handleError, t]);

  const handleValidationError = useCallback((errors: Record<string, string[]>, context?: string) => {
    const errorMessages = Object.values(errors).flat();
    const message = errorMessages.join(', ');
    
    handleError({
      message,
      type: 'validation',
      details: errors,
    }, context);
  }, [handleError]);

  return {
    errors,
    isLoading,
    handleError,
    handleAsyncError,
    handleNetworkError,
    handleValidationError,
    clearErrors,
    clearError,
  };
};
