import axios from "axios";

export async function getAllEntries() {
  
    let url = "/employee/";
    return new Promise((resolve, reject) => {
        axios({
            method: "GET",
            url: url,
        })
            .then((response) => {
                console.log(response);
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
