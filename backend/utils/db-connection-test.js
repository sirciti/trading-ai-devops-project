const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Tentative de connexion à MongoDB Atlas...');
console.log(`URI: ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connexion à MongoDB Atlas réussie!');
    
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Erreur lors de la récupération des collections:', err);
        process.exit(1);
      }
      
      console.log('Collections disponibles:');
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
      
      const traderCollection = collections.find(c => c.name === 'traders');
      if (traderCollection) {
        mongoose.connection.db.collection('traders').countDocuments((err, count) => {
          if (err) {
            console.error('Erreur lors du comptage des traders:', err);
          } else {
            console.log(`Nombre de traders dans la base de données: ${count}`);
          }
          process.exit(0);
        });
      } else {
        console.log('La collection "traders" n\'existe pas encore.');
        process.exit(0);
      }
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB Atlas:', err);
    process.exit(1);
  });
