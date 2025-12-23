// Variable globale pour stocker les livres (un array d'objets)
let livres = [];

// Fonction pour le login (vérifie identifiants simples)
function login(event) {
    event.preventDefault(); // Empêche le formulaire d'envoyer une requête réelle
    let username = document.getElementById('username').value; // Récupère la valeur du input
    let password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') { // Condition simple
        window.location.href = 'dashboard.html'; // Redirige vers dashboard
    } else {
        document.getElementById('errorMsg').textContent = 'Identifiants incorrects'; // Affiche erreur
    }
}

// Fonction pour déconnexion (retour au login)
function logout() {
    window.location.href = 'index.html';
}

// Fonction pour charger les livres depuis localStorage
function chargerLivres() {
    let data = localStorage.getItem('livres'); // Récupère le texte JSON
    if (data) { // Si existe
        livres = JSON.parse(data); // Convertit JSON en array d'objets
    }
    afficherLivres(); // Appelle la fonction d'affichage
}

// Fonction pour afficher les livres dans la table
function afficherLivres() {
    let tableBody = document.querySelector('#livreTable tbody'); // Trouve le corps de la table
    tableBody.innerHTML = ''; // Vide la table avant d'ajouter
    for (let i = 0; i < livres.length; i++) { // Boucle sur l'array
        let row = document.createElement('tr'); // Crée une ligne <tr>
        row.innerHTML = `
            <td>${i + 1}</td> <!-- ID simple basé sur index -->
            <td>${livres[i].titre}</td> <!-- Valeur de l'objet -->
            <td>${livres[i].auteurId}</td>
            <td>${livres[i].categorieId}</td>
            <td>
                <button onclick="modifierLivre(${i})">Modifier</button> <!-- Appel fonction avec index -->
                <button onclick="supprimerLivre(${i})">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(row); // Ajoute la ligne à la table
    }
}

// Fonction pour ajouter ou modifier un livre
function ajouterOuModifierLivre(event) {
    event.preventDefault(); // Empêche envoi réel
    let id = document.getElementById('livreId').value; // Vérifie si ID existe (pour modif)
    let titre = document.getElementById('titre').value;
    let auteurId = document.getElementById('auteurId').value;
    let categorieId = document.getElementById('categorieId').value;
    
    let livre = { // Crée un objet simple
        titre: titre,
        auteurId: auteurId,
        categorieId: categorieId
    };
    
    if (id !== '') { // Si ID existe, c'est une modification
        livres[parseInt(id)] = livre; // Remplace l'objet à l'index
    } else { // Sinon, ajout
        livres.push(livre); // Ajoute à la fin de l'array
    }
    
    localStorage.setItem('livres', JSON.stringify(livres)); // Sauvegarde en JSON
    document.getElementById('livreForm').reset(); // Vide le formulaire
    document.getElementById('livreId').value = ''; // Reset ID
    afficherLivres(); // Rafraîchit la table
}

// Fonction pour préparer la modification (remplit le formulaire)
function modifierLivre(index) {
    document.getElementById('livreId').value = index; // Met l'index dans le hidden
    document.getElementById('titre').value = livres[index].titre;
    document.getElementById('auteurId').value = livres[index].auteurId;
    document.getElementById('categorieId').value = livres[index].categorieId;
}

// Fonction pour supprimer un livre
function supprimerLivre(index) {
    livres.splice(index, 1); // Supprime l'élément à l'index
    localStorage.setItem('livres', JSON.stringify(livres)); // Sauvegarde
    afficherLivres(); // Rafraîchit
}