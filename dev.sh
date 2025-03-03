#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status.

echo "Starting Trading AI DevOps development environment..."

# Vérifier si docker est installé
if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier si docker-compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Nettoyer l'environnement
echo "Nettoyage de l'environnement..."
docker-compose down --volumes --remove-orphans

# Construire et démarrer les conteneurs
echo "Construction et démarrage des conteneurs..."
docker-compose up --build -d

# Vérifier l'état des conteneurs
echo "Vérification de l'état des conteneurs..."
docker-compose ps

echo "L'environnement de développement est prêt. Utilisez 'docker-compose logs -f' pour voir les logs."
