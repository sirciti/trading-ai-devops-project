# trading-ai-devops-project
Projet DevOps pour système de trading IA

# Phase 1
*Structure de base pour votre projet
GitHub Actions devrait automatiquement démarrer le pipeline CI/CD que nous avons configuré. Vous pouvez vérifier son statut dans l'onglet "Actions" de votre dépôt GitHub.
Ces étapes établissent:

Un pipeline CI/CD basique avec GitHub Actions
Une API backend avec des opérations CRUD pour les traders AI
Une structure de projet DevOps moderne


# Phase 2

*Configuration du pipeline CI/CD avec GitHub Actions
créer un pipeline CI/CD basique qui va:

*Tester le code
Construire les images Docker
(Simuler le) déploiement

*Implémentation du frontend et environnement de développement complet
mise à jour
# Trading AI DevOps Project

Ce projet implémente une plateforme de trading IA avec une architecture DevOps complète. Le système permet à un PDG AI et trois Traders AI de prendre des décisions sur les cryptomonnaies et d'interagir entre eux.

## Architecture

- **Frontend**: React.js avec une interface simple pour gérer les agents de trading
- **Backend**: Node.js/Express API avec opérations CRUD
- **Base de données**: MongoDB pour stocker les informations des traders
- **CI/CD**: GitHub Actions pour l'intégration et le déploiement continus
- **Conteneurisation**: Docker pour l'isolation et la portabilité
- **Orchestration**: Docker Compose pour la gestion multi-conteneurs

## Démarrage rapide

Pour démarrer l'environnement de développement:

```bash
./dev.sh


Cela lancera tous les services nécessaires en mode développement avec rechargement à chaud.
Fonctionnalités DevOps

Environnement isolé: Développement entièrement conteneurisé
CI/CD: Tests, build et déploiement automatisés
Infrastructure as Code: Définition déclarative de l'infrastructure
Surveillance: (À venir) Configuration pour la journalisation et la surveillance
Haute disponibilité: (À venir) Configuration pour AWS

Roadmap

✅ Mise en place de l'environnement de base
✅ Implémentation des opérations CRUD
✅ Configuration CI/CD
⬜ Intégration avec AWS
⬜ Implémentation des algorithmes IA
⬜ Configuration de la surveillance et des alertes

Cette approche mise à jour est beaucoup plus alignée avec les principes DevOps:

Automatisation dès le départ: Le script dev.sh automatise le démarrage de tout l'environnement
Infrastructure as Code: Tout est défini dans des fichiers de configuration
Conteneurisation complète: L'ensemble du développement se fait dans des conteneurs
Rechargement à chaud: Les volumes partagés permettent de modifier le code sans reconstruire
Tests automatisés: Intégrés dans le pipeline CI/CD
Documentation intégrée: Le README explique l'approche DevOps