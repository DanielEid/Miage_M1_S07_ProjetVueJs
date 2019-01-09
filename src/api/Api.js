var Utils = require("../Utils.js");
export default class {
  constructor() {}

  getRestaurants(page, pagesize) {
    console.log("dans get restaurants");
    return new Promise((resolve, reject) => {
      let urlRestaurants =
        "http://localhost:8080/api/restaurants?page=" +
        page +
        "&pagesize=" +
        pagesize;

      fetch(urlRestaurants, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          let returnData = {
            msg: json.msg,
            data: json.data,
            count: json.count
          };
          resolve(returnData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getRestaurantById(id) {
    console.log("dans get restaurant by id");
    return new Promise((resolve, reject) => {
      let urlRestaurants = "http://localhost:8080/api/restaurants/" + id;

      fetch(urlRestaurants, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          let returnData = {
            msg: json.msg,
            restaurant: json.restaurant
          };
          resolve(returnData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteRestaurant(id) {
    console.log("dans delete restaurant");
    return new Promise((resolve, reject) => {
      let urlRestaurants = "http://localhost:8080/api/restaurants/" + id;

      fetch(urlRestaurants, {
        method: "delete"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          let returnData = {
            msg: json.msg,
            count: json.count
          };
          console.log("dans then API");
          resolve(returnData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAddressFromLatLng(address) {
    console.log("dans get address from lat lng");
    address = address.split(" ").join("+");
    return new Promise((resolve, reject) => {
      let url =
        "http://nominatim.openstreetmap.org/search?q=" +
        address +
        "&format=json";
      fetch(url, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      let url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
      fetch(url, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          var meals = json.meals;
          meals.indexOf("Starter") > -1
            ? meals.splice(meals.indexOf("Starter"), 1)
            : null;
          meals.indexOf("Desert") > -1
            ? meals.splice(meals.indexOf("Desert"), 1)
            : null;
          resolve(meals);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getRandomMenus() {
    return new Promise((resolve, reject) => {
      this.getCategories().then(meals => {
        console.log(meals);
        /*let url = "https://www.themealdb.com/api/json/v1/1/list.php?c=";
        fetch(url, {
          method: "get"
        })
          .then(response => {
            return response.json();
          })
          .then(json => {
            resolve(json);
          })
          .catch(error => {
            reject(error);
          });*/
      });
    });
  }

  getRandomImages() {
    return new Promise((resolve, reject) => {});
  }
}
