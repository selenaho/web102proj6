import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import App from "../src/App.jsx";

const Layout = () => {
    const [list, setList] = useState([]);
    const [cultures, setCultures] = useState(new Set());
    useEffect(() => {    
        const getAllArt = async () => {
            const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=6");
            const json = await response.json();
            const ids = json.objectIDs; //array of ids corresponding to different works of asian art
            //console.log(ids);
            
            let arr = []; //going to put all the art info into this array first so it happens synchronously
            for (let i = 0; i < 500 && i*40+i < ids.length; i++) {
                const artResponse = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + ids[i*40+i]);
                const art = await artResponse.json();
                if(art.primaryImageSmall != "" && art.artistDisplayName != "") {
                    let a = {id: art.objectID, image: art.primaryImageSmall, title: art.title, culture: art.culture, artist: art.artistDisplayName, medium: art.medium, date: art.objectDate, type: art.classification};
                    console.log(a);
                    arr.push(a);
                    setCultures(prev => new Set(prev).add(art.culture));
                }
            }
            setList([...list, ...arr]); //then put the array arr into the state list so it happens all at
            console.log(arr.length);
            //console.log(cultures);
            //console.log(counter);
            //console.log(arr.length);
        }
        getAllArt().catch(console.error);
    
      }, []);

    return (
        <div>
            <Outlet context={{ list, cultures }} />
        </div>
    );
};

export default Layout;
