window.onload = init;

function init() {
    new Vue({
        el: "#app",
        data: {
            restaurants: [{
                    nom: 'café de Paris',
                    cuisine: 'Française'
                },
                {
                    nom: 'Sun City Café',
                    cuisine: 'Américaine'
                }
            ],
            nom: '',
            cuisine: '',
            nbRestaurants: 0,
            page: 0,
            pagesize: 10,
            name: "",
            nameModif: '',
            cuisineModif: '',
            id: ''
        },
        mounted() {
            console.log("AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
        },
        methods: {
            getRestaurantsFromServer() {
                let url = "http://localhost:8080/api/restaurants?page=" +
                    this.page + "&pagesize=" +
                    this.pagesize + "&name=" +
                    this.name;

                fetch(url)
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
                                this.restaurants = reponseJS.data;
                                this.nbRestaurants = reponseJS.count;
                                console.log(reponseJS.msg);
                            });
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            },
            modifierRestaurant0(r) {
                this.nameModif = r.name;
                this.cuisineModif = r.cuisine;
                this.id = r._id;

            },
            modifierRestaurant1() {
                if (this.id !== '') {

                    event.preventDefault();

                    let form = event.target;
                    let dataFormulaire = new FormData(form);

                    let url = "http://localhost:8080/api/restaurants/" + this.id;

                    fetch(url, {
                            method: "PUT",
                            body: dataFormulaire
                        })
                        .then((reponseJSON) => {
                            reponseJSON.json()
                                .then((reponseJS) => {
                                    console.log(reponseJS.msg);
                                    // On re-affiche les restaurants
                                    this.getRestaurantsFromServer();
                                });
                        })
                        .catch(function(err) {
                            console.log(err);
                        });

                    this.nom = "";
                    this.cuisine = "";
                } else alert('objet non modifiable');
            },
            supprimerRestaurant(index) {

                event.preventDefault();

                //ici idex est l'id de l'element a suppr (transmis dans le html)

                let url = "http://localhost:8080/api/restaurants/" + index;

                fetch(url, {
                        method: "DELETE",
                    })
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
                                console.log(reponseJS.msg);
                                // On re-affiche les restaurants
                                this.getRestaurantsFromServer();
                            });
                    })
                    .catch(function(err) {
                        console.log(err);
                    });

                this.nom = "";
                this.cuisine = "";
                



            },
            ajouterRestaurant(event) {
                // eviter le comportement par defaut
                event.preventDefault();

                // Récupération du contenu du formulaire pour envoi en AJAX au serveur
                // 1 - on récupère le formulaire
                let form = event.target;

                // 2 - on récupère le contenu du formulaire
                let dataFormulaire = new FormData(form);

                // 3 - on envoie une requête POST pour insertion sur le serveur
                let url = "http://localhost:8080/api/restaurants";

                fetch(url, {
                        method: "POST",
                        body: dataFormulaire
                    })
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
                                console.log(reponseJS.msg);
                                // On re-affiche les restaurants
                                this.getRestaurantsFromServer();
                            });
                    })
                    .catch(function(err) {
                        console.log(err);
                    });

                this.nom = "";
                this.cuisine = "";
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            },

            pageSuivante() {
                let pageNbmax = this.nbRestaurants / this.pagesize;
                console.log(this.page);
                if (this.page < (Math.floor(pageNbmax))) {
                    this.page++;
                    this.getRestaurantsFromServer();
                }
            },
            pagePrecedente() {
                if (this.page > 0) {
                    this.page--;
                    this.getRestaurantsFromServer();
                }
            },
            pageDebut() {
                this.page = 0;
                this.getRestaurantsFromServer();
            },
            pageFin() {

                let pageNbmax = this.nbRestaurants / this.pagesize;


                if (pageNbmax == Math.floor(pageNbmax)) {
                    this.page = Math.floor(pageNbmax) - 1;
                    this.getRestaurantsFromServer();
                } else {
                    this.page = Math.floor(pageNbmax);
                    this.getRestaurantsFromServer();
                }

            },
            chercherRestaurants: _.debounce(function() {
                this.page = 0;
                this.getRestaurantsFromServer();
            }, 100)
        }
    })
}