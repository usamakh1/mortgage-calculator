import './ui/styles.css';
import { startApp } from './ui/bootstrap';

// startApp never rejects and never leaves the page blank (see bootstrap.ts).
void startApp(document.querySelector<HTMLElement>('#app'));
