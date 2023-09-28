/*
  Database that is used for persistent storage throughout the 
  application for offline usage.
  Note: Using a react native specific package to access pouch db
*/
import PouchDB from "pouchdb-react-native";

const db = new PouchDB("hospice");

export const dbInsert = (id, data, next) => {
  let success = true;
  db.get(id)
    .then((resData) => {
      //storing data beside the already existing data
      const doc = { ...resData, ...data };
      return db.put(doc);
    })
    .catch((err) => {
      console.log("db 1111", err);
      return db.put({ _id: id, ...data });
    })
    .catch((err) => {
      console.log("db 22222", err);
      success = false;
    })
    .finally(() => {
      if (success && next) {
        next();
      }
    });
};

export default db;
