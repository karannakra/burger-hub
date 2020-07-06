import axios from 'axios';
const instance=axios.create({
    baseURL:'https://burger-react-master.firebaseio.com'
});
export default instance;