import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Button from "primevue/button"
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'; // Icons
import Aura from '@primeuix/themes/aura';
import Card from 'primevue/card';
import { DataTable, Column, Tag, Checkbox } from 'primevue';
import Chart from 'primevue/chart';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';import Tooltip from 'primevue/tooltip';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';


import './styles/main.scss'; // Your SCSS styles

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Button', Button);
app.component('Card', Card);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Tag', Tag);
app.component('Checkbox', Checkbox);
app.component('Chart', Chart);
app.component('InputText', InputText);
app.component('Textarea', Textarea);
app.component('DatePicker', DatePicker);
app.component('Select', Select);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);

app.directive('tooltip', Tooltip);






app.mount('#app');
