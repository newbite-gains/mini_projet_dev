// ============================================
// FICHIER: categories.js
// Gestion CRUD (Create, Read, Update, Delete) pour les catégories
// ============================================

// Variable globale pour stocker toutes les catégories (un tableau d'objets)
let categories = [];

// Fonction appelée au chargement de la page pour récupérer les catégories sauvegardées
function chargerCategories() {
    // Récupère les données depuis localStorage (stockage du navigateur)
    let data = localStorage.getItem('categories');
    
    // Si des données existent, on les convertit en tableau JavaScript
    if (data) {
        categories = JSON.parse(data); // JSON.parse convertit le texte JSON en objet/tableau
    }
    
    // Affiche les catégories dans la table
    afficherCategories();
}

// Fonction pour afficher toutes les catégories dans le tableau HTML
function afficherCategories() {
    // Trouve le corps du tableau (l'élément <tbody>)
    let tableBody = document.querySelector('#categorieTable tbody');
    
    // Vide le tableau avant d'ajouter les nouvelles données
    tableBody.innerHTML = '';
    
    // Vérifie si le tableau de catégories est vide
    if (categories.length === 0) {
        // Crée une ligne pour afficher le message "Aucune catégorie"
        let row = document.createElement('tr');
        // Crée une cellule qui prend toute la largeur du tableau (colspan = nombre de colonnes)
        row.innerHTML = '<td colspan="4" style="text-align: center; padding: 20px; color: #999;">Aucune catégorie enregistrée pour le moment.</td>';
        // Ajoute la ligne au tableau
        tableBody.appendChild(row);
    } else {
        // Parcourt toutes les catégories un par un
        for (let i = 0; i < categories.length; i++) {
            // Crée une nouvelle ligne <tr> pour chaque catégorie
            let row = document.createElement('tr');
            
            // Remplit la ligne avec les données de la catégorie
            row.innerHTML = `
                <td>${i + 1}</td> <!-- Numéro d'ordre (commence à 1) -->
                <td>${categories[i].nom}</td> <!-- Nom de la catégorie -->
                <td>${categories[i].description || ''}</td> <!-- Description de la catégorie (vide si pas de description) -->
                <td>
                    <!-- Bouton pour modifier cette catégorie (passe l'index i) -->
                    <button onclick="modifierCategorie(${i})">Modifier</button>
                    <!-- Bouton pour supprimer cette catégorie (passe l'index i) -->
                    <button onclick="supprimerCategorie(${i})">Supprimer</button>
                </td>
            `;
            
            // Ajoute la ligne au tableau
            tableBody.appendChild(row);
        }
    }
}

// Fonction pour afficher le formulaire d'ajout/modification
function afficherFormulaireCategorie() {
    // Affiche le formulaire (change display: none en display: block)
    document.getElementById('categorieForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitreCategorie').textContent = 'Ajouter une catégorie';
    
    // Réinitialise le formulaire (vide tous les champs)
    document.getElementById('categorieForm').reset();
    
    // S'assure que le champ caché categorieId est vide (mode ajout)
    document.getElementById('categorieId').value = '';
}

// Fonction pour cacher le formulaire
function cacherFormulaireCategorie() {
    // Cache le formulaire (display: none)
    document.getElementById('categorieForm').style.display = 'none';
    
    // Vide le formulaire
    document.getElementById('categorieForm').reset();
    
    // Vide le champ caché categorieId
    document.getElementById('categorieId').value = '';
}

// Fonction appelée quand on soumet le formulaire (ajout ou modification)
function ajouterOuModifierCategorie(event) {
    // Empêche le formulaire de recharger la page
    event.preventDefault();
    
    // Récupère la valeur du champ caché categorieId
    let id = document.getElementById('categorieId').value;
    
    // Récupère les valeurs des champs du formulaire
    let nom = document.getElementById('nomCategorie').value;
    let description = document.getElementById('description').value;
    
    // Crée un objet catégorie avec les données du formulaire
    let categorie = {
        nom: nom,
        description: description
    };
    
    // Si id n'est pas vide, c'est une modification
    if (id !== '') {
        // Remplace la catégorie à l'index id par la nouvelle catégorie
        categories[parseInt(id)] = categorie;
    } else {
        // Sinon, c'est un ajout : on ajoute la catégorie à la fin du tableau
        categories.push(categorie);
    }
    
    // Sauvegarde le tableau de catégories dans localStorage (en format JSON)
    localStorage.setItem('categories', JSON.stringify(categories));
    
    // Cache le formulaire
    cacherFormulaireCategorie();
    
    // Rafraîchit l'affichage de la table
    afficherCategories();
}

// Fonction pour modifier une catégorie existante
function modifierCategorie(index) {
    // Affiche le formulaire
    document.getElementById('categorieForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitreCategorie').textContent = 'Modifier la catégorie';
    
    // Remplit le champ caché avec l'index de la catégorie à modifier
    document.getElementById('categorieId').value = index;
    
    // Remplit les champs du formulaire avec les données de la catégorie
    document.getElementById('nomCategorie').value = categories[index].nom;
    document.getElementById('description').value = categories[index].description || '';
}

// Fonction pour supprimer une catégorie
function supprimerCategorie(index) {
    // Demande confirmation avant de supprimer
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
        // Supprime l'élément à l'index donné du tableau
        categories.splice(index, 1);
        
        // Sauvegarde le tableau modifié dans localStorage
        localStorage.setItem('categories', JSON.stringify(categories));
        
        // Rafraîchit l'affichage de la table
        afficherCategories();
    }
}

// Note: La fonction chargerCategories() sera appelée automatiquement
// par la fonction afficherEntite() dans script.js quand on clique sur le bouton "Catégories"

