#!/bin/bash

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

# Arrêter les conteneurs existants si nécessaire
docker-compose down

# Construire et démarrer les conteneurs
docker-compose up --build

# Ce script ne terminera pas tant que docker-compose n'est pas arrêté