import {connect} from 'mongoose';
import config from 'config';

const db_url = config.get('DB_URL');
const port = config.get('PORT');

export const run = (app) => {
    try {
        connect(db_url);

        app.listen(port, () => {
            console.log(`Server is ready at ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
};