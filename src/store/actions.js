import { getAllEntries } from "../services/registrationService";

export const actions = {

    getAllEntriesAsync() {
        getAllEntries()
            .then((response) => {
                let dataRespone = response.data;

                console.log(dataRespone);
            })
       
    },
};
