import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ArtDetail = () => {
    let params = useParams();

    const [fullDetails, setFullDetails] = useState(null);

    useEffect(()=> {
        const getDetails = async () => {
            const artResponse = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + params.id);
            const art = await artResponse.json();
            setFullDetails({id: art.objectID, image: art.primaryImageSmall, title: art.title, culture: art.culture, artist: art.artistDisplayName, medium: art.medium, date: art.objectDate, period: art.period, artistBeginDate: art.artistBeginDate, artistEndDate: art.artistEndDate, type: art.classification, objectURL: art.objectURL});
        }
        getDetails().catch(console.error);
    }, [params.id]);
    

    return (
        fullDetails ? 
            (<>
                <h1>{fullDetails.title}</h1>
                <p>{fullDetails.artist}</p>
                <img src={fullDetails.image}></img>
                <p>Culture: {fullDetails.culture}</p>
                <p>Classification: {fullDetails.type}</p>
                <p>Medium: {fullDetails.medium}</p>
                <p>Period: {fullDetails.period}</p>
                <p>Art Date: {fullDetails.date}</p>
                <p>Artist Years Alive: {fullDetails.artistBeginDate}-{fullDetails.artistEndDate}</p>
                <a href={fullDetails.objectURL}>View more details at the Met Museum website</a>
                
            </>)
        :
            (<>Loading...</>)
    );
}

export default ArtDetail;