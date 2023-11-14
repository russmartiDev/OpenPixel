import Axios from "axios";

export default Axios.create({
    baseURL: 'https://api.unsplash.com/',
    params: {
        client_id: "4Uc7flVDMOeHhe4rOxtsvrk1kOQ_Z8NjKe6cff9WHEc",
        per_page: 30,
        page: 1,
   
    },
    timeout: 8000
});