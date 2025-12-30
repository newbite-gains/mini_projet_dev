// ============================================
// FICHIER: script.js
// Fonctions générales pour le login/logout et navigation
// ============================================

// Fonction pour le login (vérifie identifiants simples)
function login(event) {
    // Empêche le formulaire d'envoyer une requête réelle au serveur
    event.preventDefault();
    
    // Récupère la valeur du champ nom d'utilisateur
    let username = document.getElementById('username').value;
    
    // Récupère la valeur du champ mot de passe
    let password = document.getElementById('password').value;
    
    // Vérifie si les identifiants sont corrects (admin/admin)
    if (username === 'admin' && password === 'admin') {
        // Si correct, redirige vers la page dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Sinon, affiche un message d'erreur
        document.getElementById('errorMsg').textContent = 'Identifiants incorrects';
    }
}

// Fonction pour déconnexion (retour au login)
function logout() {
    // Redirige vers la page de login
    window.location.href = 'index.html';
}

// Fonction pour afficher une entité et cacher les autres
function afficherEntite(nomEntite) {
    // Liste de toutes les entités disponibles
    let toutesLesEntites = ['accueil', 'livres', 'auteurs', 'adherents', 'emprunts', 'categories'];
    
    // Parcourt toutes les entités
    for (let i = 0; i < toutesLesEntites.length; i++) {
        // Trouve l'élément HTML de chaque entité
        let element = document.getElementById(toutesLesEntites[i]);
        
        // Si l'élément existe
        if (element) {
            // Si c'est l'entité qu'on veut afficher
            if (toutesLesEntites[i] === nomEntite) {
                // Affiche cette entité (display: block)
                element.style.display = 'block';
            } else {
                // Cache toutes les autres entités (display: none)
                element.style.display = 'none';
            }
        }
    }
    
    // Si on affiche la section livres, on charge les livres
    if (nomEntite === 'livres') {
        chargerLivres();
    }
    
    // Si on affiche la section auteurs, on charge les auteurs
    if (nomEntite === 'auteurs') {
        chargerAuteurs();
    }
    
    // Si on affiche la section adherents, on charge les adhérents
    if (nomEntite === 'adherents') {
        chargerAdherents();
    }
    
    // Si on affiche la section emprunts, on charge les emprunts
    if (nomEntite === 'emprunts') {
        chargerEmprunts();
    }
    
    // Si on affiche la section categories, on charge les catégories
    if (nomEntite === 'categories') {
        chargerCategories();
    }
}
