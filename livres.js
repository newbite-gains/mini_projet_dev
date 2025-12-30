// ============================================
// FICHIER: livres.js
// Gestion CRUD (Create, Read, Update, Delete) pour les livres
// ============================================

// Variable globale pour stocker tous les livres (un tableau d'objets)
let livres = [];

// Fonction appelée au chargement de la page pour récupérer les livres sauvegardés
function chargerLivres() {
    // Récupère les données depuis localStorage (stockage du navigateur)
    let data = localStorage.getItem('livres');
    
    // Si des données existent, on les convertit en tableau JavaScript
    if (data) {
        livres = JSON.parse(data); // JSON.parse convertit le texte JSON en objet/tableau
    }
    
    // Affiche les livres dans la table
    afficherLivres();
}

// Fonction pour afficher tous les livres dans le tableau HTML
function afficherLivres() {
    // Trouve le corps du tableau (l'élément <tbody>)
    let tableBody = document.querySelector('#livreTable tbody');
    
    // Vide le tableau avant d'ajouter les nouvelles données
    tableBody.innerHTML = '';
    
    // Vérifie si le tableau de livres est vide
    if (livres.length === 0) {
        // Crée une ligne pour afficher le message "Aucun livre"
        let row = document.createElement('tr');
        // Crée une cellule qui prend toute la largeur du tableau (colspan = nombre de colonnes)
        row.innerHTML = '<td colspan="5" style="text-align: center; padding: 20px; color: #999;">Aucun livre enregistré pour le moment.</td>';
        // Ajoute la ligne au tableau
        tableBody.appendChild(row);
    } else {
        // Parcourt tous les livres un par un
        for (let i = 0; i < livres.length; i++) {
            // Crée une nouvelle ligne <tr> pour chaque livre
            let row = document.createElement('tr');
            
            // Remplit la ligne avec les données du livre
            row.innerHTML = `
                <td>${i + 1}</td> <!-- Numéro d'ordre (commence à 1) -->
                <td>${livres[i].titre}</td> <!-- Titre du livre -->
                <td>${livres[i].auteurId}</td> <!-- ID de l'auteur -->
                <td>${livres[i].categorieId}</td> <!-- ID de la catégorie -->
                <td>
                    <!-- Bouton pour modifier ce livre (passe l'index i) -->
                    <button onclick="modifierLivre(${i})">Modifier</button>
                    <!-- Bouton pour supprimer ce livre (passe l'index i) -->
                    <button onclick="supprimerLivre(${i})">Supprimer</button>
                </td>
            `;
            
            // Ajoute la ligne au tableau
            tableBody.appendChild(row);
        }
    }
}

// Fonction pour afficher le formulaire d'ajout/modification
function afficherFormulaireLivre() {
    // Affiche le formulaire (change display: none en display: block)
    document.getElementById('livreForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitre').textContent = 'Ajouter un livre';
    
    // Réinitialise le formulaire (vide tous les champs)
    document.getElementById('livreForm').reset();
    
    // S'assure que le champ caché livreId est vide (mode ajout)
    document.getElementById('livreId').value = '';
}

// Fonction pour cacher le formulaire
function cacherFormulaireLivre() {
    // Cache le formulaire (display: none)
    document.getElementById('livreForm').style.display = 'none';
    
    // Vide le formulaire
    document.getElementById('livreForm').reset();
    
    // Vide le champ caché livreId
    document.getElementById('livreId').value = '';
}

// Fonction appelée quand on soumet le formulaire (ajout ou modification)
function ajouterOuModifierLivre(event) {
    // Empêche le formulaire de recharger la page
    event.preventDefault();
    
    // Récupère la valeur du champ caché livreId
    let id = document.getElementById('livreId').value;
    
    // Récupère les valeurs des champs du formulaire
    let titre = document.getElementById('titre').value;
    let auteurId = document.getElementById('auteurId').value;
    let categorieId = document.getElementById('categorieId').value;
    
    // Crée un objet livre avec les données du formulaire
    let livre = {
        titre: titre,
        auteurId: auteurId,
        categorieId: categorieId
    };
    
    // Si id n'est pas vide, c'est une modification
    if (id !== '') {
        // Remplace le livre à l'index id par le nouveau livre
        livres[parseInt(id)] = livre;
    } else {
        // Sinon, c'est un ajout : on ajoute le livre à la fin du tableau
        livres.push(livre);
    }
    
    // Sauvegarde le tableau de livres dans localStorage (en format JSON)
    localStorage.setItem('livres', JSON.stringify(livres));
    
    // Cache le formulaire
    cacherFormulaireLivre();
    
    // Rafraîchit l'affichage de la table
    afficherLivres();
}

// Fonction pour modifier un livre existant
function modifierLivre(index) {
    // Affiche le formulaire
    document.getElementById('livreForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitre').textContent = 'Modifier le livre';
    
    // Remplit le champ caché avec l'index du livre à modifier
    document.getElementById('livreId').value = index;
    
    // Remplit les champs du formulaire avec les données du livre
    document.getElementById('titre').value = livres[index].titre;
    document.getElementById('auteurId').value = livres[index].auteurId;
    document.getElementById('categorieId').value = livres[index].categorieId;
}

// Fonction pour supprimer un livre
function supprimerLivre(index) {
    // Demande confirmation avant de supprimer
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
        // Supprime l'élément à l'index donné du tableau
        livres.splice(index, 1);
        
        // Sauvegarde le tableau modifié dans localStorage
        localStorage.setItem('livres', JSON.stringify(livres));
        
        // Rafraîchit l'affichage de la table
        afficherLivres();
    }
}

// Note: La fonction chargerLivres() sera appelée automatiquement
// par la fonction afficherEntite() dans script.js quand on clique sur le bouton "Livres"

