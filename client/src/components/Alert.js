function Alert({ alertType, message }) {
    
    return (
        <div className={`alert alert-${alertType} my-2`} role="alert">
            {message}
        </div>
    );
}

export default Alert;
