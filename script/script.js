import '../style/style.scss';
import '../style/VirtualKeyboard.css';
import Dashboard from './components/Dashboard';

const dashboard = new Dashboard();
dashboard.generateDashboard();
// eslint-disable-next-line no-alert
alert('Привет. В таске реализован весь функционал. Подсветка клавиатуры в поиске работает только при совпадении состояния физической и вирутальной. Апи возвращает данные не для всех стран (особенно за последний день).')