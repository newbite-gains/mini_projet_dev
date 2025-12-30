// ============================================
// FICHIER: adherents.js
// Gestion CRUD (Create, Read, Update, Delete) pour les adhérents
// ============================================

// Variable globale pour stocker tous les adhérents (un tableau d'objets)
let adherents = [];

// Fonction appelée au chargement de la page pour récupérer les adhérents sauvegardés
function chargerAdherents() {
    // Récupère les données depuis localStorage (stockage du navigateur)
    let data = localStorage.getItem('adherents');
    
    // Si des données existent, on les convertit en tableau JavaScript
    if (data) {
        adherents = JSON.parse(data); // JSON.parse convertit le texte JSON en objet/tableau
    }
    
    // Affiche les adhérents dans la table
    afficherAdherents();
}

// Fonction pour afficher tous les adhérents dans le tableau HTML
function afficherAdherents() {
    // Trouve le corps du tableau (l'élément <tbody>)
    let tableBody = document.querySelector('#adherentTable tbody');
    
    // Vide le tableau avant d'ajouter les nouvelles données
    tableBody.innerHTML = '';
    
    // Vérifie si le tableau d'adhérents est vide
    if (adherents.length === 0) {
        // Crée une ligne pour afficher le message "Aucun adhérent"
        let row = document.createElement('tr');
        // Crée une cellule qui prend toute la largeur du tableau (colspan = nombre de colonnes)
        row.innerHTML = '<td colspan="7" style="text-align: center; padding: 20px; color: #999;">Aucun adhérent enregistré pour le moment.</td>';
        // Ajoute la ligne au tableau
        tableBody.appendChild(row);
    } else {
        // Parcourt tous les adhérents un par un
        for (let i = 0; i < adherents.length; i++) {
            // Crée une nouvelle ligne <tr> pour chaque adhérent
            let row = document.createElement('tr');
            
            // Remplit la ligne avec les données de l'adhérent
            row.innerHTML = `
                <td>${i + 1}</td> <!-- Numéro d'ordre (commence à 1) -->
                <td>${adherents[i].nom}</td> <!-- Nom de l'adhérent -->
                <td>${adherents[i].prenom}</td> <!-- Prénom de l'adhérent -->
                <td>${adherents[i].email}</td> <!-- Email de l'adhérent -->
                <td>${adherents[i].telephone}</td> <!-- Téléphone de l'adhérent -->
                <td>${adherents[i].dateInscription}</td> <!-- Date d'inscription -->
                <td>
                    <!-- Bouton pour modifier cet adhérent (passe l'index i) -->
                    <button onclick="modifierAdherent(${i})">Modifier</button>
                    <!-- Bouton pour supprimer cet adhérent (passe l'index i) -->
                    <button onclick="supprimerAdherent(${i})">Supprimer</button>
                </td>
            `;
            
            // Ajoute la ligne au tableau
            tableBody.appendChild(row);
        }
    }
}

// Fonction pour afficher le formulaire d'ajout/modification
function afficherFormulaireAdherent() {
    // Affiche le formulaire (change display: none en display: block)
    document.getElementById('adherentForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitreAdherent').textContent = 'Ajouter un adhérent';
    
    // Réinitialise le formulaire (vide tous les champs)
    document.getElementById('adherentForm').reset();
    
    // S'assure que le champ caché adherentId est vide (mode ajout)
    document.getElementById('adherentId').value = '';
}

// Fonction pour cacher le formulaire
function cacherFormulaireAdherent() {
    // Cache le formulaire (display: none)
    document.getElementById('adherentForm').style.display = 'none';
    
    // Vide le formulaire
    document.getElementById('adherentForm').reset();
    
    // Vide le champ caché adherentId
    document.getElementById('adherentId').value = '';
}

// Fonction appelée quand on soumet le formulaire (ajout ou modification)
function ajouterOuModifierAdherent(event) {
    // Empêche le formulaire de recharger la page
    event.preventDefault();
    
    // Récupère la valeur du champ caché adherentId
    let id = document.getElementById('adherentId').value;
    
    // Récupère les valeurs des champs du formulaire
    let nom = document.getElementById('nomAdherent').value;
    let prenom = document.getElementById('prenomAdherent').value;
    let email = document.getElementById('email').value;
    let telephone = document.getElementById('telephone').value;
    let dateInscription = document.getElementById('dateInscription').value;
    
    // Crée un objet adhérent avec les données du formulaire
    let adherent = {
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: telephone,
        dateInscription: dateInscription
    };
    
    // Si id n'est pas vide, c'est une modification
    if (id !== '') {
        // Remplace l'adhérent à l'index id par le nouvel adhérent
        adherents[parseInt(id)] = adherent;
    } else {
        // Sinon, c'est un ajout : on ajoute l'adhérent à la fin du tableau
        adherents.push(adherent);
    }
    
    // Sauvegarde le tableau d'adhérents dans localStorage (en format JSON)
    localStorage.setItem('adherents', JSON.stringify(adherents));
    
    // Cache le formulaire
    cacherFormulaireAdherent();
    
    // Rafraîchit l'affichage de la table
    afficherAdherents();
}

// Fonction pour modifier un adhérent existant
function modifierAdherent(index) {
    // Affiche le formulaire
    document.getElementById('adherentForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitreAdherent').textContent = 'Modifier l\'adhérent';
    
    // Remplit le champ caché avec l'index de l'adhérent à modifier
    document.getElementById('adherentId').value = index;
    
    // Remplit les champs du formulaire avec les données de l'adhérent
    document.getElementById('nomAdherent').value = adherents[index].nom;
    document.getElementById('prenomAdherent').value = adherents[index].prenom;
    document.getElementById('email').value = adherents[index].email;
    document.getElementById('telephone').value = adherents[index].telephone;
    document.getElementById('dateInscription').value = adherents[index].dateInscription;
}

// Fonction pour supprimer un adhérent
function supprimerAdherent(index) {
    // Demande confirmation avant de supprimer
    if (confirm('Êtes-vous sûr de vouloir supprimer cet adhérent ?')) {
        // Supprime l'élément à l'index donné du tableau
        adherents.splice(index, 1);
        
        // Sauvegarde le tableau modifié dans localStorage
        localStorage.setItem('adherents', JSON.stringify(adherents));
        
        // Rafraîchit l'affichage de la table
        afficherAdherents();
    }
}

// Note: La fonction chargerAdherents() sera appelée automatiquement
// par la fonction afficherEntite() dans script.js quand on clique sur le bouton "Adhérents"

