// ============================================
// FICHIER: emprunts.js
// Gestion CRUD (Create, Read, Update, Delete) pour les emprunts
// ============================================

// Variable globale pour stocker tous les emprunts (un tableau d'objets)
let emprunts = [];

// Fonction appelée au chargement de la page pour récupérer les emprunts sauvegardés
function chargerEmprunts() {
    // Récupère les données depuis localStorage (stockage du navigateur)
    let data = localStorage.getItem('emprunts');
    
    // Si des données existent, on les convertit en tableau JavaScript
    if (data) {
        emprunts = JSON.parse(data); // JSON.parse convertit le texte JSON en objet/tableau
    }
    
    // Affiche les emprunts dans la table
    afficherEmprunts();
}

// Fonction pour afficher tous les emprunts dans le tableau HTML
function afficherEmprunts() {
    // Trouve le corps du tableau (l'élément <tbody>)
    let tableBody = document.querySelector('#empruntTable tbody');
    
    // Vide le tableau avant d'ajouter les nouvelles données
    tableBody.innerHTML = '';
    
    // Vérifie si le tableau d'emprunts est vide
    if (emprunts.length === 0) {
        // Crée une ligne pour afficher le message "Aucun emprunt"
        let row = document.createElement('tr');
        // Crée une cellule qui prend toute la largeur du tableau (colspan = nombre de colonnes)
        row.innerHTML = '<td colspan="7" style="text-align: center; padding: 20px; color: #999;">Aucun emprunt enregistré pour le moment.</td>';
        // Ajoute la ligne au tableau
        tableBody.appendChild(row);
    } else {
        // Parcourt tous les emprunts un par un
        for (let i = 0; i < emprunts.length; i++) {
            // Crée une nouvelle ligne <tr> pour chaque emprunt
            let row = document.createElement('tr');
            
            // Remplit la ligne avec les données de l'emprunt
            row.innerHTML = `
                <td>${i + 1}</td> <!-- Numéro d'ordre (commence à 1) -->
                <td>${emprunts[i].livreId}</td> <!-- ID du livre emprunté -->
                <td>${emprunts[i].adherentId}</td> <!-- ID de l'adhérent -->
                <td>${emprunts[i].dateEmprunt}</td> <!-- Date d'emprunt -->
                <td>${emprunts[i].dateRetourPrevue}</td> <!-- Date de retour prévue -->
                <td>${emprunts[i].statut}</td> <!-- Statut de l'emprunt -->
                <td>
                    <!-- Bouton pour modifier cet emprunt (passe l'index i) -->
                    <button onclick="modifierEmprunt(${i})">Modifier</button>
                    <!-- Bouton pour supprimer cet emprunt (passe l'index i) -->
                    <button onclick="supprimerEmprunt(${i})">Supprimer</button>
                </td>
            `;
            
            // Ajoute la ligne au tableau
            tableBody.appendChild(row);
        }
    }
}

// Fonction pour afficher le formulaire d'ajout/modification
function afficherFormulaireEmprunt() {
    // Affiche le formulaire (change display: none en display: block)
    document.getElementById('empruntForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitreEmprunt').textContent = 'Ajouter un emprunt';
    
    // Réinitialise le formulaire (vide tous les champs)
    document.getElementById('empruntForm').reset();
    
    // S'assure que le champ caché empruntId est vide (mode ajout)
    document.getElementById('empruntId').value = '';
}

// Fonction pour cacher le formulaire
function cacherFormulaireEmprunt() {
    // Cache le formulaire (display: none)
    document.getElementById('empruntForm').style.display = 'none';
    
    // Vide le formulaire
    document.getElementById('empruntForm').reset();
    
    // Vide le champ caché empruntId
    document.getElementById('empruntId').value = '';
}

// Fonction appelée quand on soumet le formulaire (ajout ou modification)
function ajouterOuModifierEmprunt(event) {
    // Empêche le formulaire de recharger la page
    event.preventDefault();
    
    // Récupère la valeur du champ caché empruntId
    let id = document.getElementById('empruntId').value;
    
    // Récupère les valeurs des champs du formulaire
    let livreId = document.getElementById('livreIdEmprunt').value;
    let adherentId = document.getElementById('adherentIdEmprunt').value;
    let dateEmprunt = document.getElementById('dateEmprunt').value;
    let dateRetourPrevue = document.getElementById('dateRetourPrevue').value;
    let statut = document.getElementById('statut').value;
    
    // Crée un objet emprunt avec les données du formulaire
    let emprunt = {
        livreId: livreId,
        adherentId: adherentId,
        dateEmprunt: dateEmprunt,
        dateRetourPrevue: dateRetourPrevue,
        statut: statut
    };
    
    // Si id n'est pas vide, c'est une modification
    if (id !== '') {
        // Remplace l'emprunt à l'index id par le nouvel emprunt
        emprunts[parseInt(id)] = emprunt;
    } else {
        // Sinon, c'est un ajout : on ajoute l'emprunt à la fin du tableau
        emprunts.push(emprunt);
    }
    
    // Sauvegarde le tableau d'emprunts dans localStorage (en format JSON)
    localStorage.setItem('emprunts', JSON.stringify(emprunts));
    
    // Cache le formulaire
    cacherFormulaireEmprunt();
    
    // Rafraîchit l'affichage de la table
    afficherEmprunts();
}

// Fonction pour modifier un emprunt existant
function modifierEmprunt(index) {
    // Affiche le formulaire
    document.getElementById('empruntForm').style.display = 'block';
    
    // Change le titre du formulaire
    document.getElementById('formTitreEmprunt').textContent = 'Modifier l\'emprunt';
    
    // Remplit le champ caché avec l'index de l'emprunt à modifier
    document.getElementById('empruntId').value = index;
    
    // Remplit les champs du formulaire avec les données de l'emprunt
    document.getElementById('livreIdEmprunt').value = emprunts[index].livreId;
    document.getElementById('adherentIdEmprunt').value = emprunts[index].adherentId;
    document.getElementById('dateEmprunt').value = emprunts[index].dateEmprunt;
    document.getElementById('dateRetourPrevue').value = emprunts[index].dateRetourPrevue;
    document.getElementById('statut').value = emprunts[index].statut;
}

// Fonction pour supprimer un emprunt
function supprimerEmprunt(index) {
    // Demande confirmation avant de supprimer
    if (confirm('Êtes-vous sûr de vouloir supprimer cet emprunt ?')) {
        // Supprime l'élément à l'index donné du tableau
        emprunts.splice(index, 1);
        
        // Sauvegarde le tableau modifié dans localStorage
        localStorage.setItem('emprunts', JSON.stringify(emprunts));
        
        // Rafraîchit l'affichage de la table
        afficherEmprunts();
    }
}

// Note: La fonction chargerEmprunts() sera appelée automatiquement
// par la fonction afficherEntite() dans script.js quand on clique sur le bouton "Emprunts"

