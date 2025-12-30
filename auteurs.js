// ============================================
// FICHIER: auteurs.js
// Gestion CRUD (Create, Read, Update, Delete) pour les auteurs
// ============================================

// Variable globale pour stocker tous les auteurs (un tableau d'objets)
let auteurs = [];

// Fonction appelée au chargement de la page pour récupérer les auteurs sauvegardés
function chargerAuteurs() {
    // Récupère les données depuis localStorage (stockage du navigateur)
    let data = localStorage.getItem('auteurs');
    
    // Si des données existent, on les convertit en tableau JavaScript
    if (data) {
        auteurs = JSON.parse(data); // JSON.parse convertit le texte JSON en objet/tableau
    }
    
    // Affiche les auteurs dans la table
    afficherAuteurs();
}

// Fonction pour afficher tous les auteurs dans le tableau HTML
function afficherAuteurs() {
    // Trouve le corps du tableau (l'élément <tbody>)
    let tableBody = document.querySelector('#auteurTable tbody');
    
    // Vide le tableau avant d'ajouter les nouvelles données
    tableBody.innerHTML = '';
    
    // Vérifie si le tableau d'auteurs est vide
    if (auteurs.length === 0) {
        // Crée une ligne pour afficher le message "Aucun auteur"
        let row = document.createElement('tr');
        // Crée une cellule qui prend toute la largeur du tableau (colspan = nombre de colonnes)
        row.innerHTML = '<td colspan="5" style="text-align: center; padding: 20px; color: #999;">Aucun auteur enregistré pour le moment.</td>';
        // Ajoute la ligne au tableau
        tableBody.appendChild(row);
    } else {
        // Parcourt tous les auteurs un par un
        for (let i = 0; i < auteurs.length; i++) {
            // Crée une nouvelle ligne <tr> pour chaque auteur
            let row = document.createElement('tr');
            
            // Remplit la ligne avec les données de l'auteur
            row.innerHTML = `
                <td>${i + 1}</td> <!-- Numéro d'ordre (commence à 1) -->
                <td>${auteurs[i].nom}</td> <!-- Nom de l'auteur -->
                <td>${auteurs[i].prenom}</td> <!-- Prénom de l'auteur -->
                <td>${auteurs[i].dateNaissance}</td> <!-- Date de naissance -->
                <td>
                    <!-- Bouton pour modifier cet auteur (passe l'index i) -->
                    <button onclick="modifierAuteur(${i})">Modifier</button>
                    <!-- Bouton pour supprimer cet auteur (passe l'index i) -->
                    <button onclick="supprimerAuteur(${i})">Supprimer</button>
                </td>
            `;
            
            // Ajoute la ligne au tableau
            tableBody.appendChild(row);
        }
    }
}

// Fonction pour afficher le formulaire d'ajout/modification
function afficherFormulaireAuteur() {
    // Affiche le formulaire (change display: none en display: block)
    document.getElementById('auteurForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitreAuteur').textContent = 'Ajouter un auteur';
    
    // Réinitialise le formulaire (vide tous les champs)
    document.getElementById('auteurForm').reset();
    
    // S'assure que le champ caché auteurId est vide (mode ajout)
    document.getElementById('auteurId').value = '';
}

// Fonction pour cacher le formulaire
function cacherFormulaireAuteur() {
    // Cache le formulaire (display: none)
    document.getElementById('auteurForm').style.display = 'none';
    
    // Vide le formulaire
    document.getElementById('auteurForm').reset();
    
    // Vide le champ caché auteurId
    document.getElementById('auteurId').value = '';
}

// Fonction appelée quand on soumet le formulaire (ajout ou modification)
function ajouterOuModifierAuteur(event) {
    // Empêche le formulaire de recharger la page
    event.preventDefault();
    
    // Récupère la valeur du champ caché auteurId
    let id = document.getElementById('auteurId').value;
    
    // Récupère les valeurs des champs du formulaire
    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let dateNaissance = document.getElementById('dateNaissance').value;
    
    // Crée un objet auteur avec les données du formulaire
    let auteur = {
        nom: nom,
        prenom: prenom,
        dateNaissance: dateNaissance
    };
    
    // Si id n'est pas vide, c'est une modification
    if (id !== '') {
        // Remplace l'auteur à l'index id par le nouvel auteur
        auteurs[parseInt(id)] = auteur;
    } else {
        // Sinon, c'est un ajout : on ajoute l'auteur à la fin du tableau
        auteurs.push(auteur);
    }
    
    // Sauvegarde le tableau d'auteurs dans localStorage (en format JSON)
    localStorage.setItem('auteurs', JSON.stringify(auteurs));
    
    // Cache le formulaire
    cacherFormulaireAuteur();
    
    // Rafraîchit l'affichage de la table
    afficherAuteurs();
}

// Fonction pour modifier un auteur existant
function modifierAuteur(index) {
    // Affiche le formulaire
    document.getElementById('auteurForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitreAuteur').textContent = 'Modifier l\'auteur';
    
    // Remplit le champ caché avec l'index de l'auteur à modifier
    document.getElementById('auteurId').value = index;
    
    // Remplit les champs du formulaire avec les données de l'auteur
    document.getElementById('nom').value = auteurs[index].nom;
    document.getElementById('prenom').value = auteurs[index].prenom;
    document.getElementById('dateNaissance').value = auteurs[index].dateNaissance;
}

// Fonction pour supprimer un auteur
function supprimerAuteur(index) {
    // Demande confirmation avant de supprimer
    if (confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
        // Supprime l'élément à l'index donné du tableau
        auteurs.splice(index, 1);
        
        // Sauvegarde le tableau modifié dans localStorage
        localStorage.setItem('auteurs', JSON.stringify(auteurs));
        
        // Rafraîchit l'affichage de la table
        afficherAuteurs();
    }
}

// Note: La fonction chargerAuteurs() sera appelée automatiquement
// par la fonction afficherEntite() dans script.js quand on clique sur le bouton "Auteurs"

