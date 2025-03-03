db = db.getSiblingDB('tradingai');

const traderCount = db.traders.countDocuments();

if (traderCount === 0) {
  print('Initialisation de la base de données avec des données par défaut...');
  
  db.traders.insertMany([
    {
      name: 'TraderBot Alpha',
      type: 'CEO',
      strategy: 'Analyse macro-économique et supervision des autres traders',
      active: true,
      createdAt: new Date()
    },
    {
      name: 'TraderBot Beta',
      type: 'Trader',
      strategy: 'Day trading basé sur l'analyse technique',
      active: true,
      createdAt: new Date()
    },
    {
      name: 'TraderBot Gamma',
      type: 'Trader',
      strategy: 'Trading à long terme basé sur les fondamentaux',
      active: true,
      createdAt: new Date()
    },
    {
      name: 'TraderBot Delta',
      type: 'Trader',
      strategy: 'Arbitrage entre différentes plateformes d\'échange',
      active: true,
      createdAt: new Date()
    }
  ]);
  
  print('Données initiales insérées avec succès!');
} else {
  print('La base de données contient déjà des données, aucune initialisation nécessaire.');
}
