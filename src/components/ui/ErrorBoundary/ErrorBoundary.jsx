import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary__content">
                        <h2>Oups ! Quelque chose s'est mal passé.</h2>
                        <p>Une erreur inattendue est survenue. Veuillez rafraîchir la page ou réessayer plus tard.</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => window.location.reload()}
                        >
                            Actualiser la page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
