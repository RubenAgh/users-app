import App from 'App';
import ReactDOM from 'react-dom/client';
import 'index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // React.StrictMode causes AbortController to cancel in development mode 
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);