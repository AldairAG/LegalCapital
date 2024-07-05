import { getDatabase, ref, onValue } from 'firebase/database';
import { useState ,useEffect} from "react"
import { useParams } from 'react-router-dom';
const Editar=()=>{
    const { fk } = useParams();
    const [orden,setOrden]=useState([])

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, 'ordenes/'+fk);

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setOrden(data);
            } else {
                console.log(fk)
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, []);

    return(
        <section className="tabla eaec">
            <div className="sec0-eaec"><p>Editar orden #{orden.numeroOrden}</p></div>
            <div className="sec1-eaec"></div>
            <div className="sec2-eaec"></div>
            <div className="sec3-eaec"></div>
        </section>
    )
}

export default Editar