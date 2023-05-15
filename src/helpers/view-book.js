import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { useCookies } from "react-cookie";


export const Viewbook = () => {
    const [cookies, _] = useCookies(["access_token"]);
    const[books, setBooks] = useState([]);

    useEffect(()    => {

        const fetchBook = async () => {
            try {
                const response = await axios.post('http://localhost:3001/book/get');
                setBooks(response.data);
                console.log(response.data);
            } catch (err) {
                
            }
        }
    }, []);
}

export default Viewbook