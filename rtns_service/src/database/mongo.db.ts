import { Db, MongoClient } from 'mongodb';

/**
 * Class to connect with mongo and get the etd db
 *
 * @export
 */
export class MongoDb {
    private client: MongoClient;
    private readonly connectionString = process.env.DB_CONNECTION_STRING || 'mongodb://mongo:27017';
    //private readonly dbName = process.env.DB_NAME || 'etd';

    /**
     * closes the connection with mongo client
     *
     */
    public close() {
        if (this.client) {
            this.client.close()
            .then()
            .catch(error => {
                console.error(error);
            });
        } else {
            console.error('close: client is undefined');
        }
    }

    // connects to mongo client
    public async connect() {
        try {
            if (!this.client) {
                console.info(`Connection to ${this.connectionString}`);
                this.client = await MongoClient.connect(this.connectionString, { useNewUrlParser: true});
            }
        } catch(error) {
            console.error(error);
        }
    }

    public getDb(dbName): Db {
        if (this.client) {
            console.info(`getting db ${dbName}`);
            return this.client.db(dbName);
        } else {
            console.error('no db found');
            return undefined;
        }
    }
}