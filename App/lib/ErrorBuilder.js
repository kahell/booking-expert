const ErrorBuilder = (response) => {
    let error = {
        title: '',
        message: response.data.error,
        button: 'Try Again'
    };

    if(response.problem === 'NETWORK_ERROR')
    {
        error.title = 'Network Error';
        error.message = 'Connection to server failed.';
    }

    return error;
};

export default ErrorBuilder;