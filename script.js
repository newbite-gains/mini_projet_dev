// Variable globale pour stocker les livres
let livres = [];
let compteurId = 1; // Pour générer des IDs uniques

// Fonction pour le login
function login(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('errorMsg').textContent = 'Identifiants incorrects';
    }
}

// Fonction pour déconnexion
function logout() {
    window.location.href = 'index.html';
}

// Fonction qui affiche une section et cache les autres
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(function(section) {
        section.style.display = 'none';
    });
    
    var sectionToShow = document.getElementById('section-' + sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

// Au chargement de la page
window.onload = function() {
    showSection('accueil');
    
    // Attacher l'événement au formulaire de livre si on est sur dashboard
    const formLivre = document.getElementById('formLivre');
    if (formLivre) {
        formLivre.addEventListener('submit', soumettreFormulaireLivre);
    }
};

// ========== FONCTIONS CRUD POUR LES LIVRES ==========

// Afficher le formulaire d'ajout
function afficherFormulaireAjout() {
    document.getElementById('formulaireLivre').style.display = 'block';
    document.getElementById('titreFormulaire').textContent = 'Ajouter un livre';
    document.getElementById('btnAjouterLivre').style.display = 'none';
    document.getElementById('formLivre').reset();
    document.getElementById('livreId').value = '';
}

// Annuler le formulaire
function annulerFormulaire() {
    document.getElementById('formulaireLivre').style.display = 'none';
    document.getElementById('btnAjouterLivre').style.display = 'inline-block';
    document.getElementById('formLivre').reset();
}

// Soumettre le formulaire (ajout ou modification)
function soumettreFormulaireLivre(event) {
    event.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const id = document.getElementById('livreId').value;
    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const isbn = document.getElementById('isbn').value;
    const annee = document.getElementById('annee').value;
    const categorie = document.getElementById('categorie').value;
    
    if (id) {
        // Modification d'un livre existant
        modifierLivre(parseInt(id), titre, auteur, isbn, annee, categorie);
    } else {
        // Ajout d'un nouveau livre
        ajouterLivre(titre, auteur, isbn, annee, categorie);
    }
    
    // Réinitialiser et fermer le formulaire
    annulerFormulaire();
    afficherLivres();
}

// Ajouter un livre
function ajouterLivre(titre, auteur, isbn, annee, categorie) {
    const nouveauLivre = {
        id: compteurId++,
        titre: titre,
        auteur: auteur,
        isbn: isbn,
        annee: annee,
        categorie: categorie
    };
    
    livres.push(nouveauLivre);
}

// Modifier un livre
function modifierLivre(id, titre, auteur, isbn, annee, categorie) {
    const index = livres.findIndex(livre => livre.id === id);
    if (index !== -1) {
        livres[index] = {
            id: id,
            titre: titre,
            auteur: auteur,
            isbn: isbn,
            annee: annee,
            categorie: categorie
        };
    }
}

// Supprimer un livre
function supprimerLivre(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
        livres = livres.filter(livre => livre.id !== id);
        afficherLivres();
    }
}

// Afficher le formulaire de modification avec les données du livre
function afficherFormulaireModification(id) {
    const livre = livres.find(l => l.id === id);
    if (livre) {
        document.getElementById('formulaireLivre').style.display = 'block';
        document.getElementById('titreFormulaire').textContent = 'Modifier un livre';
        document.getElementById('btnAjouterLivre').style.display = 'none';
        
        // Remplir le formulaire avec les données du livre
        document.getElementById('livreId').value = livre.id;
        document.getElementById('titre').value = livre.titre;
        document.getElementById('auteur').value = livre.auteur;
        document.getElementById('isbn').value = livre.isbn;
        document.getElementById('annee').value = livre.annee;
        document.getElementById('categorie').value = livre.categorie;
    }
}

// Afficher tous les livres dans le tableau
function afficherLivres() {
    const tbody = document.getElementById('corpsTableLivres');
    tbody.innerHTML = ''; // Vider le tableau
    
    if (livres.length === 0) {
        // Si aucun livre, afficher un message
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Aucun livre enregistré</td></tr>';
    } else {
        // Parcourir tous les livres et créer une ligne pour chacun
        livres.forEach(livre => {
            const ligne = document.createElement('tr');
            ligne.innerHTML = `
                <td>${livre.titre}</td>
                <td>${livre.auteur}</td>
                <td>${livre.isbn}</td>
                <td>${livre.annee}</td>
                <td>${livre.categorie}</td>
                <td>
                    <button onclick="afficherFormulaireModification(${livre.id})">Modifier</button>
                    <button onclick="supprimerLivre(${livre.id})" style="background-color: #dc3545; color: white;">Supprimer</button>
                </td>
            `;
            tbody.appendChild(ligne);
        });
    }
}
