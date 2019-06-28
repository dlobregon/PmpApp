
import { AsyncStorage } from 'react-native';

const deviceStorage = {

    async setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value+"");
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async getItem(key) {
        try {
            
            let value=  await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }
};

  export default deviceStorage;