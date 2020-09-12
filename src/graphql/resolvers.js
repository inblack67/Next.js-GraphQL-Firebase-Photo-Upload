import { connectFB } from '../connectFB';
import 'colors';

const firebase = connectFB();
const storage = firebase.storage();
const store = firebase.firestore();

export const resolvers = {
    Query: {
        async uploads() {
            return null;
        },
    },
    Mutation: {
        async singleUpload(parent, { file }, ctx) {
            const trueFile = await file;
            const storageRef = storage.ref(trueFile.filename);
            const collectionRef = store.collection('graphql-uploads');
            storageRef.put(trueFile).on('state_changed', snap => {
                // progress
            }, err => {
                console.error(`${err}`.red.bold);
            }, async () => {
                try {
                    const url = await storageRef.getDownloadURL();
                    collectionRef.add({ url, createdAt: Date.now() });
                    return 'Photo Uploaded';
                } catch (err) {
                    console.error(`${err}`.red.bold);
                }
            });
        }
    },
};